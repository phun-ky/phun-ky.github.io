import { chromium } from 'playwright-core';

import fs from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import { serve } from '../lib/serve.mjs';

// Full-page screenshots of one page per template, at a phone, tablet and
// desktop width, in the light and the dark theme, for reviewing visual
// changes. CI keeps them as an artifact. check:browser fails on horizontal
// scrolling; this is for the eye. Uses the installed Google Chrome; set
// CHROME_PATH to use another binary.
const DIST_DIR = process.argv[2] ?? 'dist';
const OUT_DIR = process.argv[3] ?? 'screenshots';
const PAGES = Object.freeze({
  home: '/',
  post: '/2023/10/04/create-a-simple-vanilla-javascript-spa',
  category: '/categories/programming',
  tag: '/tags/javascript',
  categories: '/categories/',
  tags: '/tags/',
  projects: '/projects/',
  frameport: '/projects/frameport/',
  speaker: '/speaker/',
  'not-found': '/this-page-does-not-exist'
});
const WIDTHS = [390, 768, 1440];
const THEMES = ['light', 'dark'];

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const server = await serve(DIST_DIR);
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch(
  process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : { channel: 'chrome' }
);

let count = 0;

try {
  for (const [name, path] of Object.entries(PAGES)) {
    for (const theme of THEMES) {
      // The site follows the system theme unless the visitor picked one
      const context = await browser.newContext({ colorScheme: theme });
      const page = await context.newPage();

      await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        // Let transitions and lazy images settle
        await page.waitForTimeout(400);
        await page.screenshot({
          path: join(OUT_DIR, `${name}-${width}-${theme}.png`),
          fullPage: true
        });
        count++;
      }

      await context.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`screenshots: ${count} in ${OUT_DIR}`);
