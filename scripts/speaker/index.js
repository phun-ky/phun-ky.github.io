import fs from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Author } from '../../src/components/page-sections/Author/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { BodyScripts } from '../posts/components/BodyScripts/index.js';
import { GlobalCSS } from '../posts/components/GlobalCSS/index.js';
import { HeadScripts } from '../posts/components/HeadScripts/index.js';
import { OpenGraphTags } from '../posts/components/OpenGraphTags/index.js';

let html;

// Gives every element inside the talk list the site's `ph` class, so the
// site's styles apply to it
const withSiteClasses = (talks) => {
  let isRoot = true;

  return talks.replace(
    /<([a-z][a-z0-9]*)(\s[^>]*)?>/gi,
    (tag, name, attributes = '') => {
      if (isRoot) {
        isRoot = false;

        return tag;
      }

      if (/\sclass="/.test(attributes)) {
        return `<${name}${attributes.replace(/\sclass="([^"]*)"/, ' class="$1 ph"')}>`;
      }

      return `<${name}${attributes.replace(/\/$/, '')} class="ph"${attributes.endsWith('/') ? ' /' : ''}>`;
    }
  );
};
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = resolve(
  DIR_NAME,
  '../../src/pages/Speaker/template.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
// The talk list, saved from Sessionize by `npm run update:talks`
const TALKS = fs.readFileSync(
  resolve(DIR_NAME, '../../src/pages/Speaker/talks.html'),
  'utf-8'
);
const pathToDir = join(DIR_NAME, '../../dist/speaker');
const pathToFrontpage = join(DIR_NAME, '../../dist/speaker/index.html');

fs.mkdirSync(pathToDir, { recursive: true });

html = TEMPLATE.replace(/{{OPEN_GRAPH}}/, () => OpenGraphTags());
html = html.replace(/{{GLOBAL_CSS}}/, () => GlobalCSS());
html = html.replace(/{{HEAD_SCRIPTS}}/, () => HeadScripts());
html = html.replace(/{{BODY_SCRIPTS}}/, () => BodyScripts());
html = html.replace(/{{PAGE_SECTION_HEADER}}/, () => Header());
html = html.replace(/{{PAGE_SECTION_AUTHOR}}/, () => Author());
html = html.replace(/{{PAGE_SECTION_FOOTER}}/, () => Footer());
html = html.replace(/{{SPEAKER_TALKS}}/, () => withSiteClasses(TALKS));

fs.writeFileSync(pathToFrontpage, html, 'utf-8');
