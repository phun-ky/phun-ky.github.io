import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from '../meta/site.mjs';

import { createContentManifest } from './utils/create-content-manifest.js';
import { getHTMLfromMarkdown } from './utils/get-html-from-markdown.js';
import { getHTML } from './utils/get-html.js';

// Writes dist/feed.xml, an RSS 2.0 feed of the newest posts with their full
// content. Archive posts (2005-2010) are left out: they're kept for the
// record, not news to subscribe to.
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(DIR_NAME, '../../src/assets/posts');
const DIST_DIR = join(DIR_NAME, '../../dist');
const NUMBER_OF_POSTS = 20;
const escape = (text = '') =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
// Feed readers show the content away from the site, so its links and images
// need the site's address
const absolute = (html) => html.replaceAll(/(href|src)="\//g, `$1="${SITE}/`);
const manifest = createContentManifest(CONTENT_DIR);
const items = Object.entries(manifest)
  .filter(([, { frontmatter }]) => frontmatter.category !== 'Archive')
  .sort(([a], [b]) => b.localeCompare(a))
  .slice(0, NUMBER_OF_POSTS)
  .map(([route, document]) => {
    const { title, category, tags = [], description } = document.frontmatter;
    const [year, month, day] = route.split('/').slice(1, 4).map(Number);
    const url = `${SITE}${route}`;
    const content = `${getHTMLfromMarkdown(description)}${getHTML(document)}`;

    return `    <item>
      <title>${escape(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(Date.UTC(year, month - 1, day)).toUTCString()}</pubDate>
${[category, ...tags].map((name) => `      <category>${escape(name)}</category>`).join('\n')}
      <description>${escape(absolute(content))}</description>
    </item>`;
  });

fs.writeFileSync(
  join(DIST_DIR, 'feed.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>phun-ky.net</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>The world from my point of view, and some pedantic creativity</description>
    <language>en-gb</language>
${items.join('\n')}
  </channel>
</rss>
`,
  'utf-8'
);

console.log(`feed: ${items.length} posts in feed.xml`);
