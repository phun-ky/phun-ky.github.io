import fs, { globSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import process from 'node:process';

// Fails when a built page links to, or loads, an internal path that the site
// doesn't serve. Paths resolve the way GitHub Pages serves them: the file
// itself, `<path>.html`, or `<path>/index.html`.
const DIST_DIR = process.argv[2] ?? 'dist';
// Known broken targets, tracked in an issue. Each must stay broken, so the
// list can't go stale: remove an entry when you fix it.
const KNOWN_BROKEN = Object.freeze([]);

if (!fs.existsSync(DIST_DIR)) {
  console.error(`\`${DIST_DIR}\` does not exist, run \`npm run build\` first`);
  process.exit(1);
}

// Paths that other repositories' GitHub Pages sites serve under phun-ky.net.
const OTHER_SITES = Object.freeze(['/moebius']);
// Absolute links to the site itself are checked as internal paths.
const SITE = /^(?:https?:)?\/\/(?:www\.)?phun-ky\.net(?=\/|$)/i;
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
const ATTRIBUTE = /\s(?:href|src)=(["'])(.*?)\1/gi;
const isFile = (path) => fs.existsSync(path) && fs.statSync(path).isFile();
const isServed = (target) => {
  const path = join(DIST_DIR, target);

  if (target.endsWith('/')) return isFile(join(path, 'index.html'));

  return (
    isFile(path) || isFile(`${path}.html`) || isFile(join(path, 'index.html'))
  );
};
const pages = globSync('**/*.html', { cwd: DIST_DIR });
const broken = new Map();

pages.forEach((page) => {
  const source = fs.readFileSync(join(DIST_DIR, page), 'utf-8');

  for (const [, , attribute] of source.matchAll(ATTRIBUTE)) {
    const value = attribute.trim().replace(SITE, '') || '/';
    const url = value.split(/[?#]/)[0];

    if (url === '' || EXTERNAL.test(value)) continue;

    let target;

    try {
      target = decodeURIComponent(url);
    } catch {
      target = url;
    }

    if (!target.startsWith('/')) {
      target = posix.join('/', dirname(page), target);
    }

    const isOtherSite = OTHER_SITES.some(
      (site) => target === site || target.startsWith(`${site}/`)
    );

    if (isOtherSite || isServed(target)) continue;

    if (!broken.has(target)) broken.set(target, new Set());

    broken.get(target).add(page);
  }
});

const unexpected = [...broken].filter(
  ([target]) => !KNOWN_BROKEN.includes(target)
);
const fixed = KNOWN_BROKEN.filter((target) => !broken.has(target));

unexpected.forEach(([target, from]) => {
  const [first] = from;

  console.error(
    `missing: ${target} (linked from ${from.size} page(s), e.g. ${first})`
  );
});
fixed.forEach((target) => {
  console.error(
    `fixed: ${target} is no longer broken, remove it from KNOWN_BROKEN`
  );
});

if (unexpected.length !== 0 || fixed.length !== 0) process.exit(1);

console.log(
  `links: ${pages.length} pages checked, ${KNOWN_BROKEN.length} known broken target(s)`
);
