// What the metadata step and its check agree on: the site's address, which
// built pages are real pages, and the canonical URL of each.
export const SITE = 'https://phun-ky.net';

export const isRedirectPage = (html) =>
  /<meta\s+http-equiv="refresh"/i.test(html);

export const isNotFoundPage = (file) => file === '404.html';

/**
 * The canonical URL of a built page, the way GitHub Pages serves it:
 * `a/index.html` is `/a/`, `a/b.html` is `/a/b`.
 * @param {string} file - The page's path inside dist.
 * @returns {string} The absolute URL.
 */
export const canonicalUrl = (file) =>
  `${SITE}/${file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')}`;
