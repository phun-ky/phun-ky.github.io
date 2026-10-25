# Roadmap

What phun-ky.net intends to do, and not do, from October 2026 to October 2027.
It's a plan, not a promise: priorities can change, and changes to this file are
made in pull requests like any other. Individual pieces of work are tracked as
[GitHub issues](https://github.com/phun-ky/phun-ky.github.io/issues), grouped in
[milestones](https://github.com/phun-ky/phun-ky.github.io/milestones).

## Done in October 2026

The site's build and repository were overhauled:

- **Fixes:** broken links and images in old posts, the old addresses redirected,
  and employer fonts the site was serving by mistake removed.
- **Hardening:** deploys only after the checks pass, pinned and reviewed
  dependencies, branch rules with DCO sign-off, CodeQL and secret scanning, and
  a [security policy](SECURITY.md).
- **Quality checks** in CI on every pull request: a Content Security Policy on
  every page and nothing loaded from other hosts, accessibility (WCAG 2.2 AA in
  both themes), layout at phone, tablet and desktop widths with screenshots,
  performance budgets, links and metadata, and checks on the live site after
  each deploy.
- **Category and tag index pages**, and a sitemap.

## Planned

- **A new projects page**
  ([#191](https://github.com/phun-ky/phun-ky.github.io/issues/191)): a clearer
  design that shows what the projects are, like a technical portfolio.
- **OpenSSF Best Practices**
  ([#147](https://github.com/phun-ky/phun-ky.github.io/issues/147)): the passing
  badge, with the answers kept in the repository, beside the
  [Scorecard](https://scorecard.dev/viewer/?uri=github.com/phun-ky/phun-ky.github.io).
- **Keeping it fast and accessible:** every change stays within the
  [performance budgets](scripts/checks/performance-budgets.json) and passes the
  accessibility checks, as the [contributing guide](CONTRIBUTING.md#checks)
  describes.
- **New posts and talks,** as they're written and given.

## Considered, not scheduled

Ideas that fit the site but have no date. Each would start with a discussion in
an issue.

- **Search** across the posts, built and served by the site itself.
- **A feed** (RSS or Atom) for new posts.

## Not planned

- **Collecting data.** The site sets no cookies, runs no analytics and sends
  nothing about its visitors anywhere. The only thing it stores is the chosen
  theme, in the browser's local storage.
- **Comments.** Responses to a post are welcome by other means, but the site
  won't host them.
- **Loading anything from other hosts,** such as web fonts, scripts, embeds or
  analytics. Everything the site needs is served by the site itself.
- **Moving off GitHub Pages.** The site is static and needs no server.
