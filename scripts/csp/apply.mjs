import fs, { globSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CSP_META, REFERRER_META, policyFor } from './policy.mjs';

// Writes each built page's Content Security Policy and referrer policy into
// its <head>, right after <meta charset>, so they apply before any script or
// style. Runs as the last build step, after every page exists.
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(DIR_NAME, '../../dist');
const CHARSET = /<meta charset="utf-8"\s*\/?>/i;
const pages = globSync('**/*.html', { cwd: DIST_DIR });

pages.forEach((page) => {
  const file = join(DIST_DIR, page);
  const html = fs.readFileSync(file, 'utf-8').replace(CSP_META, '');
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policyFor(html)}" />\n    ${REFERRER_META}`;

  if (!CHARSET.test(html)) {
    throw new Error(
      `${page} has no <meta charset="utf-8"> to put the policy after`
    );
  }

  fs.writeFileSync(
    file,
    html.replace(CHARSET, (charset) => `${charset}\n    ${meta}`),
    'utf-8'
  );
});

console.log(`csp: wrote the policy into ${pages.length} pages`);
