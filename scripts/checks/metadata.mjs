import fs, { globSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import {
  SITE,
  canonicalUrl,
  isNotFoundPage,
  isRedirectPage
} from '../meta/site.mjs';

// Checks the metadata of every built page: a title, a description, Open Graph
// and Twitter tags with an absolute image the site serves, and a canonical
// URL that matches the page's address. Also checks noindex on the 404 page,
// sitemap.xml (exactly the canonical pages), robots.txt, /favicon.ico and the
// web manifest.
const DIST_DIR = process.argv[2] ?? 'dist';
const failures = [];
const all = (html, pattern) => [...html.matchAll(pattern)].map((m) => m[1]);
const meta = (html, attribute, name) =>
  all(
    html,
    new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="([^"]*)"`, 'g')
  );
const isEmpty = (value) =>
  !value || !value.trim() || value === 'null' || /\{\{[A-Z_]+\}\}/.test(value);
const pages = globSync('**/*.html', { cwd: DIST_DIR }).sort();
const canonical = [];

pages.forEach((page) => {
  const html = fs.readFileSync(join(DIST_DIR, page), 'utf-8');
  const fail = (message) => failures.push(`${page}: ${message}`);

  if (isRedirectPage(html)) return;

  const titles = all(html, /<title>([^<]*)<\/title>/g);

  if (titles.length !== 1 || isEmpty(titles[0])) fail('needs one title');

  [
    ['name', 'description'],
    ['property', 'og:title'],
    ['property', 'og:description'],
    ['name', 'twitter:title'],
    ['name', 'twitter:description']
  ].forEach(([attribute, name]) => {
    const values = meta(html, attribute, name);

    if (values.length === 0 || values.some(isEmpty)) {
      fail(`${name} is missing or empty (${JSON.stringify(values)})`);
    }
  });

  [
    ['property', 'og:image'],
    ['name', 'twitter:image']
  ].forEach(([attribute, name]) => {
    const values = meta(html, attribute, name);

    if (values.length === 0) fail(`${name} is missing`);

    values.forEach((url) => {
      if (!url.startsWith(`${SITE}/`)) {
        fail(`${name} isn't an absolute URL on the site: ${url}`);
      } else if (
        !fs.existsSync(join(DIST_DIR, decodeURI(url.slice(SITE.length))))
      ) {
        fail(`${name} points at a file the site doesn't serve: ${url}`);
      }
    });
  });

  const links = all(html, /<link\s+rel="canonical"\s+href="([^"]*)"/g);
  const robots = meta(html, 'name', 'robots');

  if (isNotFoundPage(page)) {
    if (!robots.includes('noindex'))
      fail('needs <meta name="robots" content="noindex">');

    if (links.length !== 0) fail("shouldn't have a canonical URL");

    return;
  }

  const url = canonicalUrl(page);

  if (links.length !== 1 || links[0] !== url) {
    fail(`canonical should be ${url}, is ${JSON.stringify(links)}`);
  }

  if (!meta(html, 'property', 'og:url').every((value) => value === url)) {
    fail(`og:url should be ${url}`);
  }

  canonical.push(url);
});

const sitemapFile = join(DIST_DIR, 'sitemap.xml');
const sitemap = fs.existsSync(sitemapFile)
  ? all(fs.readFileSync(sitemapFile, 'utf-8'), /<loc>([^<]*)<\/loc>/g).sort()
  : null;

if (!sitemap) {
  failures.push('sitemap.xml is missing');
} else if (sitemap.join('\n') !== [...canonical].sort().join('\n')) {
  failures.push(
    `sitemap.xml lists ${sitemap.length} URLs, the site has ${canonical.length} canonical pages`
  );
}

const robotsFile = join(DIST_DIR, 'robots.txt');

if (
  !fs.existsSync(robotsFile) ||
  !fs.readFileSync(robotsFile, 'utf-8').includes(`Sitemap: ${SITE}/sitemap.xml`)
) {
  failures.push('robots.txt is missing or has no Sitemap line');
}

if (!fs.existsSync(join(DIST_DIR, 'favicon.ico'))) {
  failures.push('/favicon.ico is missing');
}

const manifest = JSON.parse(
  fs.readFileSync(join(DIST_DIR, 'meta/site.webmanifest'), 'utf-8')
);

if (!manifest.start_url?.startsWith(manifest.scope ?? '\0')) {
  failures.push("the web manifest's start_url must be inside its scope");
}

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  console.error(`${failures.length} problem(s) on ${pages.length} pages`);
  process.exit(1);
}

console.log(
  `metadata: ${pages.length} pages checked, ${canonical.length} canonical URLs in sitemap.xml`
);
