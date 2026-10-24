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

What you can't rely on yet:

- **Other hosts see your visit.** Every page loads the
  [Clicky](https://clicky.com) analytics script from `static.getclicky.com`,
  which records page views, plus badge images from `thegreenwebfoundation.org`
  and `creativecommons.org`. Every post and the frameport page load Prism from
  `unpkg.com` without subresource integrity, the speaker page loads a script
  from `sessionize.com`, and some posts embed videos and images from other sites
  ([#140](https://github.com/phun-ky/phun-ky.github.io/issues/140)).
- **The Content Security Policy is partial.** A `<meta>` policy is set on the
  front page, the projects and speaker pages and the 404 page, but not on posts,
  category, tag and frameport pages. Where it is set, it allows inline scripts
  and styles and images, fonts and styles from any HTTPS host
  ([#141](https://github.com/phun-ky/phun-ky.github.io/issues/141)).
- **Some security headers can't be set.** GitHub Pages can't send response
  headers, so `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`
  and the CSP's `frame-ancestors` (protection against being framed) are missing.

## Dependencies

**Choosing them.** The site ships no npm packages to visitors: every package in
`package.json` is a development dependency used to lint and build the site. A
new dependency must be widely used, actively maintained and under an
OSI-approved licence compatible with MIT.

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

| Finding                    | Where                    | What happens                                                                                            |
| -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| Critical or high           | Development dependency   | Blocks merging when introduced; an existing one is fixed within 30 days                                 |
| Moderate or low            | Development dependency   | Fixed with the next update, within 90 days                                                              |
| Any                        | Script from another host | Handled with the external hosts above ([#140](https://github.com/phun-ky/phun-ky.github.io/issues/140)) |
| Licence outside the policy | New dependency           | Not merged                                                                                              |

**Accepted exceptions.** These are also listed in the dependency review
configuration,
[`dependency-review-config.yml`](.github/dependency-review-config.yml):

| Advisory                                                                       | Package            | Why it's accepted                                                                                                                                                                                                                             | Removed when                                                                                                        |
| ------------------------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) (low) | `katex` 0.16 (dev) | Comes in through eslint-config-phun-ky → `@eslint/markdown` → `micromark-extension-math`, which allows only `katex` ^0.16.0 (fixed in 0.18.2). KaTeX runs only when the Markdown linter parses math, which this configuration doesn't enable. | `micromark-extension-math` allows a fixed `katex` ([#135](https://github.com/phun-ky/phun-ky.github.io/issues/135)) |

## Code Scanning

CodeQL (GitHub default setup) analyses every pull request, every push to `main`
and runs weekly, for the JavaScript code and the GitHub Actions workflows. An
error or a high or critical alert blocks merging. OpenSSF Scorecard is not set
up yet ([#147](https://github.com/phun-ky/phun-ky.github.io/issues/147)).

## Secrets

The build and the deploy use no secrets. Deploying to GitHub Pages uses a
short-lived OIDC token that GitHub issues to the deploy job only. Secret
scanning is on; push protection, which blocks commits that contain a credential,
is not on yet ([#137](https://github.com/phun-ky/phun-ky.github.io/issues/137)).
The repository still holds one secret from earlier workflows, `GH_TOKEN`, which
nothing uses any more; it will be deleted
([#137](https://github.com/phun-ky/phun-ky.github.io/issues/137)).
