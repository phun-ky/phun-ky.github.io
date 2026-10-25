import fs, { globSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE, canonicalUrl, isNotFoundPage, isRedirectPage } from './site.mjs';

// Gives every built page the metadata that depends on its address, and writes
// the files search engines and browsers look for at the root:
// - a canonical URL, with og:url and twitter:url set to it;
// - absolute Open Graph and Twitter images, which link previews need;
// - noindex on the 404 page, which GitHub Pages serves for any unknown path;
// - sitemap.xml, robots.txt and /favicon.ico.
// Runs after every page is built and before the Content Security Policy.
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(DIR_NAME, '../../dist');
const absolute = (url) => (url.startsWith('/') ? `${SITE}${url}` : url);
const setContent = (html, attribute, name, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*(")`, 'g'),
    (match, start, end) => `${start}${value}${end}`
  );
const pages = globSync('**/*.html', { cwd: DIST_DIR }).sort();
const sitemap = [];

pages.forEach((page) => {
  const file = join(DIST_DIR, page);

  let html = fs.readFileSync(file, 'utf-8');

  if (isRedirectPage(html)) return;

  html = html.replace(
    /(<meta\s+(?:property|name)="(?:og|twitter):image"\s+content=")([^"]*)(")/g,
    (match, start, url, end) => `${start}${absolute(url)}${end}`
  );

  if (isNotFoundPage(page)) {
    html = html.replace(
      '</head>',
      '<meta name="robots" content="noindex" />\n  </head>'
    );
  } else {
    const url = canonicalUrl(page);

    html = setContent(html, 'property', 'og:url', url);
    html = setContent(html, 'property', 'twitter:url', url);
    html = html.replace(
      '</head>',
      `<link rel="canonical" href="${url}" />\n  </head>`
    );
    sitemap.push(url);
  }

  fs.writeFileSync(file, html, 'utf-8');
});

fs.writeFileSync(
  join(DIST_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`,
  'utf-8'
);
fs.writeFileSync(
  join(DIST_DIR, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
  'utf-8'
);
fs.copyFileSync(
  join(DIST_DIR, 'img/meta/favicon.ico'),
  join(DIST_DIR, 'favicon.ico')
);

console.log(
  `meta: ${sitemap.length} canonical pages in sitemap.xml, plus robots.txt and favicon.ico`
);
