---
route: /2024/02/09/better-frontend-developer-experience
title: 'Better frontend developer experience'
description:
  'Over my 24 years of programming, developing applications, snippets, servers,
  APIs etc, I have been through a lot of different coding setups, editors,
  environments and so on. To sum up parts of my experience, I am attempting to
  disclose to you how you can have the best frontend developer experience.'
category: 'Programming'
tags: [developer, experience, programming]
---

However, I am _not_ going to tell you how to set up your editor directly. Every
developer has a different opinion on which extension, theme, setting etc that is
best, my self included.

{% message type="note" title="Note" %}

This is not 100% objective, but formed from my experience, and what works for
me. I am not trying to persuade you to use or do something that works great for
_me_. YMMV

{% /message %}

- [Standardize](#standardize)
  - [Semantic versioning](#semantic-versioning)
  - [Commits](#commits)
    - [Commitizen](#commitizen)
  - [Linting](#linting)
  - [Functions](#functions)
    - [Naming](#naming)
    - [Return early](#return-early)
  - [Nested ternary operators](#nested-ternary-operators)
  - [JSX](#jsx)
  - [Imports](#imports)
    - [Aliasing](#aliasing)
    - [Sorting and grouping of imports](#sorting-and-grouping-of-imports)
    - [Nomenclature](#nomenclature)
  - [Folder structure](#folder-structure)
    - [Applications](#applications)
    - [`public`](#public)
    - [`scripts`](#scripts)
    - [`src/assets`](#srcassets)
    - [`src/components`](#srccomponents)
    - [`src/config`](#srcconfig)
    - [`src/contexts`](#srccontexts)
    - [`src/features`](#srcfeatures)
    - [`src/services`](#srcservices)
    - [`src/lib`](#srclib)
    - [`src/pages`](#srcpages)
    - [`src/styles`](#srcstyles)
    - [`src/stores`](#srcstores)
    - [`src/test`](#srctest)
    - [`src/types`](#srctypes)
    - [`src/utils`](#srcutils)
- [Automate](#automate)
  - [Changelog](#changelog)
  - [Releases](#releases)
  - [CI/CD](#cicd)
- [Extrapolate](#extrapolate)
  - [Documentation generation](#documentation-generation)
- [Minimize](#minimize)
  - [Reduce code](#reduce-code)
  - [Smaller repositories](#smaller-repositories)
  - [Reduce dependencies](#reduce-dependencies)
  - [Reduce builds](#reduce-builds)
- [Conclusion](#conclusion)

## Standardize

I love standards, especially standards that promotes effecient workflows, clean
code and helps both the individual programmers and cooperating teams when
developing applications. These are the standards I found to give me the best
frontend developer experience:

### Semantic versioning

As described on the [Semantic Versioning website](https://semver.org/), semantic
versioning (semver) consists of three numbers: MAJOR, MINOR, and PATCH. Each
number is incremented in different circumstances:

- the _MAJOR_ version when we make incompatible API changes (read: breaking
  changes),
- the _MINOR_ version when we add functionality in a backward-compatible manner,
  and
- the _PATCH_ version when we make backward-compatible bug fixes.

Using semver helps a great deal for developers, and non-developers to understand
what has changed, since the changed number in the version reflects what the
actual change consists of.

- Is it something that I need to deal with? Do I need to make changes in my own
  code for the change to work on my end?
- Is it a new feature that I could check out?
- Is it a bug fix, documentation update, or any non-important change?

### Commits

The perfect commit message should have certain qualities:

- It should be understandable even by seeing only the header of the message
- It should be to the point, and not too detailed.
- It should be unambiguous.

Use the imperative, present tense. It is easier to read and scan quickly:

```
Right: Add feature to alert admin for new user registration
Wrong: Added feature ... (past tense)
```

> The reason behind using present tense is that the commit message is answering
> the question "What will happen after the commit is applied?". If we think of a
> commit as an independent patch, it does not matter if it applied in the past.
> What matters is that this patch is always supposed to make that particular
> change when it is applied.

#### Commitizen

[Commitizen](https://github.com/commitizen/cz-cli) helps you write better commit
messages!

```shell-session
$ git log --pretty=format:'%h %s'.
3332279 style: 💄 Lint.
60f0ec8 fix: 🐛 Fix sticky header issues.
9f5fdcd feat: 🎸 Add read time.
55bf3ad feat: 🎸 Add copy code button and language string to code blocks.
813df4a refactor: 💡 Some adjustments.
79549ab refactor: 💡 Adjust code blocks.
6876cec fix: 🐛 Add label attribute to heading link.
8bf68c6 refactor: 💡 Comment out copy / language feat for prism.
9f97ebf feat: 🎸 Make header sticky in desktop mode.
95ceac0 style: 💄 Tune lint rules for markdown.
d7c3a13 feat: 🎸 Add `print.css`.
```

**Install it:**

```shell-session
sudo npm install -g commitizen git-cz
commitizen init git-cz
```

**Update `package.json`:**

```json
{
  …
  "scripts": {
    …
    "commit": "npx git-cz",
    …
  },
  …
}
```

After you have staged your files for commit, run `npm run commit` or
`yarn commit` in your project root folder. You will get an interactive guide
that helps you with your commits:

```shell-session
$ npm run commit

> phun-ky.github.io@1.0.0 commit
> git cz

? Select the type of change that you're committing: (Use arrow keys or type to search)
❯ 💍  test:       Adding missing tests
  🎸  feat:       A new feature
  🐛  fix:        A bug fix
  🤖  chore:      Build process or auxiliary tool changes
  ✏️  docs:       Documentation only changes
  💡  refactor:   A code change that neither fixes a bug or adds a feature
  💄  style:      Markup, white-space, formatting, missing semi-colons...
(Move up and down to reveal more choices)
```

When you have chosen the type of commit you are commiting, press enter, and you
can now enter a commit header:

```shell-session

? Write a short, imperative mood description of the change:
  [-------------------------------------------------------------] 54 chars left
   style: lint `src/styles/index.styl`
```

After you have pressed enter, you can now enter an optional commit body, that
has more space to descrive the change the commit adds:

```shell-session
? Provide a longer description of the change:
```

After that, you will get an option to indicate if the change is a breaking
change or not. If the change is NOT a breaking change, leave this field empty:

```shell-session
? List any breaking changes
  BREAKING CHANGE:
```

You now have an option to add an issue ID for tracking the commit to a relevant
task. This works for Jira (if you have the service connection) and github
issues.

{% message type="note" title="Note" %}

The guide suggests an issue ID format that works for github, i.e. #123, if you
want it to work with Jira, you need to ommit the hash:

`PRJ-123`

{% /message %}

```shell-session
? Issues this commit closes, e.g #123:
```

When pressing enter, the interactive tool will stop, and output the commit
output:

```shell-session
[main 8f82e81] style: 💄 lint
 1 file changed, 1 insertion(+)
```

When you now do a `git log`, you'll see the change:

```shell-session
$ git log
commit 8f82e8189e614332b6c80d2ab8291aa59325b130 (HEAD -> main)
Author: Alexander Vassbotn Røyne-Helgesen <alexander+github.com@phun-ky.net>
Date:   Fri Jan 5 15:11:19 2024 +0100

    style: 💄 lint `src/styles/index.styl`
```

If you entered a description and/or a issue ID, it could look like this:

```shell-session
$ git log
commit 8f82e8189e614332b6c80d2ab8291aa59325b130 (HEAD -> main)
Author: Alexander Vassbotn Røyne-Helgesen <alexander+github.com@phun-ky.net>
Date:   Fri Jan 5 15:11:19 2024 +0100

    style: 💄 lint `src/styles/index.styl`

    For funsies

    ✅ Closes: #123

```

### Linting

I think that linting, when the concept arrived, was for me one of the biggest
features for me as a developer. It helped a great deal for project code that was
worked on in a team, conforming to one set of format. It also made the code look
and feel _cleaner_.

My favourite setup for now, is to use `eslint` in combination with `prettier`

`prettier` + `eslint` = `prettier-eslint` ♥

```shell-session
# Installs required deps
$ npm i -D eslint eslint-config-prettier eslint-plugin-prettier prettier prettier-eslint
```

**Preferred plugins:**

```shell-session
# Installs preferred plugins
$ npm i -D eslint-config-airbnb eslint-config-prettier eslint-plugin-compat eslint-plugin-import eslint-plugin-jest eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
```

**For TypeScript projects, add these as well:**

```shell-session
# Installs required deps
$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**My standard `.eslintrc.json`:**

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "root": true,
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "classes": true
    }
  },
  "rules": {
    "comma-dangle": 1,
    "quotes": [1, "single"],
    "no-undef": 2,
    "prefer-const": "error",
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "return" },
      { "blankLine": "always", "prev": "*", "next": "export" },
      { "blankLine": "always", "prev": "export", "next": "export" },
      { "blankLine": "always", "prev": "export", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "if" },
      { "blankLine": "always", "prev": "if", "next": "*" },
      { "blankLine": "always", "prev": "const", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "const" },
      { "blankLine": "always", "prev": "let", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "let" },
      { "blankLine": "always", "prev": "var", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "var" },
      {
        "blankLine": "always",
        "prev": "const",
        "next": "let"
      },
      {
        "blankLine": "never",
        "prev": "const",
        "next": "const"
      },
      {
        "blankLine": "never",
        "prev": "let",
        "next": "let"
      },
      {
        "blankLine": "never",
        "prev": "var",
        "next": "var"
      },
      {
        "blankLine": "always",
        "prev": "const",
        "next": "let"
      },
      {
        "blankLine": "always",
        "prev": "const",
        "next": "var"
      },
      {
        "blankLine": "always",
        "prev": "let",
        "next": "var"
      },
      { "blankLine": "always", "prev": "*", "next": "cjs-import" },
      { "blankLine": "always", "prev": "cjs-import", "next": "*" },
      { "blankLine": "never", "prev": "cjs-import", "next": "cjs-import" }
    ],
    "global-strict": 0,
    "indent": [1, 2, { "SwitchCase": 1 }],
    "no-extra-semi": 1,
    "no-underscore-dangle": 0,
    "no-console": 1,
    "no-unused-vars": 1,
    "no-trailing-spaces": [1, { "skipBlankLines": true }],
    "no-unreachable": 1,
    "no-alert": 1,
    "semi": 1
  }
}
```

**My standard `.prettierrc`:**

```json
{
  "singleQuote": true,
  "jsxBracketSameLine": true,
  "tabWidth": 2,
  "printWidth": 80,
  "proseWrap": "always"
}
```

Why `80` as `printWidth` when most of the devs use widescreens?

> The reason why prettier uses 80 columns to format code is because this is the
> best heuristic we know. It's not perfect as you have seen but one interesting
> property is that it almost never looks terrible and most of the time it look
> reasonable.
>
> <footer class="ph">
>
> –
> [https://github.com/prettier/prettier/issues/4298#issuecomment-380680999](https://github.com/prettier/prettier/issues/4298#issuecomment-380680999)
>
> </footer>

And

> The longer the line, the bigger the diff and the harder it is to track what
> has been chanced
>
> <footer class="ph">
>
> –
> [https://github.com/prettier/prettier/issues/4298#issuecomment-380891266](https://github.com/prettier/prettier/issues/4298#issuecomment-380891266)
>
> </footer>

**My standard `.stylintrc`**

```json
{
  "blocks": false,
  "brackets": "never",
  "colons": "never",
  "colors": "always",
  "commaSpace": false,
  "commentSpace": false,
  "cssLiteral": "never",
  "depthLimit": false,
  "duplicates": false,
  "efficient": "always",
  "extendPref": false,
  "globalDupe": false,
  "indentPref": 2,
  "leadingZero": false,
  "maxErrors": false,
  "maxWarnings": false,
  "mixed": false,
  "namingConvention": false,
  "namingConventionStrict": false,
  "noImportant": false,
  "parenSpace": false,
  "placeholders": false,
  "prefixVarsWithDollar": "always",
  "quotePref": false,
  "semicolons": "never",
  "stackedProperties": "never",
  "trailingWhitespace": "never",
  "universal": false,
  "valid": true,
  "zeroUnits": "never",
  "zIndexNormalize": false
}
```

### Functions

We all have our preferences when it comes to functions, these are some of mine.

#### Naming

I prefer readability, so I would like to read the function name, and know
exactly what it does. When it comes to boolean functions or methods, I like to
read them as the state they want to represent.

```typescript
// Don't
export const versionIsExpired = (…): boolean => …;
// Do
export const isVersionExpired = (…): boolean => …;
```

```typescript
// Don't
export const checkForApples = (…): boolean => …;
// Do
export const hasApples = (…): boolean => …;
```

#### Return early

If you have conditional returns in a function or method, I love to pull out
early, and it makes it, for me, easier to follow the flow. Especially if you
calculations that is not required to do before escaping.

{% stance
  description="Do not escape at the end of a conditional"
  type="dont"
%}

```ts
export const myFunction = (var) => {

  if(var){
    return [1,2,3,4,5];
  } else {
    return [];
  }
}
```

{% /stance %}

{% stance
  description="Escape as early as possible"
  type="do"
%}

```ts
export const myFunction = (var) => {

  if(!var) return [];

  return [1,2,3,4,5];
}
```

{% /stance %}

### Nested ternary operators

Ternary operators are great, but use it with caution, because it can lead to
horrible readability.

{% stance
  description="Do not use nested ternary operators"
  type="dont"
%}

```ts
const a = b === null ? false : b === 2 ? false : true;
```

{% /stance %}

{% stance
  description="Consider using if statements instead"
  type="do"
%}

```ts
let a = false;

if (b === 2) {
  a = true;
}
```

{% /stance %}

### JSX

Please, do not use any logix in jsx! It promotes poor readability, and increases
the number of lines in the file.

{% stance
  description="Do not use logic in jsx"
  type="dont"
%}

```jsx
export const MyComponent = ({isCool}) => {

  return (
    {isCool ? <MyCoolComponent/> : <MyNotSoCoolComponent/>}
  )
}
```

{% /stance %}

{% stance
  description="Consider to create a new component that handles the logic, or return early instead"
  type="do"
%}

```jsx
export const MyComponent = ({ isCool }) => {
  if (isCool) return <MyCoolComponent />;

  return <MyNotSoCoolComponent />;
};
```

{% /stance %}

### Imports

#### Aliasing

If you have a large frontend applications, imports could be a huge mess, with
long imports like:

```javascript
import React from 'react';

import { Button } from '../../../../../../components/actions/Button';
```

If you use TypeScript, you can add aliases in the `tsconfig.json`:

```json
{
  "compilerOptions": {
    …
    "paths": {
      "components/*": ["./src/components/*"],
      …
    }
  },
  …
}
```

And for webpack:

```js
{
  …
  alias: {
    components: path.resolve(__dirname, 'src/components'),
    …
  },
  …
}
```

So that the import would look like this instead:

```typescript
import React from 'react';

import { Button } from 'components/actions/Button';
```

#### Sorting and grouping of imports

To be able to group imports, and to make the hierarchy clearer, you can use the
`import/order` rule with ESLint:

```json
{
  …
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        pathGroups: [
          { pattern: 'components', group: 'internal' },
          { pattern: 'hooks', group: 'internal' },
          { pattern: 'redux', group: 'internal' },
          { pattern: 'utils', group: 'internal' },
          …
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        'newlines-between': 'always'
      }
    ],
  }
  …
}
```

Which would make this:

```typescript
//
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Heading2,
  Heading3,
  Paragraph,
  Label,
} from '@designssystem/typography';

import {
  Reference,
  SupplementProduct,
  ValidableElement,
  GenericParameterAssignment,
} from '../../../../models/index';
import { useI18N } from '../../../../hooks/useI18N';
import { saveFareProductTree } from '../../../../bucket/actions';
import { fareFrameIdFromOrganisation } from '../../../../utils/index';
import { LoadingStatus } from '../../../../components/feedback/Loading';
import OverlayLoader from '../../../../components/feedback/OverlayLoader';
import { useAppDispatch } from 'hooks/useAppDispatch';
import SimpleContentLoader from '../../../../components/feedback/SimpleContentLoader';
import FareTypeInfo from './components/FareTypeInfo';
import ConditionSummaryInfo from './components/ConditionSummaryInfo';
import AOPUPInfo from './components/AOPUPInfo';
import { useFetchFareTablesWithVersionsQuery } from '../../../../redux/features/products/apis/fare-table-api';
import SolidLine from '../../../../components/DesignSystemWrappers/components/SolidLine';
import './style.scss';
```

turn into this:

```typescript
//
import {
  Heading2,
  Heading3,
  Paragraph,
  Label,
} from '@designssystem/typography';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SolidLine from 'components/DesignSystemWrappers/components/SolidLine';
import { LoadingStatus } from 'components/feedback/Loading';
import OverlayLoader from 'components/feedback/OverlayLoader';
import SimpleContentLoader from 'components/feedback/SimpleContentLoader';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useI18N } from 'hooks/useI18N';
import {
  Reference,
  SupplementProduct,
  ValidableElement,
  GenericParameterAssignment,
} from 'models/index';
import { useFetchFareTablesWithVersionsQuery } from 'redux/features/products/apis/fare-table-api';
import { fareFrameIdFromOrganisation } from 'utils/index';

import { saveFareProductTree } from '../../../../bucket/actions/save-fare-product-tree';

import AOPUPInfo from './components/AOPUPInfo';
import ConditionSummaryInfo from './components/ConditionSummaryInfo';
import FareTypeInfo from './components/FareTypeInfo';

import './style.scss';
```

#### Nomenclature

Having a good naming convention is key in making logical sense of the code, and
makes it easier to grasp the concept of the code and to get a better overview
over what the code does.

Please, for the love of [Cthulhu](https://en.wikipedia.org/wiki/Cthulhu), do not
have your naming convention like this:

```shell-session
$ struct
📦 my-frontend
 ├── …
 ├── 📁 src
 │ └── 📁 components
 │   └── 📁 MyCoolComponent
 │     └── 📄 MyCoolComponent.js
 └── …
```

The import would then look like:

```javascript
//
import MyCoolComponent from 'components/MyCoolComponent/MyCoolComponent';
```

Using an unecessary amount of bytes. It is better to do this:

```shell-session
$ struct
📦 my-frontend
 ├── …
 ├── 📁 src
 │ └── 📁 components
 │   └── 📁 MyCoolComponent
 │     └── 📄 index.js
 └── …
```

The import would then look like:

```javascript
import MyCoolComponent from 'components/MyCoolComponent';
```

It's cleaner, shorter and saves bytes!

### Folder structure

Establishing a well-organized and sensible folder structure is one of the most
crucial and demanding aspects of managing a large-scale application. Before
contemplating the division of the codebase into multiple applications using
micro frontends, it is advisable to take certain steps to enhance the
project-level architecture. This approach can facilitate a smoother transition
if such a path is ever considered.

The objective is to implement a form of modularization that enhances the
comprehensibility of the codebase by defining clear boundaries between features.
This strategy aims to minimize code coupling and reduce side effects for
improved maintainability.

This is how I recommend to set it up, based on what I feel works best for me.
<abbr class="ph">YMMV</abbr> (
[Your Mileage May Vary](https://www.oxfordlearnersdictionaries.com/us/definition/english/ymmv)
):

```shell-session
$ struct
📦 my-frontend
 ├── 📁 scripts
 ├── 📁 src
 │ ├── 📁 assets
 │ ├── 📁 components
 │ │ └── 📁 feedback
 │ │   ├── 📁 Notification
 │ │   │ ├── 📁 components
 │ │   │ ├── 📁 helpers
 │ │   │ ├── 📁 styles
 │ │   │ ├── 📁 test
 │ │   │ ├── 📁 types
 │ │   │ └── 📁 utils
 │ │   │ └── 📄 index.js
 │ │   └── 📁 Toast
 │ │     ├── 📁 components
 │ │     ├── 📁 helpers
 │ │     ├── 📁 styles
 │ │     ├── 📁 test
 │ │     ├── 📁 types
 │ │     └── 📁 utils
 │ │     └── 📄 index.js
 │ ├── 📁 features
 │ │ ├── 📁 profile
 │ │ │ ├── 📁 components
 │ │ │ ├── 📁 config
 │ │ │ ├── 📁 contexts
 │ │ │ ├── 📁 helpers
 │ │ │ ├── 📁 models
 │ │ │ ├── 📁 services
 │ │ │ ├── 📁 stores
 │ │ │ ├── 📁 styles
 │ │ │ ├── 📁 test
 │ │ │ ├── 📁 types
 │ │ │ ├── 📁 utils
 │ │ │ └── 📄 index.js
 │ │ └── 📁 map
 │ │   ├── 📁 components
 │ │   ├── 📁 config
 │ │   ├── 📁 contexts
 │ │   ├── 📁 helpers
 │ │   ├── 📁 models
 │ │   ├── 📁 services
 │ │   ├── 📁 stores
 │ │   ├── 📁 styles
 │ │   ├── 📁 test
 │ │   ├── 📁 types
 │ │   ├── 📁 utils
 │ │   └── 📄 index.js
 │ ├── 📁 config
 │ ├── 📁 contexts
 │ ├── 📁 lib
 │ ├── 📁 models
 │ ├── 📁 pages
 │ ├── 📁 services
 │ ├── 📁 stores
 │ ├── 📁 styles
 │ ├── 📁 test
 │ ├── 📁 types
 │ ├── 📁 utils
 │ └── 📄 main.js
 └── 📁 public
```

#### Applications

##### JavaScript Web Application

```shell-session
$ struct
📦 my-frontend
 ├── 📁 scripts
 ├── 📁 src
 │ ├── 📁 assets
 │ ├── 📁 components
 │ ├── 📁 config
 │ ├── 📁 features
 │ ├── 📁 lib
 │ ├── 📁 pages
 │ ├── 📁 services
 │ ├── 📁 styles
 │ ├── 📁 test
 │ ├── 📁 utils
 │ ├── 📁 …
 │ └── 📄 main.js
 ├── 📁 public
 └── 📄 package.json
```

##### TypeScript Web Application

```shell-session
$ struct
📦 my-ts-frontend
 ├── 📁 scripts
 ├── 📁 src
 │ ├── 📁 assets
 │ ├── 📁 components
 │ ├── 📁 config
 │ ├── 📁 features
 │ ├── 📁 lib
 │ ├── 📁 pages
 │ ├── 📁 services
 │ ├── 📁 styles
 │ ├── 📁 types
 │ ├── 📁 test
 │ ├── 📁 utils
 │ ├── 📁 …
 │ └── 📄 main.ts
 ├── 📁 public
 └── 📄 package.json
```

##### React Web Application

```shell-session
$ struct
📦 my-react-frontend
 ├── 📁 scripts
 ├── 📁 src
 │ ├── 📁 assets
 │ ├── 📁 components
 │ ├── 📁 config
 │ ├── 📁 contexts
 │ ├── 📁 features
 │ ├── 📁 lib
 │ ├── 📁 pages
 │ ├── 📁 services
 │ ├── 📁 styles
 │ ├── 📁 stores
 │ ├── 📁 types
 │ ├── 📁 test
 │ ├── 📁 utils
 │ ├── 📁 …
 │ └── 📄 App.tsx
 │ └── 📄 main.ts
 ├── 📁 public
 └── 📄 package.json
```

##### NodeJS Application

```shell-session
$ struct
📦 my-react-frontend
 ├── 📁 scripts
 ├── 📁 src
 │ ├── 📁 assets
 │ ├── 📁 config
 │ ├── 📁 lib
 │ ├── 📁 middlewares
 │ ├── 📁 router
 │ ├── 📁 types
 │ ├── 📁 test
 │ ├── 📁 utils
 │ └── 📄 index.ts
 └── 📄 package.json
```

#### `public`

All public files, but most likely, only `index.html` or any public static file.

#### `scripts`

Put helper scripts for inhouse usage/auxilliary tools here.

#### `src/assets`

All your static assets goes here. This includes:

- prebuilt libs in `src/assets/js`
- images in `src/assets/img`
- icons in `src/assets/icons` (or `src/assets/img/icons`)
- prebuilt stylesheets (`*.css`) in `src/assets/css`
- fonts in `src/assets/fonts`
- meta stuff like `browserconfig.xml`/`site.webmanifest` in `src/assets/meta`

```shell-session
$ struct
📦 my-frontend
 ├── 📁 src
 │ ├── 📁 assets
 │ │ ├── 📁 css
 │ │ ├── 📁 img
 │ │ ├── 📁 js
 │ │ └── …
 │ └── …
 └── …
```

#### `src/components`

Shareable components goes here.

##### Grouping

These components should be grouped by the type of component, for example:

- link, menus etc goes into `src/components/navigation`
- header, footer, main, intro goes into `src/components/page-section`
- input fields, form stuff goes into `src/components/form` or
  `src/components/input-elements`
- tables, data-tables, comparison tables goes into `src/components/tables`
- errors, loading, notification, toasts goes into `src/components/feedback`

```shell-session
$ struct
📦 my-frontend
 ├── 📁 src
 │ ├── …
 │ ├── 📁 components
 │ │ ├── 📁 communication
 │ │ ├── 📁 content
 │ │ ├── 📁 meta
 │ │ ├── 📁 navigation
 │ │ ├── 📁 page-sections
 │ │ └── …
 │ └── …
 └── …
```

{% message type="note" title="Note" %}

The names of the groups are meant as a guide, not set in stone. You are free to
group your components depending on your setup and nomenclature.

{% /message %}

##### Hierarchy

If a component requires other components _only_ specific to that component, you
should have a child folder named `components`. For example, if you have a
component named `Table` in `src/components/tables/Table`, and you want
`TableHeader`, `TableFooter`, `TableSort` components, put them in
`src/components/tables/Table/components/TableHeader/` etc.

```shell-session
$ struct
📦 my-react-frontend
 ├── 📁 src
 │ ├── 📁 components
 │ │ ├── 📁 tables
 │ │ │ ├── 📁 Table
 │ │ │ │ ├── 📁 components
 │ │ │ │ │ ├── 📁 TableHeader
 │ │ │ │ │ │ └── 📄 index.tsx
 │ │ │ │ │ └── 📁 TableFooter
 │ │ │ │ │   └── 📄 index.tsx
 │ │ │ │ └── 📄 index.tsx
 │ │ │ └── 📁 …
 │ │ └── 📁 …
 │ └── …
 └── …
```

However, if you have only one extra component, put it alongside the main
component

```shell-session
$ struct
📦 my-react-frontend
 ├── 📁 src
 │ ├── 📁 components
 │ │ ├── 📁 tables
 │ │ │ ├── 📁 Table
 │ │ │ │ ├── 📄 index.tsx
 │ │ │ │ └── 📄 TableHeader.tsx
 │ │ │ └── 📁 …
 │ │ └── 📁 …
 │ └── …
 └── …
```

If a `*.tsx/*.jsx` context, if a component require a set of code that returns
different components based on input, it is a helper, and should be in
`src/components/tables/Table/helpers/`:

```shell-session
$ struct
📦 my-react-frontend
 ├── 📁 src
 │ ├── 📁 components
 │ │ ├── 📁 tables
 │ │ │ ├── 📁 Table
 │ │ │ │ ├── 📁 helpers
 │ │ │ │ │ └── 📄 tableRowIcon.tsx
 │ │ │ │ └── 📄 index.tsx
 │ │ │ └── 📁 …
 │ │ └── 📁 …
 │ └── …
 └── …
```

Each component can have a set of folders, similar to the `src` setup:

```shell-session
$ struct
📦 my-react-frontend
 ├── 📁 src
 │ ├── 📁 components
 │ │ ├── 📁 tables
 │ │ │ ├── 📁 Table
 │ │ │ │ ├── 📁 components
 │ │ │ │ ├── 📁 helpers
 │ │ │ │ ├── 📁 lib
 │ │ │ │ ├── 📁 styles
 │ │ │ │ ├── 📁 types
 │ │ │ │ ├── 📁 utils
 │ │ │ │ └── 📄 index.tsx
 │ │ │ └── 📁 …
 │ │ └── 📁 …
 │ └── …
 └── …
```

#### `src/config`

Any configuration for your application goes here (not test configs or configs
that should be in the project root).

#### `src/contexts`

If you use a framework that uses contexts, put them here.

#### `src/features`

The majority of the code should be placed in this location. To facilitate
smoother maintenance and scalability, our objective is to house the bulk of the
application code within the features folder. Each feature folder is intended to
encompass domain-specific code related to a particular feature, ensuring
organizational clarity.

#### `src/services`

Shared application services and providers

{% message type="note" title="Features vs services vs pages vs scenes" %}

Make some paragraphs about this

{% /message %}

#### `src/lib`

Config for 3rd party libs goes here, or if you require to have your own version
of a 3rd party lib, and also have to compile it, put it here. If the 3rd party
lib is not to be compiled by you, put it in `src/assets/js/`.

#### `src/pages`

Put pages here. Having all the pages in one place is very helpful but the logic
inside them should be kept to the minimum.

#### `src/styles`

Put global styles here.

#### `src/stores`

If you use stores, put them here.

#### `src/test`

Test related stuff, mocks, helpers, utilities etc.

#### `src/types`

If you use TypeScript, puth types, interfaces and enums here.

#### `src/utils`

If the code is some standalone, drop in function or class, put it here.

{% message type="note" title="Note" %}

If the standalone, drop in function or class is getting to big, you might want
to consider creating a separate package for it.

{% /message %}

## Automate

I love to get rid of secondary activites, L O V E it. So if I can automate it, I
automate it!

### Changelog

Changelog generation goes hand in hand with releases, or changes merged into the
master. And since I use `commitizen`, creating changelogs is a walk in the park.
I use
[Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)
with `conventional-changelog-conventionalcommits`.

```shell-session
npm i -D conventional-changelog-conventionalcommits
```

### Releases

To orchestrate my releases, i use
[`release-it`](https://github.com/release-it/release-it), and it's basically
fire and forget. You can do it with an interactive CLI, or like me,
[in an action](https://github.com/phun-ky/speccer/actions/runs/6565633041/workflow).

```shell-session
npm i -D release-it
```

Update your scripts in `package.json`:

```json
{
  …
  "scripts": {
    …
    "release": "release-it",
    …
  },
  …
}
```

And you can do `npm run release`!

**This is the `.release-it.json` I use:**

```json
{
  "git": {
    "commitMessage": "chore: 🤖 release v${version}"
  },
  "github": {
    "release": true,
    "tokenRef": "GH_TOKEN"
  },
  "npm": {
    "publish": true,
    "skipChecks": true
  },
  "hooks": {
    "after:bump": "npm run build && npm run docs:gen",
    "after:release": "echo Successfully released ${name} v${version} to ${repo.repository}."
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "header": "# Changelog",
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {
            "type": "chore",
            "section": "Tasks"
          },
          {
            "type": "docs",
            "section": "Documentation"
          },
          {
            "type": "feat",
            "section": "Feature"
          },
          {
            "type": "fix",
            "section": "Bug"
          },
          {
            "type": "perf",
            "section": "Performance change"
          },
          {
            "type": "refactor",
            "section": "Refactoring"
          },
          {
            "type": "release",
            "section": "Create a release commit",
            "hidden": true
          },
          {
            "type": "style",
            "section": "Markup, white-space, formatting, missing semi-colons...",
            "hidden": true
          },
          {
            "type": "test",
            "section": "Adding missing tests",
            "hidden": true
          }
        ]
      },
      "infile": "CHANGELOG.md"
    }
  }
}
```

### CI/CD

Use a decent CI/CD setup, I love
[GitHub Actions](https://github.com/features/actions).

## Extrapolate

### Documentation generation

If you use [JSDoc](https://jsdoc.app/), you can generate documentation based on
that. If you use TypeScript, you can have automagic documentation generated with
[TypeDoc](https://typedoc.org/).

```shell-session
npm i -D typedoc
```

My preferred plugins:

```shell-session
npm i -D typedoc-plugin-frontmatter typedoc-plugin-markdown typedoc-plugin-mdn-links typedoc-plugin-no-inherit typedoc-plugin-rename-defaults
```

Update your `package.json` scripts:

```json
{
  …
  "scripts": {
    …
    "docs:gen": "node ./node_modules/.bin/typedoc --entryPoints src --entryPointStrategy expand --gitRevision main --githubPages false --plugin typedoc-plugin-markdown --tsconfig tsconfig.json --hideInPageTOC --out api --readme none",
    …
  }
  …
}
```

This will generate documentation based of your code and JSdoc annotation in the
`/api` folder.

## Minimize

Why advocate for code minimization? Well, a primary objective in my approach to
development, both professionally and as a human being, is to contribute to a
better world. Streamlining and reducing code directly contribute to a lower
carbon footprint by using fewer bytes and transmitting less data over the
internet.

While many developers already focus on optimizing applications for speed, the
emphasis on sustainability is gaining prominence. The equation is straight
forward: fewer bytes sent result in a faster application, leading to a reduced
carbon footprint. It's a win-win scenario.

To enhance your carbon footprint, you can apply the same principles used for
optimizing and minimizing code. Additionally, there are other strategies to
lessen the environmental impact in development, including:

- General reduction of code
- Minimizing the code stored in your repository
- Decreasing the number of dependencies in your project
- Reducing the frequency of builds or the shipment of artifacts to other vendors

### Reduce code

Repeat after me: Refactor, refactor, refactor. Continusly refactoring and
pruning the application is to me kinda like the process of caring for a bonsai
tree. Create reusable components, split out code, carefully select dependencies,
IF you require them.

### Smaller repositories

In the mantra of reducing code. Do not curate a large repository, consider
splitting up the repository in smaller repositories. If some parts of the code
is rarely updated, split it out. If parts of your code could be reusable in
other projects, split it out. Consider to open source it!

You could also test out monorepos, for example with
[Lerna](https://lerna.js.org/).

### Reduce dependencies

Do not use dependencies for code you can create yourself
([leftpad anyone](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code)?).
Many dependencies are created as polyfills for features a native API did not
have in the beginning, but they have support for it now. Like
[jQuery](https://jquery.com/), [moment](https://momentjs.com/),
[date-fns](https://date-fns.org/) and
[lodash](https://lodash.com/)/[underscore](https://underscorejs.org/).

Usefull links:

- <https://youmightnotneedjquery.com/>
- <https://github.com/you-dont-need/You-Dont-Need-Momentjs>
- <https://youmightnotneed.com/lodash>
- <https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore>
- <https://youmightnotneed.com/date-fns>

### Reduce builds

Ask yourself these questions:

- Do you really need to install every dependency for every build? Can you reuse
  some artifacts instead?
- Do you really need to update snapshots?
- Do you have to build for every release stage?

One example is, when you create a PR to `main`, you have a merge check, and most
likely in that merge check, you have a build step and a test step. If the check
is passing, do you really need to to a new check on `main`?

Another example, if the PR only have changes in files that in no way effect the
frontend application features/look/appearance, do you really need to have a
merge-check?

## Conclusion

In conclusion, achieving the best frontend developer experience involves a
combination of standardization, automation, and code minimization. Standardizing
practices, such as adopting semantic versioning for clear communication about
changes, committing to readable and concise commit messages, and following
consistent coding patterns, contributes to an efficient workflow and
collaborative development.

Linting, particularly using tools like ESLint in conjunction with Prettier,
enhances code quality and maintains a clean and uniform codebase. Establishing
meaningful naming conventions, returning early in functions, and avoiding nested
ternary operators improve code readability and maintainability.

Organizing code into a well-structured folder hierarchy, utilizing aliases for
imports, and employing sorting and grouping for imports contribute to a more
maintainable codebase. Additionally, having a clear folder structure, including
features, services, pages, and utilities, is essential for managing large-scale
applications.

Automation plays a crucial role in streamlining development processes.
Leveraging tools like Commitizen for standardized commit messages, Release-it
for automated releases, and GitHub Actions for continuous integration and
deployment enhances efficiency and reduces manual intervention.

Code minimization, both in terms of reducing code size and optimizing
development processes, is highlighted as a key principle. Refactoring code,
adopting smaller repositories, minimizing dependencies, and optimizing build
processes contribute to a smaller carbon footprint and a more sustainable
development approach.

In essence, the journey towards a better frontend developer experience involves
a holistic approach that encompasses standardized practices, efficient
automation, and a commitment to code minimization for improved sustainability
and maintainability.
