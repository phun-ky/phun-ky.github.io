# phun-ky.net

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/phun-ky/phun-ky.github.io/badge)](https://scorecard.dev/viewer/?uri=github.com/phun-ky/phun-ky.github.io)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/15904/badge)](https://www.bestpractices.dev/projects/15904)
[![Check and deploy](https://github.com/phun-ky/phun-ky.github.io/actions/workflows/check.yml/badge.svg)](https://github.com/phun-ky/phun-ky.github.io/actions/workflows/check.yml)

The source of [phun-ky.net](https://phun-ky.net), the personal site and blog of
Alexander Vassbotn Røyne-Helgesen: posts going back to 2005, projects and talks.

It's a static site built by a small set of Node scripts: posts are Markdown
(with [Markdoc](https://markdoc.dev) tags) in `src/assets/posts`, pages are HTML
templates in `src/pages`, and every merge to `main` is checked and deployed to
GitHub Pages.

- An RSS feed of the 20 newest posts, with their full text, at
  [`/feed.xml`](https://phun-ky.net/feed.xml). Archive posts are left out.
- No analytics, no cookies, and nothing loaded from other hosts.
- A strict Content Security Policy on every page.
- Checked on every pull request for accessibility (WCAG 2.2 AA, both themes),
  layout at phone, tablet and desktop widths, performance budgets, links and
  metadata.

## Development

Requirements: Node.js `^22.13.0` or `>=24.0.0` (CI uses Node 24) and Google
Chrome, which the browser checks drive.

```sh
npm ci            # installs, and enables the sign-off git hook
npm run build     # builds the site into dist/
npx serve dist    # serves the build to look at
```

How to write a post, every check and script, and the coding style are in the
[contributing guide](CONTRIBUTING.md#contributing-code).

## Deploying

Every merge to `main` is checked and deployed to GitHub Pages. There are no
releases or versions.

## Contributing and security

- [Contributing guide](CONTRIBUTING.md), [Code of Conduct](CODE_OF_CONDUCT.md),
  [governance](GOVERNANCE.md) and [roadmap](ROADMAP.md).
- Report vulnerabilities privately, as the [security policy](SECURITY.md)
  describes.

## Licence

The code that builds the site is [MIT](LICENSE). The posts and the assets
created by Alexander Vassbotn Røyne-Helgesen are
[CC BY-NC-SA 4.0](LICENSE-CONTENT); images by others keep their own licence,
credited where they are used.
