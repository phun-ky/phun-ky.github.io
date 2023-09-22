import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

import Markdoc from '@markdoc/markdoc';

import { getMarkdocConfig } from './get-markdoc-config';

export const getHTML = async (document) => {
  let { ast } = document;

  ast = addClassToNode(ast);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const TEMPLATE_PATH = resolve(
    __dirname,
    '../../../../server/public/template.html'
  );
  const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const { frontmatter } = document;
  const config = getMarkdocConfig(document);
  const content = Markdoc.transform(ast, config);

  if (content) {
    const headings = collectHeadings(content);
    // const tableOfContents = TableOfContents(headings, { ts: true });
    const rendered = Markdoc.renderers.html(content) || '';
    const { title } = frontmatter;

    let html = '';

    html = TEMPLATE.replace(/{{ CONTENT }}/, rendered);
    // html = html.replace(/{{ TOC }}/, tableOfContents);
    html = html.replace(/{{ PAGE_TITLE }}/, title);
    html = html.replace(/{{ DOC_TITLE }}/, title);
    // html = html.replace(/{{ BREADCRUMBS }}/, await Breadcrumbs(req.path));
    html = html.replace(/{{ APPLICATION_NAME }}/, title);

    return html;
  } else {
    return '';
  }
};
