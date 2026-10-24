// A static file server that behaves like GitHub Pages for the built site:
// `/about` serves `about.html`, a directory serves its `index.html`, and an
// unknown path gets `404.html` with status 404.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const TYPES = Object.freeze({
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json'
});
const isFile = (file) => existsSync(file) && statSync(file).isFile();

/**
 * Serve a directory on 127.0.0.1.
 * @param {string} directory - The directory to serve.
 * @param {number} [port] - The port; a free one if left out.
 * @returns {Promise<import('node:http').Server>} The listening server.
 */
export const serve = (directory, port = 0) =>
  new Promise((done) => {
    const root = resolve(directory);
    const server = createServer((req, res) => {
      const pathname = decodeURIComponent(
        new URL(req.url, 'http://x').pathname
      );
      const base = normalize(join(root, pathname));

      if (!base.startsWith(root)) {
        res.writeHead(403).end();

        return;
      }

      if (
        !pathname.endsWith('/') &&
        !isFile(base) &&
        isFile(join(base, 'index.html'))
      ) {
        res.writeHead(301, { location: `${pathname}/` }).end();

        return;
      }

      const file = pathname.endsWith('/')
        ? [join(base, 'index.html')].find(isFile)
        : [base, `${base}.html`].find(isFile);
      const notFound = join(root, '404.html');
      const served = file ?? notFound;

      res.writeHead(file ? 200 : 404, {
        'content-type': TYPES[extname(served)] ?? 'application/octet-stream'
      });
      createReadStream(served).pipe(res);
    });

    server.listen(port, '127.0.0.1', () => done(server));
  });
