import fs from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { RedirectPage } from './redirect-page.js';

// Pages that moved. GitHub Pages can't send a 301, so each old path gets a
// page that sends the visitor on.
const REDIRECTS = Object.freeze({
  '/packages': 'https://mypackages.dev/',
  // Merged into the style-guide tag
  '/tags/styleguide': '/tags/style-guide'
});
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(DIR_NAME, '../../dist');

Object.entries(REDIRECTS).forEach(([from, to]) => {
  const pathToDir = join(DIST_DIR, from);

  fs.mkdirSync(pathToDir, { recursive: true });

  fs.writeFileSync(join(pathToDir, 'index.html'), RedirectPage(to), 'utf-8');
});
