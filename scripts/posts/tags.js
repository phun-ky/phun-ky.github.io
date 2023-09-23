import { join, resolve, dirname } from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import Markdoc from '@markdoc/markdoc';

import { createContentManifest } from './lib/create-content-manifest.js';
import { processTokens } from './lib/process-tokens.js';
import { parseMarkdocFrontmatter } from './lib/parse-markdoc-frontmatter.js';
// import { getDocument } from './lib/get-document.js';
import jsdom from 'jsdom';
// import { getHTML } from './lib/get-html.js';

// const document = getDocument(req);

// if (!document) {
//   //
// }

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
function stripHtml(dirtyString) {
  const dom = new jsdom.JSDOM(`<!DOCTYPE html><div>${dirtyString}</div>`);

  return dom.window.document.querySelector('div').textContent;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`).sort().reverse();
const posts = [];

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const tokenizer = new Markdoc.Tokenizer({ html: true });
  const tokens = tokenizer.tokenize(rawText);
  const processed = processTokens(tokens);
  const ast = Markdoc.parse(processed);
  const frontmatter = parseMarkdocFrontmatter(ast);
  const document = contentManifest[frontmatter.route];

  if (document) {
    if (frontmatter.route) {
      const matches = frontmatter.route.match(
        /\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)/
      );
      const [string, year, month, day, slug] = matches;
      const { category, title, description, tags } = frontmatter;

      posts.push({
        year,
        month,
        day,
        slug,
        category,
        title,
        description,
        tags,
        url: `/${year}/${month}/${day}/${slug}.html`
      });
    } else {
      console.log(frontmatter);
    }
  } else {
    console.log('no');
  }
});

let tags = [];

const categories = [];
const totalFiles = glob.sync(`${CONTENT_DIR}/*.md`);

totalFiles.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const tokenizer = new Markdoc.Tokenizer({ html: true });
  const tokens = tokenizer.tokenize(rawText);
  const processed = processTokens(tokens);
  const ast = Markdoc.parse(processed);
  const frontmatter = parseMarkdocFrontmatter(ast);

  if (frontmatter.category) {
    const { category } = frontmatter;

    categories.push(category);
  } else {
    categories.push('archive');
  }

  if (frontmatter.tags) {
    tags = [...tags, ...frontmatter.tags];
  }
});

const uniqueTags = [...new Set(tags)];
const TEMPLATE_PATH = resolve(
  __dirname,
  '../../src/assets/templates/tags.html'
);

uniqueTags.forEach((tag) => {
  let html = '';

  const tagPosts = posts.filter((post) => post.tags.indexOf(tag) >= 0);
  const tagCategories = [];

  tagPosts.forEach((post) => tagCategories.push(post.category));

  const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  html = TEMPLATE.replace(
    /{{FRONTPAGE_POSTS}}/,
    `<ul class="ph posts">${tagPosts
      .map((post) => {
        const { title, description, url, year, month, day, category } = post;

        return `
      <li class="ph post">
      <a class="ph post-link" href="${url}">
        <h2 class="ph post-title">${title}</h2>
        <p class="ph post-description">${description}</p>
      </a>
      <address class="ph post-meta">
        Written by Alexander in <a class="ph" href="/categories/${slugify(
    category.toLowerCase()
  )}">${category}</a> on <time pubdate datetime="${year}-${month}-${day}" class="ph">${year}/${month}/${day}</time>
        </address>
      </li>`;
      })
      .join('\n')}
  </ul>`
  );

  html = html.replace(
    /{{POST_CATEGORIES}}/,
    `<ul class="ph categories">${[...new Set(tagCategories)]
      .sort()
      .map((category) => {
        return `
      <li class="ph category">
      <a class="ph category-link" href="/categories/${slugify(
    category.toLowerCase()
  )}.html">${category}</a>

      </li>`;
      })
      .join('\n')}
  </ul>`
  );

  html = html.replace(/{{ TAG_TITLE }}/, tag);
  html = html.replace(/{{ TAG_DESCRIPTION }}/, '');
  html = html.replace(
    /{{POST_TAGS}}/,
    `<ul class="ph tags">${[...new Set([tag])]
      .sort()
      .map((tag) => {
        return `
      <li class="ph tag">
      <a class="ph tag-link" href="/tags/${slugify(
    tag.toLowerCase()
  )}.html">${tag}</a>

      </li>`;
      })
      .join('\n')}
  </ul>`
  );

  const pathToTagDir = join(__dirname, '../../dist/tags');

  fs.mkdirSync(pathToTagDir, { recursive: true });

  const pathToTag = join(__dirname, `../../dist/tags/${slugify(tag)}.html`);

  fs.writeFileSync(pathToTag, html, 'utf-8');
});
