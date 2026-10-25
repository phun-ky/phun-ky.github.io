import { chromium } from 'playwright-core';

import fs, { globSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import { policyFor } from '../csp/policy.mjs';
import { serve } from '../lib/serve.mjs';

// Checks the Content Security Policy of every built page:
// - each page has exactly one policy, before any script, style or
//   stylesheet, and it is the policy policy.mjs makes for that page, so it
//   allows exactly the page's own inline scripts and styles and no host;
// - loaded in headless Chrome, no page reports a violation, so the policy
//   allows everything the page uses.
// Uses the installed Google Chrome; set CHROME_PATH to use another binary.
const DIST_DIR = process.argv[2] ?? 'dist';
const CONCURRENCY = 8;
const POLICY =
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]*)"\s*\/?>/gi;
const FIRST_RESOURCE = /<(script|style)\b|<link\b[^>]*rel="stylesheet"/i;
const failures = [];
const files = globSync('**/*.html', { cwd: DIST_DIR }).sort();

files.forEach((file) => {
  const html = fs.readFileSync(join(DIST_DIR, file), 'utf-8');
  const policies = [...html.matchAll(POLICY)];

  if (policies.length !== 1) {
    failures.push(`${file}: ${policies.length} policies, expected 1`);

    return;
  }

  const [{ 1: policy, index }] = policies;
  const resource = html.search(FIRST_RESOURCE);

  if (resource !== -1 && resource < index) {
    failures.push(`${file}: a script or style comes before the policy`);
  }

  if (policy !== policyFor(html.replace(policies[0][0], ''))) {
    failures.push(`${file}: the policy doesn't match the page's inline code`);
  }
});

const server = await serve(DIST_DIR);
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch(
  process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : { channel: 'chrome' }
);
const visit = async (file) => {
  const path = `/${file}`
    .replace(/(^|\/)index\.html$/, '$1')
    .replace(/\.html$/, '');
  const context = await browser.newContext();

  try {
    const page = await context.newPage();

    // Leaving the page (the /packages/ redirect) isn't checked
    await context.route('**/*', (route) =>
      new URL(route.request().url()).origin === origin
        ? route.continue()
        : route.abort()
    );
    await page.addInitScript(() => {
      window.__violations = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        window.__violations.push(
          `${event.effectiveDirective} blocked ${event.blockedURI || 'inline'}`
        );
      });
    });
    await page.goto(`${origin}${path}`, { waitUntil: 'load' });
    // Load lazy images and frames too, so their sources are checked
    await page
      .evaluate(() => {
        document.querySelectorAll('[loading="lazy"]').forEach((element) => {
          element.loading = 'eager';
        });
      })
      .catch(() => {});
    await page
      .waitForLoadState('networkidle', { timeout: 5_000 })
      .catch(() => {});

    const violations = await page
      .evaluate(() => window.__violations ?? [])
      .catch(() => []);

    violations.forEach((violation) => failures.push(`${path}: ${violation}`));
  } finally {
    await context.close();
  }
};

try {
  const queue = [...files];

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length !== 0) await visit(queue.shift());
    })
  );
} finally {
  await browser.close();
  server.close();
}

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  console.error(`${failures.length} problem(s) on ${files.length} pages`);
  process.exit(1);
}

console.log(
  `csp: ${files.length} pages have one policy that matches their inline code, and none reports a violation`
);
