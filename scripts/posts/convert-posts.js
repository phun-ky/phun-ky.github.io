import fs from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import Markdoc from '@markdoc/markdoc';

import { createContentManifest } from './lib/create-content-manifest.js';
import { processTokens } from './lib/process-tokens.js';
import { getHTML } from './lib/get-html.js';
import { parseMarkdocFrontmatter } from './lib/parse-markdoc-frontmatter.js';
// import { getDocument } from './lib/get-document.js';
// import { getHTML } from './lib/get-html.js';

// const document = getDocument(req);

// if (!document) {
//   //
// }

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`);

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const tokenizer = new Markdoc.Tokenizer({ html: true });
  const tokens = tokenizer.tokenize(rawText);
  const processed = processTokens(tokens);
  const ast = Markdoc.parse(processed);
  const frontmatter = parseMarkdocFrontmatter(ast);
  const document = contentManifest[frontmatter.route];

  if (document) {
    let html = getHTML(document);

    if (frontmatter.route) {
      const matches = frontmatter.route.match(
        /\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)/
      );
      const [string, year, month, day, slug] = matches;
      const dtf = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      });
      const d = new Date(`${year}/${month}/${day}`);
      const date = dtf.format(d.getTime());
      const postMeta = `<address class="ph byline">
    Written by Alexander on <time pubdate datetime="${year}-${month}-${day}" class="ph">${date}</time>
    </address>`;

      html = html.replace(/{{ POST_META }}/, postMeta);

      const pathToDir = join(__dirname, `../../dist/${year}/${month}/${day}`);
      const pathToFile = `${pathToDir}/${slug}.html`;

      fs.mkdirSync(pathToDir, { recursive: true });

      fs.writeFileSync(pathToFile, html, 'utf-8');
    } else {
      console.log(frontmatter);
    }
  } else {
    console.log('no');
  }
});
