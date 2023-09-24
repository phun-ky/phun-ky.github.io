/* eslint-disable no-console */
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

import { glob } from 'glob';

import { createContentManifest } from './utils/create-content-manifest.js';
import { getHTML } from './utils/get-html.js';
import { getFrontmatter } from './utils/get-frontmatter.js';
import { slugify } from '../../src/utils/slugify.js';

import { ArticleCSS } from './components/ArticleCSS/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { BodyScripts } from './components/BodyScripts/index.js';

import { PostByline } from '../../src/components/meta/PostByline/index.js';
import { ArchiveNotice } from '../../src/components/communication/ArchiveNotice/index.js';
import { Breadcrumbs } from '../../src/components/navigation/Breadcrumbs/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';


const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const TEMPLATE_PATH = resolve(
  __dirname,
  '../..//src/assets/templates/article.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`);

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const document = contentManifest[frontmatter.route];

  if (document) {
    let html = '';

    const rendered = getHTML(document);
    const {year, month, day, slug, category, title, image, description} = frontmatter;

    html = TEMPLATE.replace(/{{CONTENT}}/, rendered);
    html = html.replace(
      /{{OPEN_GRAPH}}/,
      OpenGraphTags({
        type: 'article',
        title,
        url: `https://phun-ky.net/${year}/${month}/${day}/${slug}`,
        image,
        description
      })
    );
    html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
    html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
    html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
    html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
    html = html.replace(/{{PAGE_SECTION_AUTHOR}}/, Author());
    html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());
    html = html.replace(/{{ARTICLE_CSS}}/, ArticleCSS());
    html = html.replace(/{{PAGE_TITLE}}/, title);
    html = html.replace(/{{TITLE}}/, title);
    html = html.replace(/{{DESCRIPTION}}/, description);
    html = html.replace(/{{POST_NOTICE}}/, ArchiveNotice(category));
    html = html.replace(/{{BREADCRUMBS}}/, Breadcrumbs(category,`/categories/${slugify(category)}` ));
    html = html.replace(/{{POST_META}}/, PostByline(year, month, day));

    const pathToDir = join(__dirname, `../../dist/${year}/${month}/${day}`);
    const pathToFile = `${pathToDir}/${slug}.html`;

    fs.mkdirSync(pathToDir, { recursive: true });

    fs.writeFileSync(pathToFile, html, 'utf-8');
  } else {
    console.error(`File \`${file}\` not converted, missing \`document\``);
  }
});
