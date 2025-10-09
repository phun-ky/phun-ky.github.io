import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const globalStylesheet = readFileSync(
  path.resolve(__dirname, './global.css'),
  'utf8'
);
const html = String.raw;

export const GlobalCSS = () => {
  return html`<style type="text/css">
      ${globalStylesheet}
    </style>
    <link
      rel="preload"
      href="/css/ph.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="/css/ph.css" /></noscript>
    <link rel="stylesheet" media="print" href="/css/print.css" />
    <link
      rel="preload"
      href="/css/carbonbadge.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="/css/carbonbadge.css" /></noscript>`;
};
