import { chromium } from 'playwright-core';

import fs, { globSync } from 'node:fs';
import { createRequire } from 'node:module';
import process from 'node:process';

import { serve } from '../lib/serve.mjs';

// Loads every built page once in headless Chrome, the way GitHub Pages serves
// it, and runs every check that needs a browser on that load:
// - origins: the page requests nothing from another host (no CDNs, analytics,
//   badges or embeds; links to other sites are fine). Requests to other hosts
//   are recorded and aborted, so the check doesn't depend on the network.
// - csp: the page reports no Content Security Policy violation. Since the
//   policy allows only the site itself, a script or image from another host
//   is usually blocked, and reported, here before origins sees a request.
// - a11y: axe finds no WCAG 2.2 A or AA violation in the light theme, and no
//   contrast violation in the dark theme. Problems are named by rule and
//   theme; the output shows an example element.
// - layout: no horizontal scrolling at 390, 768 and 1440 px wide (a phone, a
//   tablet and a desktop); the output shows the widest element.
// Lazy images and frames are loaded too. Uses the installed Google Chrome;
// set CHROME_PATH to use another binary.
const DIST_DIR = process.argv[2] ?? 'dist';
const CONCURRENCY = 8;
// Pages known to fail a check, tracked in an issue, as { check: { path:
// [problems] } }. Each must keep failing, so the list can't go stale: remove
// an entry when you fix it.
const KNOWN = Object.freeze({ origins: {}, csp: {}, a11y: {}, layout: {} });
const WIDTHS = [390, 768, 1440];
// axe is loaded through the DevTools protocol, which the page's Content
// Security Policy doesn't apply to, so the csp check stays meaningful
const AXE = fs.readFileSync(
  createRequire(import.meta.url).resolve('axe-core/axe.min.js'),
  'utf-8'
);
const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const examples = new Map();
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
// { check: Map<path, problems[]> }
const found = Object.fromEntries(
  Object.keys(KNOWN).map((check) => [check, new Map()])
);
const report = (check, path, problems) => {
  if (problems.length !== 0)
    found[check].set(path, [...new Set(problems)].sort());
};
// Resizes the page to each width and reports any width where it scrolls
// sideways, with the element that sticks out furthest
const layout = async (page, path) => {
  if (!page.url().startsWith(origin)) return [];

  const problems = [];

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });

    const result = await page
      .evaluate(() => {
        const { scrollWidth, clientWidth } = document.documentElement;

        if (scrollWidth <= clientWidth) return null;

        let widest = null;

        for (const element of document.body.querySelectorAll('*')) {
          const { right } = element.getBoundingClientRect();

          if (right > clientWidth && (!widest || right > widest.right)) {
            widest = {
              right,
              name: `${element.tagName.toLowerCase()}${[...element.classList].map((c) => `.${c}`).join('')}`
            };
          }
        }

        return { scrollWidth, name: widest?.name ?? 'unknown' };
      })
      .catch(() => null);

    if (result) {
      const problem = `scrolls sideways at ${width}px`;

      examples.set(
        `${path} ${problem}`,
        `${result.name} (page is ${result.scrollWidth}px wide)`
      );
      problems.push(problem);
    }
  }

  await page.setViewportSize({ width: 1280, height: 720 });

  return problems;
};
// Runs axe in the light theme (the default here), then switches to the dark
// theme the way the site's toggle does and checks contrast again
const accessibility = async (page, path) => {
  const run = (theme, options) =>
    page
      .evaluate(
        async ([runOptions]) =>
          (await window.axe.run(document, runOptions)).violations.map(
            ({ id, nodes }) => ({ id, target: nodes[0]?.target.join(' ') })
          ),
        [options]
      )
      .then((violations) =>
        violations.map(({ id, target }) => {
          const problem = `${id} (${theme})`;

          examples.set(`${path} ${problem}`, target);

          return problem;
        })
      );

  // A page that redirected away (or was stopped doing so) isn't checked
  if (!page.url().startsWith(origin)) return [];

  try {
    await page.evaluate(AXE);

    const light = await run('light', {
      runOnly: { type: 'tag', values: WCAG }
    });

    await page.evaluate(() =>
      document.documentElement.classList.remove('theme--light')
    );
    await page.waitForTimeout(400);

    const dark = await run('dark', {
      runOnly: { type: 'rule', values: ['color-contrast'] }
    });

    return [...light, ...dark];
  } catch {
    // A page that redirected away has nothing to check
    return [];
  }
};
const visit = async (path) => {
  const context = await browser.newContext();
  const hosts = [];

  await context.route('**/*', (route) => {
    const request = route.request();
    const url = new URL(request.url());

    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) {
      return route.continue();
    }

    // Leaving the page (a redirect page sending the visitor on) isn't a
    // request the page makes; an embedded frame is
    const leavesPage =
      request.isNavigationRequest() &&
      request.frame() === request.frame().page().mainFrame();

    if (!leavesPage) hosts.push(url.host);

    return route.abort();
  });

  try {
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.__violations = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        window.__violations.push(
          `${event.effectiveDirective} blocked ${event.blockedURI || 'inline'}`
        );
      });
    });
    await page.goto(`${origin}${path}`, { waitUntil: 'load' });
    // Lazy images and frames load only when scrolled to; load them all (a
    // page that redirects is gone by now, which is fine)
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

    report(
      'csp',
      path,
      await page.evaluate(() => window.__violations ?? []).catch(() => [])
    );
    report('layout', path, await layout(page, path));
    report('a11y', path, await accessibility(page, path));
  } finally {
    await context.close();
  }

  report('origins', path, hosts);
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

Object.entries(KNOWN).forEach(([check, known]) => {
  found[check].forEach((problems, path) => {
    const unexpected = problems.filter(
      (problem) => !known[path]?.includes(problem)
    );

    if (unexpected.length !== 0) {
      failures.push(
        `${check}: ${path}: ${unexpected
          .map((problem) =>
            examples.has(`${path} ${problem}`)
              ? `${problem} at ${examples.get(`${path} ${problem}`)}`
              : problem
          )
          .join(', ')}`
      );
    }
  });
  Object.entries(known).forEach(([path, problems]) => {
    const fixed = problems.filter(
      (problem) => !found[check].get(path)?.includes(problem)
    );

    if (fixed.length !== 0) {
      failures.push(
        `${check}: ${path} no longer has ${fixed.join(', ')}: remove it from KNOWN`
      );
    }
  });
});

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  console.error(`${failures.length} problem(s) on ${pages.length} pages`);
  process.exit(1);
}

console.log(
  `browser: ${pages.length} pages request nothing from other hosts, report no CSP violation, don't scroll sideways at ${WIDTHS.join(', ')}px and pass axe`
);
