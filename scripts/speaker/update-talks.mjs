import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Saves the talk list from Sessionize as HTML, so the speaker page shows it
// without loading a script from sessionize.com. Sessionize serves the list as
// one `document.write('...')` call with ready-made HTML; the string is read
// as data, never run. The snapshot is committed, so builds stay reproducible:
// run `npm run update:talks` when the talks change.
const SESSIONIZE_URL =
  'https://sessionize.com/api/speaker/sessions/5fef22ea-3470-4620-bfff-fb9b3338b5f1/0x1xffffffx';
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const TARGET = join(DIR_NAME, '../../src/pages/Speaker/talks.html');
const DOCUMENT_WRITE = /^\s*document\.write\('((?:[^'\\]|\\.)*)'\);?\s*$/s;
// The list is links and text; anything that loads or runs something is
// refused rather than published
const FORBIDDEN = new RegExp(
  [
    '<(script|iframe|img|link|style|object|embed|video|audio|source|form)\\b',
    '\\son\\w+\\s*=',
    '\\sstyle\\s*=',
    'javascript:'
  ].join('|'),
  'i'
);
const response = await fetch(SESSIONIZE_URL);

if (!response.ok) {
  throw new Error(
    `Sessionize answered ${response.status} ${response.statusText}`
  );
}

const [, literal] = (await response.text()).match(DOCUMENT_WRITE) ?? [];

if (literal === undefined) {
  throw new Error(
    "Sessionize's answer isn't a single document.write('...') call"
  );
}

// A single-quoted string with JSON-style escapes; `\'` is the only escape
// JSON doesn't have
const html = JSON.parse(`"${literal.replaceAll("\\'", "'")}"`);

if (!html.includes('class="sz-root"')) {
  throw new Error('Sessionize returned no talk list (no .sz-root element)');
}

const forbidden = html.match(FORBIDDEN);

if (forbidden) {
  throw new Error(
    `The talk list contains \`${forbidden[0]}\`, which isn't allowed`
  );
}

fs.writeFileSync(
  TARGET,
  `<!-- Generated from Sessionize by npm run update:talks; don't edit by hand -->\n${html.trim()}\n`,
  'utf-8'
);

console.log(`talks: saved ${html.length} characters to ${TARGET}`);
