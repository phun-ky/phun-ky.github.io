import { join, resolve, dirname } from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';

import { createContentManifest } from './utils/create-content-manifest.js';
import { getFrontmatter } from './utils/get-frontmatter.js';
import { slugify } from '../../src/utils/slugify.js';

import { GlobalCSS } from './components/GlobalCSS/index.js';
import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { BodyScripts } from './components/BodyScripts/index.js';

import { Tags } from '../../src/components/page-sections/Tags/index.js';
import { PostsList } from '../../src/components/content/PostsList/index.js';
import { Categories } from '../../src/components/navigation/Categories/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Analytics } from './components/Analytics/index.js';

let allTags = [];

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToTagDir = join(__dirname, '../../dist/tags');
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`).sort().reverse();
const posts = [];
const categories = [];
const TEMPLATE_PATH = resolve(__dirname, '../../src/pages/Tags/template.html');
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

fs.mkdirSync(pathToTagDir, { recursive: true });

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const document = contentManifest[frontmatter.route];

  if (document) {
    const { year, month, day, slug, category, description, title, tags } =
      frontmatter;

    posts.push({
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

  if (frontmatter.category) {
    const { category } = frontmatter;

    categories.push(category);
  } else {
    categories.push('archive');
  }

  if (frontmatter.tags) {
    allTags = [...allTags, ...frontmatter.tags];
  }
});

const uniqueTags = [...new Set(allTags)];

uniqueTags.forEach((tag) => {
  let html = '';

  const tagPosts = posts.filter((post) => post.tags.indexOf(tag) !== -1);
  const tagCategories = [];

  tagPosts.forEach((post) => tagCategories.push(post.category));

  html = TEMPLATE.replace(/{{FRONTPAGE_POSTS}}/, PostsList(tagPosts));
  html = html.replace(
    /{{POST_CATEGORIES}}/,
    Categories([...new Set(tagCategories)])
  );
  html = html.replace(/{{OPEN_GRAPH}}/, OpenGraphTags());
  html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
  html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
  html = html.replace(/{{ANALYTICS}}/, Analytics());
  html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
  html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
  html = html.replace(/{{PAGE_SECTION_AUTHOR}}/, Author());
  html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());
  html = html.replace(/{{TAG_TITLE}}/, tag);
  html = html.replace(/{{TAG}}/, tag);
  html = html.replace(/{{TAG_DESCRIPTION}}/, '');
  html = html.replace(/{{POST_TAGS}}/, Tags([...new Set([tag])]));

  const pathToTag = join(__dirname, `../../dist/tags/${slugify(tag)}.html`);

  fs.writeFileSync(pathToTag, html, 'utf-8');
});
