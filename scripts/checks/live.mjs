import fs from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';

// Checks the deployed site serves this build: each page must match the file
// in `dist` byte for byte, and an unknown path must get the 404 page with
// status 404. A query string skips the CDN cache, and the check retries while
// a new deploy reaches every edge.
const [base = 'https://phun-ky.net', DIST_DIR = 'dist'] = process.argv.slice(2);
const CACHE_BUSTER = process.env.GITHUB_SHA ?? String(Date.now());
const ATTEMPTS = Number(process.env.LIVE_ATTEMPTS ?? 10);
const DELAY_MS = 15_000;
const PAGES = Object.freeze([
  ['/', 'index.html', 200],
  [
    '/2015/09/29/trusted-data-for-developers',
    '2015/09/29/trusted-data-for-developers.html',
    200
  ],
  ['/projects/', 'projects/index.html', 200],
  ['/speaker/', 'speaker/index.html', 200],
  ['/packages/', 'packages/index.html', 200],
  ['/css/ph.css', 'css/ph.css', 200],
  [`/this-page-does-not-exist-${CACHE_BUSTER}`, '404.html', 404]
]);

if (!fs.existsSync(DIST_DIR)) {
  console.error(`\`${DIST_DIR}\` does not exist, run \`npm run build\` first`);
  process.exit(1);
}

const check = async ([path, file, status]) => {
  const url = new URL(path, base);

  url.searchParams.set('v', CACHE_BUSTER);

  const response = await fetch(url, { redirect: 'manual' });
  const body = Buffer.from(await response.arrayBuffer());
  const expected = fs.readFileSync(join(DIST_DIR, file));

  if (response.status !== status) {
    return `${path}: status ${response.status}, expected ${status}`;
  }

  if (!body.equals(expected)) return `${path}: differs from ${file}`;

  return null;
};

for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
  const failures = (await Promise.all(PAGES.map(check))).filter(Boolean);

  if (failures.length === 0) {
    console.log(`live: ${PAGES.length} URLs on ${base} match the build`);
    process.exit(0);
  }

  console.error(`attempt ${attempt} of ${ATTEMPTS}:`);
  failures.forEach((failure) => console.error(`  ${failure}`));

  if (attempt < ATTEMPTS) await sleep(DELAY_MS);
}

process.exit(1);
