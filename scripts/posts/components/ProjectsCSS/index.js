import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsStylesheet = readFileSync(
  path.resolve(__dirname, './projects.css'),
  'utf8'
);
const html = String.raw;

export const ProjectsCSS = () => {
  return html`<style type="text/css">
    ${projectsStylesheet}
  </style>`;
};
