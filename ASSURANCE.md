# Assurance Case

Why the [security expectations](SECURITY.md#security-expectations) of
phun-ky.net hold, what they rest on, and where they don't hold yet. It is kept
short because the site is small: static pages generated from posts in this
repository, Prism for code highlighting, and a pipeline that builds and deploys
them to GitHub Pages.

## What is being protected

- **Visitors and their browsers:** the site must show posts and pages and do
  nothing else: run no code but its own, load nothing from other hosts, and send
  nothing anywhere. The one thing it stores is the visitor's theme choice, in
  their own browser.
- **The deployed site:** what GitHub Pages serves must be what the deploy job
  built from `main` after the checks passed.
- **The repository and its pipeline:** the source, the workflows, and the token
  that deploys the site.

## Threat model

| Threat                               | Where                                                  | How it is countered                                                                                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Script or markup injected into pages | Posts, the speaker page's talk list, the theme setting | Posts are written in this repository and reviewed in pull requests. The talk list from Sessionize is saved as a snapshot and refused if it has anything that loads or runs code. The stored theme is only compared with `light`. No `eval` or `new Function`             |
| Script running that shouldn't        | Every page                                             | A Content Security Policy that starts from `default-src 'none'`, allows scripts only from the site and inline ones only by hash, and no plugins or form submissions; `check:csp` and `check:browser` check every page in CI                                              |
| Tracking or loading from other hosts | Scripts, styles, images, embeds                        | No analytics. Images from other sites are served from phun-ky.net, and videos, tweets and pens are links. `check:browser` loads every page in CI and fails on any request to another host                                                                                |
| A tampered or substituted deploy     | GitHub Pages                                           | Only the deploy job deploys, only from `main`, after the checks pass, with no dependency cache. The build is repeatable, and after each deploy `check:live` checks the live pages match the build byte for byte. HTTPS is enforced                                       |
| A malicious or vulnerable dependency | Prism, development dependencies, Actions               | Prism is the only package served to visitors. Dependency review blocks pull requests that add a dependency with a known vulnerability of any severity; Dependabot proposes updates weekly, two weeks after a release; Actions are pinned to commit SHAs                  |
| A malicious change to the source     | Pull requests                                          | Pull requests only, with required checks (the `check` job, dependency review, CodeQL, the DCO) on `main`; no force pushes or deletion of `main`                                                                                                                          |
| Abuse of CI credentials              | Workflows                                              | Read-only default permissions in every workflow, write only per job; pull requests from forks get no secrets; the labeler runs on `pull_request_target` but never checks out or runs pull request code; the project has no secrets; secret scanning with push protection |

## Trust boundaries

1. **Visitor to the page:** the theme switch is the only input, kept in the
   visitor's `localStorage` and only ever compared with `light`.
2. **Repository to the build:** posts, templates and images come from this
   repository, through reviewed pull requests. The talk list is fetched from
   Sessionize only when the maintainer runs `npm run update:talks`, checked, and
   committed as a snapshot.
3. **Repository to GitHub Pages:** only the deploy job can deploy, with a
   short-lived token for that job only, after the checks pass on `main`.
4. **GitHub Pages to the visitor:** the site is served over HTTPS, and every
   page carries its Content Security Policy and referrer policy in `<meta>`
   tags.

## Secure design principles

- **Economy of mechanism:** static pages, no server, no accounts and no forms.
- **Fail-safe defaults:** the Content Security Policy starts from
  `default-src 'none'` and allows only what each page needs; a talk list with
  anything that loads or runs code is refused, not published.
- **Least privilege:** CI tokens are read-only by default; only the deploy job
  can write to GitHub Pages.
- **Complete mediation:** every page gets its policy from the same build step,
  and every page is checked against it in a browser.
- **Open design:** everything is public, including the pipeline and this
  document.
- **No dynamic code:** no `eval`, `new Function` or loading of code at run time.
- **Minimal dependencies:** Prism is the only package served to visitors.

## Common weaknesses countered

| Weakness                                           | Status                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| CWE-79 cross-site scripting                        | Inline scripts run only by hash, and nothing from outside the repository reaches a page unchecked       |
| CWE-94 code injection                              | No dynamic code anywhere in the site                                                                    |
| CWE-829 inclusion from an untrusted control sphere | Nothing is loaded from other hosts; dependencies come only from npm, locked; Actions are pinned to SHAs |
| CWE-494 download of code without integrity check   | npm verifies the integrity hashes in `package-lock.json`; the site is served only over HTTPS            |
| CWE-359 exposure of private information            | No analytics or cookies, nothing sent anywhere, and no requests to other hosts                          |

## Known gaps

- **Response headers:** GitHub Pages can't send them, so the page can be framed
  by other sites, and some headers are missing; see the
  [security expectations](SECURITY.md#security-expectations).
- **Inline style attributes are allowed** for a few posts and Prism; they can
  change how a page looks, not run code.
- **One maintainer:** pull requests by the maintainer get no second review, and
  access to the repository and the domain rests on one person; see
  [governance](GOVERNANCE.md#continuity).
- **Deploys are not signed:** the site is served over HTTPS from GitHub Pages
  and can be rebuilt byte for byte from its commit, but there is no signed
  provenance for a deploy.
