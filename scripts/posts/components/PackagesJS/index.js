import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagesJavaScriptFile = readFileSync(
  path.resolve(__dirname, './packages.js'),
  'utf8'
);
const html = String.raw;

export const PackagesJS = () => {
  return html`<script>
      ${packagesJavaScriptFile};
    </script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>`;
};
