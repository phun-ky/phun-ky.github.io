import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

import Markdoc from '@markdoc/markdoc';

import { getMarkdocConfig } from './get-markdoc-config.js';
import { addClassToNode } from './add-class-to-node.js';
import { getOpenGraphTags } from './get-open-graph-tags.js';

function slugify(str) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

export const getHTML = (document) => {
  let { ast } = document;

  ast = addClassToNode(ast);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const TEMPLATE_PATH = resolve(
    __dirname,
    '../../../src/assets/templates/article.html'
  );
  const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const { frontmatter } = document;
  const config = getMarkdocConfig(document);
  const content = Markdoc.transform(ast, config);

  if (content) {
    // const tableOfContents = TableOfContents(headings, { ts: true });
    const rendered = Markdoc.renderers.html(content) || '';
    const { title } = frontmatter;
    const { category, tags, description, image, route } = frontmatter;
    const matches = route.match(/\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)/);
    const [string, year, month, day, slug] = matches;

    let html = '';
    let postNotice = '';

    if (category === 'Archive') {
      postNotice = `<section class="ph section">
        <div class="ph container"><div class="ph message warning">
        <span class="ph title"><svg class="ph icon warning" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>Note</span>
        <p class="ph description">
        Please note that this is an archived post, so links, code and the communicated message might be outdated. YMMV
        </p>
        </div>
        </div>
      </section>`;
    }

    html = TEMPLATE.replace(/{{ CONTENT }}/, rendered);
    // html = html.replace(/{{ TOC }}/, tableOfContents);

    html = html.replace(
      /{{ OPEN_GRAPH }}/,
      getOpenGraphTags({
        type: 'article',
        title,
        url: `https://phun-ky.net/${year}/${month}/${day}/${slug}.html`,
        image,
        description
      })
    );
    html = html.replace(/{{ PAGE_TITLE }}/, title);
    html = html.replace(/{{ TITLE }}/, title);
    html = html.replace(/{{ POST_NOTICE }}/, postNotice);
    html = html.replace(/{{ TAGS }}/, tags.map((tag) => `${tag}`).join(', '));
    html = html.replace(/{{ CATEGORY }}/, category);
    html = html.replace(/{{ CATEGORY_NAME }}/, category);
    html = html.replace(
      /{{ CATEGORY_URL }}/,
      `/categories/${slugify(category)}.html`
    );
    // html = html.replace(/{{ BREADCRUMBS }}/, await Breadcrumbs(req.path));
    // html = html.replace(/{{ APPLICATION_NAME }}/, title);

    return html;
  } else {
    return '';
  }
};
