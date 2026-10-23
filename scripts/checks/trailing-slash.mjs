/* eslint-disable no-console */
import fs, { globSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import vm from 'node:vm';

// GitHub Pages serves `/a/b/` from the 404 page, whose script retries without
// the trailing slash. Run that script for every page served as `<path>.html`
// and check it lands on that page, and that it leaves other URLs alone.
const DIST_DIR = process.argv[2] ?? 'dist';
const SCRIPT = /<script id="trailing-slash-redirect">([\s\S]*?)<\/script>/;

if (!fs.existsSync(DIST_DIR)) {
  console.error(`\`${DIST_DIR}\` does not exist, run \`npm run build\` first`);
  process.exit(1);
}

const notFound = fs.readFileSync(join(DIST_DIR, '404.html'), 'utf-8');
const [, source] = notFound.match(SCRIPT) ?? [];

if (!source) {
  console.error('`404.html` has no `trailing-slash-redirect` script');
  process.exit(1);
}

const script = new vm.Script(source);
const redirect = (url) => {
  const { pathname, search, hash } = new URL(url, 'https://phun-ky.net');

  let replaced = null;

  script.runInNewContext({
    location: {
      pathname,
      search,
      hash,
      replace: (to) => {
        replaced = to;
      }
    }
  });

  return replaced;
};
const routes = globSync('**/*.html', { cwd: DIST_DIR })
  .filter((page) => page !== '404.html' && !page.endsWith('index.html'))
  .map((page) => `/${page.replace(/\.html$/, '')}`);
const failures = [];

routes.forEach((route) => {
  const to = redirect(`${route}/`);

  if (to !== route) failures.push(`${route}/ goes to ${to}, not ${route}`);
});

const cases = [
  [
    '/2015/09/29/trusted-data-for-developers/?a=1#b',
    '/2015/09/29/trusted-data-for-developers?a=1#b'
  ],
  ['/2015/09/29/trusted-data-for-developers', null],
  ['/', null],
  ['/nope', null]
];

cases.forEach(([from, expected]) => {
  const to = redirect(from);

  if (to !== expected) failures.push(`${from} goes to ${to}, not ${expected}`);
});

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}

console.log(
  `trailing slash: ${routes.length} routes redirect from \`<route>/\``
);
