import { join, resolve, dirname } from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';

import { createContentManifest } from './utils/create-content-manifest.js';
import { getFrontmatter } from './utils/get-frontmatter.js';
import { slugify } from '../../src/utils/slugify.js';

import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { BodyScripts } from './components/BodyScripts/index.js';

import { PostsList } from '../../src/components/content/PostsList/index.js';
import { Categories } from '../../src/components/navigation/Categories/index.js';
import { Tags } from '../../src/components/page-sections/Tags/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const TEMPLATE_PATH = resolve(
  __dirname,
  '../../src/pages/Category/template.html'
);
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`).sort().reverse();
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const pathToCategoryDir = join(__dirname, '../../dist/categories');
const posts = [];
const categories = [];

fs.mkdirSync(pathToCategoryDir, { recursive: true });

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const document = contentManifest[frontmatter.route];

  if (document) {
    const { category, title, description, tags, year, month, day, slug } =
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
});

const uniqueCategories = [...new Set(categories)];

uniqueCategories.forEach((category) => {
  let html = '';

  const categoryPosts = posts.filter((post) => {
    return post.category.toLowerCase() === category.toLowerCase();
  });

  let categoryTags = [];

  categoryPosts.forEach(
    (post) => (categoryTags = [...categoryTags, ...post.tags])
  );

  html = TEMPLATE.replace(/{{FRONTPAGE_POSTS}}/, PostsList(categoryPosts, '*'));
  html = html.replace(/{{POST_CATEGORIES}}/, Categories(uniqueCategories));
  html = html.replace(/{{OPEN_GRAPH}}/, OpenGraphTags());
  html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
  html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
  html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
  html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
  html = html.replace(/{{PAGE_SECTION_AUTHOR}}/, Author());
  html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());
  html = html.replace(/{{CATEGORY_TITLE}}/, category);
  html = html.replace(/{{CATEGORY_DESCRIPTION}}/, '');
  html = html.replace(/{{POST_TAGS}}/, Tags([...new Set(categoryTags)]));

  const pathToCategory = join(
    __dirname,
    `../../dist/categories/${slugify(category)}.html`
  );

  fs.writeFileSync(pathToCategory, html, 'utf-8');
});
