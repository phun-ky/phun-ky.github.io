import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagesStylesheet = readFileSync(
  path.resolve(__dirname, './packages.css'),
  'utf8'
);
const html = String.raw;

export const PackagesCSS = () => {
  return html`<style type="text/css">
    ${packagesStylesheet}
  </style>`;
};
