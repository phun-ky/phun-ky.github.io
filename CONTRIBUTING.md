# Contributing to phun-ky.net

First off, thanks for taking the time to contribute! ❤️

This is a personal site and blog, so most of what it says is the author's own.
Fixes are always welcome: a typo, a broken link, a page that doesn't work in
your browser or with your screen reader, or a bug in the scripts that build it.
See the [Table of Contents](#table-of-contents) for the ways to help, and read
the relevant section before making your contribution.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Contributing Code](#contributing-code)
    - [Coding Style](#coding-style)
    - [Checks](#checks)
    - [Developer Certificate of Origin](#developer-certificate-of-origin)
    - [Commits and Pull Requests](#commits-and-pull-requests)
- [Attribution](#attribution)

## Code of Conduct

This project and everyone participating in it is governed by the
[Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to
uphold this code. Please report unacceptable behaviour to
<code-of-conduct@phun-ky.net>.

## I Have a Question

Before you ask a question, search the existing
[issues](https://github.com/phun-ky/phun-ky.github.io/issues). If you find a
suitable issue and still need clarification, write your question in that issue.
Otherwise, open an
[issue](https://github.com/phun-ky/phun-ky.github.io/issues/new) with the link
to the page it's about and as much context as you can.

## I Want To Contribute

> ### Legal Notice
>
> When contributing to this project, you must agree that you have authored 100%
> of the content, that you have the necessary rights to the content and that the
> content you contribute may be provided under the project licence: MIT for
> code, CC BY-NC-SA 4.0 for posts and other content (see the
> [README](README.md#licence)). You confirm this on every commit by signing it
> off under the
> [Developer Certificate of Origin](#developer-certificate-of-origin).

### Reporting Bugs

#### Before Submitting a Bug Report

- Reload [phun-ky.net](https://phun-ky.net) to make sure you have the latest
  version; every merge is deployed right away.
- Search the
  [bug tracker](https://github.com/phun-ky/phun-ky.github.io/issues?q=label%3A%22problems%3A+%F0%9F%90%9B+bug%22)
  to see if the bug has already been reported.
- Collect information about the bug:
  - the link to the page
  - what you did, what you expected, and what happened
  - your browser, its version and the operating system, and whether it happens
    in another browser too
  - any errors in the browser's console

#### How Do I Submit a Good Bug Report?

> Never report security issues, vulnerabilities or bugs that include sensitive
> information in the issue tracker or elsewhere in public. Report them privately
> as described in the [security policy](SECURITY.md).

- Open an [issue](https://github.com/phun-ky/phun-ky.github.io/issues/new) with
  the bug report template.
- Explain the behaviour you expected and the actual behaviour, and the steps to
  reproduce it.
- Add the information you collected above. A screenshot helps for anything
  visual.

Once it's filed, the maintainer labels it and tries to reproduce it. Without a
way to reproduce it, the issue is marked `pending: need repro` until there is
one. A reproduced bug is marked `🐛 needs fix`.

### Suggesting Enhancements

Enhancements are tracked as
[GitHub issues](https://github.com/phun-ky/phun-ky.github.io/issues). Before
suggesting one, search for an existing suggestion and check that it fits the
[roadmap](ROADMAP.md), including what is not planned. A good suggestion has a
clear title, describes what the site does now and what you'd like instead, and
explains why it would help the people reading it.

Suggestions for what to write about are welcome too, but the posts are the
author's own: they aren't edited by others, except to fix a mistake.

### Contributing Code

Set up the project as described in the [README](README.md#development): Node.js
and Google Chrome, then `npm ci` and `npm run build`. Larger changes are best
discussed in an issue first, so the work fits the [roadmap](ROADMAP.md).

#### Coding Style

Code follows the project's [ESLint](https://eslint.org/) configuration
(`eslint-config-phun-ky`), which also lints the Markdown, and
[Prettier](https://prettier.io/) formatting. A contribution must pass
`npm run lint` and `npm run format:check` with no errors.

Some rules specific to this site:

- **Nothing from other hosts.** Scripts, styles, fonts, images and embeds are
  served by the site itself, and the Content Security Policy blocks the rest.
- **Inline scripts and styles are fine,** because the build hashes each one into
  the page's Content Security Policy. Event handler attributes such as `onclick`
  are not, because a hash can't allow them.
- **Images are WebP** where possible, with a `width` and `height`, and
  `loading="lazy"` below the first screen.
- **Everything works with the keyboard and a screen reader,** in both themes and
  at every width from 320 px.

#### Checks

There is no unit test suite: the site is checked as it's built. CI runs every
check in the [README](README.md#scripts) on every pull request, and all of them
must pass. Run the ones your change touches before you push:

- **A change to a post or a template:** `npm run build`, then
  `npm run check:links`, `npm run check:metadata` and `npm run check:browser`.
- **A change that adds bytes** must stay within the
  [performance budgets](scripts/checks/performance-budgets.json)
  (`npm run check:performance`). Raising a budget needs a reason in the pull
  request.
- **A visual change:** CI keeps screenshots of every template at three widths in
  both themes as an artifact of the run; look at them before asking for a
  review.
- **A fix to a build script** should come with a check that fails without it,
  where one can be written.

#### Developer Certificate of Origin

Every commit must be signed off under the
[Developer Certificate of Origin](https://developercertificate.org/) (DCO): a
statement that you wrote the change, or otherwise have the right to submit it
under the project's licence. You agree to it by adding a `Signed-off-by` line
with your name and email to the commit message:

```text
Signed-off-by: Your Name <you@example.com>
```

- **Per commit:** `git commit -s` adds the line for you.
- **Always:** `npm ci` sets `core.hooksPath` to `.githooks`, and the hook in
  `.githooks/prepare-commit-msg` adds the line to every commit.
- **Forgot?** Sign off every commit on your branch and push again:
  `git rebase --signoff main` then `git push --force-with-lease`.

The DCO check on every pull request fails if a commit isn't signed off.

#### Commits and Pull Requests

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/),
  with the project's emoji: `feat: 🎸` for something new, `fix: 🐛` for a bug,
  `docs: ✏️`, `refactor: 💡`, `test: 💍`, `chore: 🤖` and `ci: 🎡`.
  `npm run commit` writes one for you.
- The site has no releases: every merge to `main` is deployed. A pull request
  must leave the site working and looking right on its own.
- Open a pull request against `main`, with what it changes, how to test it and
  the issue it closes. The workflow builds the site and runs every check; all of
  it must pass before it can be merged.

## Attribution

This guide is based on
[contributing-gen](https://github.com/bttger/contributing-gen).
