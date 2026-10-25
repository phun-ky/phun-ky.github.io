# phun-ky.net

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/phun-ky/phun-ky.github.io/badge)](https://scorecard.dev/viewer/?uri=github.com/phun-ky/phun-ky.github.io)
[![Check and deploy](https://github.com/phun-ky/phun-ky.github.io/actions/workflows/check.yml/badge.svg)](https://github.com/phun-ky/phun-ky.github.io/actions/workflows/check.yml)

The source of [phun-ky.net](https://phun-ky.net), the personal site and blog of
Alexander Vassbotn Røyne-Helgesen: posts going back to 2005, projects and talks.

It's a static site built by a small set of Node scripts: posts are Markdown
(with [Markdoc](https://markdoc.dev) tags) in `src/assets/posts`, pages are HTML
templates in `src/pages`, and every merge to `main` is checked and deployed to
GitHub Pages.

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
```

To look at the build, serve `dist/` with any static file server, for example
`npx serve dist`.

### Writing a post

A post is a Markdown file in `src/assets/posts`, named `YYYY-MM-DD-slug.md`,
starting with front matter:

```yaml
---
route: /2025/01/27/fix-your-god-damned-typography
title: 'Fix your god damned typography!'
description: 'One or two sentences, shown under the title and in previews.'
category: 'Talks'
tags: [typography, frontend]
image: /img/blog/an-image.webp
---
```

The `route` gives the post its date and address, and every post has a `title`, a
`category` and `tags`. Without a `description`, the first paragraph is used in
search results and link previews; without an `image`, previews use the site's
default. Code goes in fenced blocks with a language (` ```js `);
`npm run check:posts` fails on code indented by four spaces, which the renderer
shows as a paragraph.

### Scripts

| Script                         | What it does                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `npm run build`                | Builds the site into `dist/` (`prebuild` cleans it and copies the assets and Prism)                               |
| `npm run lint`                 | ESLint on the JavaScript and the Markdown                                                                         |
| `npm run format:check`         | Prettier on everything                                                                                            |
| `npm run check:posts`          | Fails on indented code blocks in posts                                                                            |
| `npm run check:fonts`          | Fails when the build ships a font nothing uses                                                                    |
| `npm run check:sources`        | Fails when the build ships Markdown sources                                                                       |
| `npm run check:links`          | Fails on a link or asset the site doesn't serve                                                                   |
| `npm run check:trailing-slash` | Checks the 404 page sends `/a/b/` on to `/a/b`                                                                    |
| `npm run check:metadata`       | Titles, descriptions, Open Graph, canonical URLs, `sitemap.xml`, `robots.txt`                                     |
| `npm run check:csp`            | One Content Security Policy per page, matching its inline code                                                    |
| `npm run check:browser`        | Loads every page in Chrome: nothing from other hosts, no CSP violation, no sideways scrolling, axe in both themes |
| `npm run check:performance`    | Performance budgets on a throttled phone ([budgets](scripts/checks/performance-budgets.json))                     |
| `npm run screenshots`          | Screenshots of every template at three widths in both themes, into `screenshots/`                                 |
| `npm run check:live`           | Checks the deployed site serves this build (run by the deploy)                                                    |
| `npm run update:talks`         | Refreshes the speaker page's talk list from Sessionize                                                            |
| `npm run commit`               | Writes a conventional commit with git-cz                                                                          |

The `check:*` scripts that look at the site run after `npm run build`. CI runs
all of them on every pull request; see the
[contributing guide](CONTRIBUTING.md).

## Deploying

Every merge to `main` is checked and then deployed to GitHub Pages by the
`deploy` job in [`check.yml`](.github/workflows/check.yml); `check:live` then
checks the live pages match the build. There are no releases or versions.

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
