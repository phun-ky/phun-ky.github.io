/* eslint-disable no-console */
import fs, { globSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import process from 'node:process';

// Fails when a built page links to, or loads, an internal path that the site
// doesn't serve. Paths resolve the way GitHub Pages serves them: the file
// itself, `<path>.html`, or `<path>/index.html`.
const DIST_DIR = process.argv[2] ?? 'dist';
// Known broken targets, tracked in an issue. Each must stay broken, so the
// list can't go stale: remove an entry when you fix it.
// https://github.com/phun-ky/phun-ky.github.io/issues/131
const KNOWN_BROKEN = Object.freeze([
  '/img/speccer/speccer-opengraph.webp',
  '/img/speccer/speccer.webp',
  '/img/speccer/speccer-showcase.jpeg',
  '/projects/speccer',
  '/files/acidtests_lecture_nerdvana_week46_2010.odp',
  '/files/acidtests_lecture_nerdvana_week46_2010.ppt',
  '/assets/img/blog/imgc4928b9eb8ca15678b567d7c5864c1f0.webp',
  '/img/blog/img7730e22b5eccfe74d5a3d4813e4123cc.webp',
  '/2008/10/24/kubuntu',
  '/2008/10/24/xubuntu',
  '/2008/10/24/ubuntustudio',
  '/2008/10/24/mythbuntu',
  '/2008/10/03/kubuntu',
  '/2008/10/03/xubuntu',
  '/2008/10/03/ubuntustudio',
  '/2008/10/03/mythbuntu',
  '/2008/09/05/mandriva',
  '/img/GoOpen-2008_logo.webp',
  '/twitter',
  '/img/blog/img3bb1ad086c4aaf14565ac0457ffbea19.webp',
  '/img/safaribug.webp',
  '/img/blog/img38ce2f1fb40d57c9b6dadb814ef449ea.webp'
]);

if (!fs.existsSync(DIST_DIR)) {
  console.error(`\`${DIST_DIR}\` does not exist, run \`npm run build\` first`);
  process.exit(1);
}

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

  for (const [, , value] of source.matchAll(ATTRIBUTE)) {
    const url = value.trim().split(/[?#]/)[0];

    if (url === '' || EXTERNAL.test(value.trim())) continue;

    let target;

    try {
      target = decodeURIComponent(url);
    } catch {
      target = url;
    }

    if (!target.startsWith('/')) {
      target = posix.join('/', dirname(page), target);
    }

    if (isServed(target)) continue;

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
