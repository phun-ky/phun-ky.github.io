import { chromium } from 'playwright-core';

import fs from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { serve } from '../lib/serve.mjs';
import { TEMPLATE_PAGES } from '../lib/templates.mjs';

// Loads one page per template on a throttled phone (390 px wide, slow 4G,
// a 4x slower CPU, close to Lighthouse's mobile profile) and checks it
// against the budgets in performance-budgets.json:
// - bytes transferred per resource type (html, script, stylesheet, image,
//   font) and in total;
// - Largest Contentful Paint and Cumulative Layout Shift;
// - total blocking time (long tasks over 50 ms), standing in for
//   Interaction to Next Paint, which needs real interaction to measure.
// Pass --report to print the measurements as JSON. Uses the installed Google
// Chrome; set CHROME_PATH to use another binary.
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const DIST_DIR =
  process.argv.find((arg, i) => i > 1 && !arg.startsWith('--')) ?? 'dist';
const REPORT = process.argv.includes('--report');
const BUDGETS = JSON.parse(
  fs.readFileSync(join(DIR_NAME, 'performance-budgets.json'), 'utf-8')
);
const NETWORK = Object.freeze({
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8
});
const TYPES = Object.freeze({
  document: 'html',
  script: 'script',
  stylesheet: 'stylesheet',
  image: 'image',
  font: 'font'
});
const server = await serve(DIST_DIR);
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch(
  process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : { channel: 'chrome' }
);
const measure = async (path) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const bytes = {
    html: 0,
    script: 0,
    stylesheet: 0,
    image: 0,
    font: 0,
    other: 0
  };
  const types = new Map();

  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', NETWORK);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  cdp.on('Network.responseReceived', ({ requestId, type }) =>
    types.set(requestId, TYPES[type.toLowerCase()] ?? 'other')
  );
  cdp.on('Network.loadingFinished', ({ requestId, encodedDataLength }) => {
    bytes[types.get(requestId) ?? 'other'] += encodedDataLength;
  });
  await page.addInitScript(() => {
    window.__perf = { lcp: 0, cls: 0, tbt: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__perf.lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__perf.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__perf.tbt += Math.max(0, entry.duration - 50);
      }
    }).observe({ type: 'longtask', buffered: true });
  });

  try {
    await page.goto(`${origin}${path}`, {
      waitUntil: 'load',
      timeout: 120_000
    });
    await page
      .waitForLoadState('networkidle', { timeout: 30_000 })
      .catch(() => {});

    const { lcp, cls, tbt } = await page.evaluate(() => window.__perf);
    const total = Object.values(bytes).reduce((sum, value) => sum + value, 0);

    return {
      kb: Object.fromEntries(
        Object.entries({ ...bytes, total }).map(([type, value]) => [
          type,
          Math.round(value / 1024)
        ])
      ),
      lcp: Math.round(lcp),
      cls: Math.round(cls * 1000) / 1000,
      tbt: Math.round(tbt)
    };
  } finally {
    await context.close();
  }
};
const results = {};

try {
  for (const [name, path] of Object.entries(TEMPLATE_PAGES)) {
    results[name] = await measure(path);
  }
} finally {
  await browser.close();
  server.close();
}

if (REPORT) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

const failures = [];

Object.entries(results).forEach(([name, result]) => {
  const budget = { ...BUDGETS.default, ...BUDGETS.pages?.[name] };
  const check = (label, value, limit, unit) => {
    if (limit !== undefined && value > limit) {
      failures.push(
        `${name}: ${label} is ${value}${unit}, budget ${limit}${unit}`
      );
    }
  };

  Object.entries(budget.kb ?? {}).forEach(([type, limit]) =>
    check(`${type} transfer`, result.kb[type], limit, ' kB')
  );
  check('LCP', result.lcp, budget.lcp, ' ms');
  check('CLS', result.cls, budget.cls, '');
  check('total blocking time', result.tbt, budget.tbt, ' ms');
});

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}

console.log(
  `performance: ${Object.keys(results).length} template pages within budget on a throttled phone`
);
