import { getDocument } from './lib/get-document.js';
import { getHTML } from './lib/get-html.js';

const document = getDocument(req);

if (!document) {
  //
}

const html = await getHTML(document, req);
