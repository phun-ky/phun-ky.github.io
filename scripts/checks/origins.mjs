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
// https://github.com/phun-ky/phun-ky.github.io/issues/140
const KNOWN_EXTERNAL = Object.freeze({
  // The talk list comes from a sessionize.com script
  '/speaker/': ['sessionize.com'],
  // Images from other sites
  '/projects/': [
    'phun-ky.net',
    'repository-images.githubusercontent.com',
    'shots.codepen.io',
    'speccer.dev'
  ],
  '/2014/03/24/working-with-javascript-modules-how-to-load-javascript-dependencies-without-requirejs':
    ['upload.wikimedia.org'],
  '/2014/03/25/how-to-create-a-new-page-in-atlassian-confluence-with-given-template-from-a-link':
    ['upload.wikimedia.org'],
  '/2015/09/09/trusted-data': ['upload.wikimedia.org'],
  '/2015/09/14/how-to-work-with-trusted-data': ['upload.wikimedia.org'],
  '/2015/09/22/kents-theorem': ['upload.wikimedia.org'],
  '/2015/09/29/trusted-data-for-developers': ['upload.wikimedia.org'],
  '/2025/01/25/building-a-better-professional-environment-collaboration-and-innovation-in-focus':
    ['images.unsplash.com'],
  // Embedded videos, tweets and pens
  '/2007/01/27/manah-manah': ['i.ytimg.com'],
  '/2008/07/21/i-love-discovery-channel': ['img.youtube.com'],
  '/2014/03/23/how-to-inject-proper-page-styling-with-indented-chapters-with-jquery-and-css':
    ['codepen.io'],
  '/2023/10/09/making-open-source-sustainable-challenges-and-solutions': [
    'platform.twitter.com'
  ]
});
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
