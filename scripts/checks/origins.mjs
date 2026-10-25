import { chromium } from 'playwright-core';

import { globSync } from 'node:fs';
import process from 'node:process';

import { serve } from '../lib/serve.mjs';

// Loads every page of the built site in headless Chrome and fails if it
// requests anything from another host: no CDNs, analytics, badges or embeds.
// Links to other sites are fine; only requests count. Requests to other hosts
// are recorded and then aborted, so the check doesn't depend on the network.
// Uses the installed Google Chrome; set CHROME_PATH to use another binary.
const DIST_DIR = process.argv[2] ?? 'dist';
const CONCURRENCY = 8;
// Pages known to request other hosts, tracked in an issue. Each must still do
// so, so the list can't go stale: remove an entry when you fix it.
const KNOWN_EXTERNAL = Object.freeze({});
const pages = globSync('**/*.html', { cwd: DIST_DIR })
  .map((file) =>
    `/${file}`.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')
  )
  .sort();
const server = await serve(DIST_DIR);
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch(
  process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : { channel: 'chrome' }
);
const external = new Map();
const visit = async (path) => {
  const context = await browser.newContext();
  const hosts = new Set();

  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());

    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) {
      return route.continue();
    }

    const request = route.request();
    const leavesPage =
      request.isNavigationRequest() &&
      request.frame() === request.frame().page().mainFrame();

    // Leaving the page (a redirect page sending the visitor on) isn't a
    // request the page makes; an embedded frame is
    if (!leavesPage) hosts.add(url.host);

    return route.abort();
  });

  try {
    const page = await context.newPage();

    await page.goto(`${origin}${path}`, { waitUntil: 'load' });
    await page
      .waitForLoadState('networkidle', { timeout: 5_000 })
      .catch(() => {});
  } finally {
    await context.close();
  }

  if (hosts.size !== 0) external.set(path, [...hosts].sort());
};

try {
  const queue = [...pages];

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length !== 0) await visit(queue.shift());
    })
  );
} finally {
  await browser.close();
  server.close();
}

const failures = [];

for (const [path, hosts] of external) {
  const known = KNOWN_EXTERNAL[path] ?? [];
  const unexpected = hosts.filter((host) => !known.includes(host));

  if (unexpected.length !== 0) {
    failures.push(`${path} requests ${unexpected.join(', ')}`);
  }
}

for (const [path, hosts] of Object.entries(KNOWN_EXTERNAL)) {
  const fixed = hosts.filter((host) => !external.get(path)?.includes(host));

  if (fixed.length !== 0) {
    failures.push(
      `${path} no longer requests ${fixed.join(', ')}: remove it from KNOWN_EXTERNAL`
    );
  }
}

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  console.error(`${failures.length} problem(s) on ${pages.length} pages`);
  process.exit(1);
}

console.log(
  `origins: ${pages.length} pages request nothing from other hosts` +
    (Object.keys(KNOWN_EXTERNAL).length
      ? ` apart from ${Object.keys(KNOWN_EXTERNAL).length} known page(s)`
      : '')
);
