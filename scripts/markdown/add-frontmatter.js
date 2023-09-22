import fs from 'node:fs/promises';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import Markdoc from '@markdoc/markdoc';

import { processTokens } from '../posts/lib/process-tokens.js';
import { parseMarkdocFrontmatter } from '../posts/lib/parse-markdoc-frontmatter.js';

function slugify(str) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');

const files = glob.sync(`${CONTENT_DIR}/*.md`);

files.forEach(async (file) => {
  let rawText = await fs.readFile(file, 'utf-8');
  // const tokenizer = new Markdoc.Tokenizer({ html: true });
  // const tokens = tokenizer.tokenize(rawText);
  // const processed = processTokens(tokens);
  // const ast = Markdoc.parse(processed);
  // const frontmatter = parseMarkdocFrontmatter(ast);

  // const matches = file.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})/);
  // const [string, year, month, day] = matches;
  rawText = rawText.replace('  title:', 'title:');

  await fs.writeFile(file, rawText, 'utf-8');
});

// const html = await getHTML(document, req);
