# Governance

phun-ky.net is a personal site and blog with a single maintainer, who is also
its author. This document describes how decisions are made, who does what, and
what happens if the maintainer can't continue.

## Model

The project follows a **maintainer-led** model: the maintainer makes the final
decision on what goes into the site, guided by the [roadmap](ROADMAP.md) and the
discussion with contributors. What the posts say is the author's alone.

Decisions are made in public:

- **Proposals** are made as
  [GitHub issues](https://github.com/phun-ky/phun-ky.github.io/issues). Larger
  changes, such as a new design, a new kind of page or a change to what the site
  loads or stores, are discussed in an issue before work starts. When a decision
  is made, it is written in the issue under "Decided", with the date.
- **Changes** are made as pull requests, reviewed by the maintainer, and merged
  only when the required checks pass. Every merge to `main` is deployed.
- **Disagreements** are resolved by discussion in the issue or pull request. If
  that doesn't settle it, the maintainer decides and explains why.
- **Conduct** is governed by the [Code of Conduct](CODE_OF_CONDUCT.md), which
  the maintainer enforces.

## Roles

| Role            | Who                                                                        | Responsibilities                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maintainer**  | Alexander Vassbotn Røyne-Helgesen ([@phun-ky](https://github.com/phun-ky)) | Writes the posts; sets the direction and roadmap; triages issues; reviews and merges pull requests; handles security reports; enforces the Code of Conduct; manages the repository and the domain |
| **Contributor** | Anyone who opens an issue or a pull request                                | Follows the [contributing guide](CONTRIBUTING.md) and the Code of Conduct; runs the checks a change touches                                                                                       |

### Becoming a maintainer

Contributors who have made sustained, high-quality contributions to the code may
be invited to become maintainers of it. A new maintainer gets write access to
the repository and is added to this document, and from then on the project needs
a review from a maintainer other than the author before merging. The posts stay
the author's.

Before anyone is given write access or any other escalated permission, the
maintainer reviews their contribution history and confirms that their GitHub
account uses two-factor authentication. They get the lowest role that lets them
do the work, and the change is recorded in the roles table above.

## Continuity

Today, one person holds everything needed to run the site: admin access to the
[GitHub repository](https://github.com/phun-ky/phun-ky.github.io) and the
`phun-ky.net` domain.

- **Deploys** run from GitHub Actions to GitHub Pages on every merge to `main`,
  with no personal tokens. Anyone with write access to the repository can
  deploy.
- **The code** is MIT-licensed and **the posts** are CC BY-NC-SA 4.0, so anyone
  can fork the code, and keep the posts available with credit, if the project
  stops.
- **A second person with access** doesn't exist. Until there is one, the site
  can't continue at `phun-ky.net` if the maintainer is unavailable; it would go
  on being served by GitHub Pages as it is until the domain lapses.
