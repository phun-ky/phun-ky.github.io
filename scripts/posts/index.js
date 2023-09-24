import { join, resolve, dirname } from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';

import { createContentManifest } from './utils/create-content-manifest.js';

import { getFrontmatter } from './utils/get-frontmatter.js';

import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { BodyScripts } from './components/BodyScripts/index.js';

import { PostsList } from '../../src/components/content/PostsList/index.js';
import { Categories } from '../../src/components/navigation/Categories/index.js';
import { Tags } from '../../src/components/page-sections/Tags/index.js';
import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';

let frontpageTags = [];
let html = '';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`).sort().reverse().slice(0, 20);
const frontpagePosts = [];
const frontpageCategories = [];
const totalFiles = glob.sync(`${CONTENT_DIR}/*.md`);
const TEMPLATE_PATH = resolve(
  __dirname,
  '../../src/assets/templates/frontpage.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const pathToFrontpage = join(__dirname, '../../dist/index.html');

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const document = contentManifest[frontmatter.route];

  if (document) {
    const {year, month, day, slug, category, title, description, tags} = frontmatter;

    frontpagePosts.push({
      year,
      month,
      day,
      slug,
      category,
      title,
      description,
      tags,
      url: `/${year}/${month}/${day}/${slug}`
    });
  }
});


totalFiles.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);

  if (frontmatter.category) {
    const { category } = frontmatter;

    frontpageCategories.push(category);
  }

  if (frontmatter.tags) {
    const { tags } = frontmatter;

    frontpageTags = [...frontpageTags, ...tags];
  }
});


html = TEMPLATE.replace(
  /{{FRONTPAGE_POSTS}}/,
  PostsList(frontpagePosts)
);
html = html.replace(/{{OPEN_GRAPH}}/, OpenGraphTags());
html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
html = html.replace(/{{PAGE_SECTION_AUTHOR}}/, Author());
html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());
html = html.replace(
  /{{POST_CATEGORIES}}/,
  Categories([...new Set(frontpageCategories)])
);
html = html.replace(
  /{{POST_TAGS}}/,
  Tags([...new Set(frontpageTags)])
);



fs.writeFileSync(pathToFrontpage, html, 'utf-8');