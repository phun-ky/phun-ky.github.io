# Security Policy

phun-ky.net is a static website: the code in this repository is built and
deployed to [phun-ky.net](https://phun-ky.net) on every merge to `main`. There
is no server, no account and no database.

## Supported Versions

Only the live site is supported. There are no releases or versions to upgrade: a
fix is live as soon as it is merged and the deploy has finished.

| Deployment                                    | Supported |
| --------------------------------------------- | --------- |
| [phun-ky.net](https://phun-ky.net), `main`    | ✅        |
| Older commits, forks and copies hosted by you | ❌        |

## Reporting a Vulnerability

Report vulnerabilities privately, either with GitHub's
[private vulnerability reporting](https://github.com/phun-ky/phun-ky.github.io/security/advisories/new)
or by email to <security@phun-ky.net>. Please don't open a public issue for a
security problem.

## How Reports Are Handled

1. **Acknowledgement:** you'll get a reply within 7 days confirming the report
   was received.
2. **Assessment:** the maintainer reproduces the issue on the live site and
   judges its severity, and may ask you for details.
3. **Fix:** a fix is developed against a draft GitHub security advisory, merged
   and deployed. The aim is a fix within 30 days for serious issues, and sooner
   when the problem can be exploited through a link.
4. **Disclosure:** the advisory is published once the fix is deployed and
   checked on the live site. There is normally no CVE, since there is nothing
   for anyone else to update. Please keep the issue private until then.
5. **Credit:** reporters are credited in the advisory, unless they ask to stay
   anonymous.

No advisories have been published so far.

## Security Expectations

What you can rely on:

- **No accounts and nothing stored on a server.** The site has no backend and no
  forms that send data anywhere.
- **One setting stays in your browser.** The light or dark theme choice is kept
  in `localStorage` under `prefers-color-scheme`. Nothing else is stored by the
  site itself.
- **Changes are reviewed by CI before they reach the site.** `main` only accepts
  pull requests, merged with a merge commit, after the `check` job (lint, format
  check, build, and checks of fonts, links and trailing-slash URLs), dependency
  review and the DCO check have passed, and with no CodeQL error or high or
  critical alert. Force pushes and deleting `main` are blocked.
- **Deploys are traceable.** The site is built and deployed only by the `deploy`
  job in [`check.yml`](.github/workflows/check.yml), from `main`, after the
  checks pass. After each deploy, [`check:live`](scripts/checks/live.mjs) checks
  that the live pages match the build byte for byte.
- **No analytics, and nothing from other hosts.** The site has no analytics or
  tracking, and every script, style, image and font is served from phun-ky.net.
  Videos, tweets and pens from other sites are links, so those sites are only
  contacted if you follow one. [`check:origins`](scripts/checks/origins.mjs)
  loads every page in CI and fails on any request to another host.

- **A strict Content Security Policy on every page.** Each page carries a
  `<meta>` policy, written at build time by
  [`scripts/csp/apply.mjs`](scripts/csp/apply.mjs): scripts, styles, images,
  fonts and the manifest only from phun-ky.net; inline scripts and `<style>`
  blocks only when their hash is listed, so no `unsafe-inline` for scripts; no
  plugins (`object-src 'none'`), no `<base>` from elsewhere and no form
  submissions. A `strict-origin-when-cross-origin` referrer policy goes with it.
  [`check:csp`](scripts/checks/csp.mjs) checks every page's policy against its
  inline code and loads every page in CI, failing on any violation.

What you can't rely on yet:

- **Inline style attributes are allowed.** A few posts and Prism's inline-color
  plugin set colours with `style` attributes, so the policy allows them
  (`style-src-attr 'unsafe-inline'`). They can change how a page looks, not run
  code.
- **Some security headers can't be set.** GitHub Pages can't send response
  headers, and a `<meta>` policy can't do everything a header can, so
  `Permissions-Policy`, `X-Content-Type-Options`, the CSP's `frame-ancestors`
  (protection against being framed) and CSP violation reports are missing.

## Dependencies

**Choosing them.** The only npm package served to visitors is Prism (`prismjs`),
copied into the site at build time for code highlighting. Every other package in
`package.json` is used only to lint, build and check the site. A new dependency
must be widely used, actively maintained and under an OSI-approved licence
compatible with MIT.

**Obtaining them.** Packages come only from the npm registry, with exact
versions locked in `package-lock.json` and installed with `npm ci` in CI. GitHub
Actions are pinned to commit SHAs.

**Tracking them.** Dependabot proposes version updates weekly (minor and patch
together, each major on its own) and security updates as soon as an advisory is
published. Every pull request runs
[dependency review](.github/workflows/dependency-review.yml), which fails on a
new dependency with a known vulnerability of any severity.

**Fixing known vulnerabilities.** Findings are checked against the GitHub
Advisory Database:

| Finding                    | Where                      | What happens                                                            |
| -------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| Critical or high           | Prism (served to visitors) | Blocks merging (dependency review); fixed and deployed within 7 days    |
| Critical or high           | Development dependency     | Blocks merging when introduced; an existing one is fixed within 30 days |
| Moderate or low            | Any dependency             | Fixed with the next update, within 90 days                              |
| Licence outside the policy | New dependency             | Not merged                                                              |

**Accepted exceptions.** These are also listed in the dependency review
configuration,
[`dependency-review-config.yml`](.github/dependency-review-config.yml):

| Advisory                                                                       | Package            | Why it's accepted                                                                                                                                                                                                                             | Removed when                                                                                                        |
| ------------------------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) (low) | `katex` 0.16 (dev) | Comes in through eslint-config-phun-ky → `@eslint/markdown` → `micromark-extension-math`, which allows only `katex` ^0.16.0 (fixed in 0.18.2). KaTeX runs only when the Markdown linter parses math, which this configuration doesn't enable. | `micromark-extension-math` allows a fixed `katex` ([#135](https://github.com/phun-ky/phun-ky.github.io/issues/135)) |

## Code Scanning

CodeQL (GitHub default setup) analyses pull requests, every push to `main` and
runs weekly, for the JavaScript code and the GitHub Actions workflows. Default
setup doesn't always analyse Dependabot's pull requests, which change only
`package.json` and `package-lock.json`; their changes are checked by dependency
review, and the push to `main` is analysed. An error or a high or critical alert
blocks merging. OpenSSF Scorecard is not set up yet
([#147](https://github.com/phun-ky/phun-ky.github.io/issues/147)).

## Secrets

The build and the deploy use no secrets. Deploying to GitHub Pages uses a
short-lived OIDC token that GitHub issues to the deploy job only. Secret
scanning is on; push protection, which blocks commits that contain a credential,
is not on yet ([#137](https://github.com/phun-ky/phun-ky.github.io/issues/137)).
The repository still holds one secret from earlier workflows, `GH_TOKEN`, which
nothing uses any more; it will be deleted
([#137](https://github.com/phun-ky/phun-ky.github.io/issues/137)).
