import fs from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { Analytics } from '../posts/components/Analytics/index.js';
import { ArticleCSS } from '../posts/components/ArticleCSS/index.js';
import { BodyScripts } from '../posts/components/BodyScripts/index.js';
import { GlobalCSS } from '../posts/components/GlobalCSS/index.js';
import { HeadScripts } from '../posts/components/HeadScripts/index.js';
import { OpenGraphTags } from '../posts/components/OpenGraphTags/index.js';

let html = '';

const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = resolve(
  DIR_NAME,
  '../../src/pages/Projects/pages/Frameport/template.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const pathToDir = join(DIR_NAME, '../../dist/projects/frameport');
const pathToFrameportPage = join(
  DIR_NAME,
  '../../dist/projects/frameport/index.html'
);

fs.mkdirSync(pathToDir, { recursive: true });

html = TEMPLATE.replace(
  /{{OPEN_GRAPH}}/,
  OpenGraphTags({
    title: '@phun-ky/frameport',
    siteName: 'A zero dependency package to highlight elements',
    description:
      "Frameport is a zero dependency JavaScript package to highlight elements on web pages and in documentation. It's easy to use and highly customizable, making it the perfect tool for developers, designers, and content creators alike."
  })
);
html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
html = html.replace(/{{ANALYTICS}}/, Analytics());
html = html.replace(/{{ARTICLE_CSS}}/, ArticleCSS());
html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
html = html.replace(/{{PAGE_SECTION_AUTHOR}}/, Author());
html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer('MIT'));

fs.writeFileSync(pathToFrameportPage, html, 'utf-8');
