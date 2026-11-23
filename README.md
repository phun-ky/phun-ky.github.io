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

## Sponsor me

I'm an Open Source evangelist, creating stuff that does not exist yet to help
get rid of secondary activities and to enhance systems already in place, be it
documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to
maintain my projects, create new ones and contribute to the large community
we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

---

p.s. **Ukraine is still under brutal Russian invasion. A lot of Ukrainian people
are hurt, without shelter and need help**. You can help in various ways, for
instance, directly helping refugees, spreading awareness, putting pressure on
your local government or companies. You can also support Ukraine by donating
e.g. to [Red Cross](https://www.icrc.org/en/donate/ukraine),
[Ukraine humanitarian organisation](https://savelife.in.ua/en/donate-en/#donate-army-card-weekly)
or
[donate Ambulances for Ukraine](https://www.gofundme.com/f/help-to-save-the-lives-of-civilians-in-a-war-zone).
