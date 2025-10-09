import fs from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { Analytics } from '../posts/components/Analytics/index.js';
import { BodyScripts } from '../posts/components/BodyScripts/index.js';
import { GlobalCSS } from '../posts/components/GlobalCSS/index.js';
import { HeadScripts } from '../posts/components/HeadScripts/index.js';
import { OpenGraphTags } from '../posts/components/OpenGraphTags/index.js';
import { ProjectsCSS } from '../posts/components/ProjectsCSS/index.js';

let html = '';

const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = resolve(
  DIR_NAME,
  '../../src/pages/Projects/template.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const pathToDir = join(DIR_NAME, '../../dist/projects');
const pathToFrontpage = join(DIR_NAME, '../../dist/projects/index.html');

fs.mkdirSync(pathToDir, { recursive: true });

html = TEMPLATE.replace(/{{OPEN_GRAPH}}/, OpenGraphTags());
html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
html = html.replace(/{{PROJECTS_CSS}}/, ProjectsCSS());
html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
html = html.replace(/{{ANALYTICS}}/, Analytics());
html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());

fs.writeFileSync(pathToFrontpage, html, 'utf-8');
