---
route: /2023/09/25/create-a-static-sustainable-website-or-blog
title: 'Create a static, sustainable website or blog'
description:
  'Over the years, I have made several types of blog engines, and sites, and I
  have never really been happy with anything, but this guide is one of the best
  attempts so far!'
category: 'Projects'
tags: [how-to, blog, javascript, rollup, nodejs, npm, github, yaml]
---

**Table of Contents**

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
   1. [npm](#npm)
   2. [Dependencies](#dependencies)
   3. [npm scripts](#npm-scripts)
   4. [Configuration files](#configuration-files)
   5. [Rollup](#rollup)
   6. [Folder structure](#folder-structure)
      1. [`src/assets/js`](#srcassetsjs)
      2. [`src/assets/css`](#srcassetscss)
      3. [`src/styles`](#srcstyles)
   7. [Convert posts](#convert-posts)
   8. [The article template](#the-article-template)
4. [Create your first post](#create-your-first-post)
5. [Build and view your first post](#build-and-view-your-first-post)
6. [Summary](#summary)

I have created my own blog engines with php, cakephp, static with macromedia
dreamweaver (if you remember that..), jekyll and even tried to move my blogging
to medium.com. But each attempt has left a tangy and bitter taste in my mouth.

So, what did I do? I created a new blog engine.. Well, one that I really like!

## Features

These are the features I required:

- Using markdown for quick writing
- Low impact on the environment
- Frontmatter
- Category pages (not covered here)
- Tag pages (not covered here)
- Article pages
- Create static content
- Minimal usage of html tags in markdown files (not covered here)

## Prerequisites

**Knowledge of**:

- NodeJS
- npm
- Github
- rollup
- yaml
- JavaScript

**Tools**:

- terminal
- editor
- web browser

## Setup

First we need to set up a repository. Head on over to
[https://github.com](https://github.com) and create a new repository. Call it
whatever you want, and clone it into your workspace. For the sake of this guide,
we are referring to the repository as `static-blog`;

```shell-session
$ cd ~/Workspace
$ git clone git@github.com:<your username>/static-blog.github.io.git
Cloning into static-blog.github.io
```

Then `cd` into your project:

```shell-session
$ cd static-blog.github.io
$ struct
📦 static-blog.github.io
 ├── 📄 .gitignore
 └── 📄 README.md
```

Looks empty, right? Let us proceed.

### npm

Initialize npm, change the stuff you want with the interactive tool:

```shell-session
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name:
```

After you have done that, you will have a directory something like this:

```shell-session
$ struct
📦 static-blog.github.io
 ├── 📄 .gitignore
 ├── 📄 package.json
 └── 📄 README.md
```

### Dependencies

After you've done that, install the required dependencies:

```shell-session
$ npm i -D @ironkinoko/rollup-plugin-styles @markdoc/markdoc @rollup/plugin-commonjs @rollup/plugin-node-resolve cssnano glob htmlparser2 js-yaml postcss postcss-cli rollup rollup-plugin-node-externals stylus
added …
```

{% message type="note" title="Note" %}

If you want, this is a great step to add linting stuff like `eslint` and
`prettier`

{% /message %}

After you have done that, you will have a directory something like this:

```shell-session
$ struct
📦 static-blog.github.io
 ├── 📁 node_modules
 ├── 📄 .gitignore
 ├── 📄 package-lock.json
 ├── 📄 package.json
 └── 📄 README.md
```

{% message type="note" title="Note" %}

All though this setup is not requiring much of JavaScript, we use rollup to be
able to add that later on, and to process `*.styl` files.

I use Stylus for my styling, you can choose `sass/scss` or `less` if you prefer
that. Just remember to install the correct dependencies, and use the correct
configuration files

{% /message %}

### npm scripts

Open up your `package.json`, and update the `scripts` property to something like
this:

```json
{
  …
  "scripts": {
    "clean": "rm -rf dist/*",
    "assets": "mkdir -p dist && cp -a ./src/assets/. ./dist/",
    "prebuild": "npm run clean && npm run assets && node scripts/posts/create.js",
    "build": "rollup -c rollup.config.js",
    "postbuild": "bash -c 'mv -f ./dist/*.{js,map} ./dist/js'",
    "build:watch": "rollup -c rollup.config.js -w",
    "dev": "npx browser-sync start -s \"dist\" --files \"dist/*.*\""
  },
  …
}
```

As you can see, we have added some scripts that will build this site:

- **clean**: A helper function that will clean the `dist` folder, because you
  _really_ dont want the produced files in your repository
- **assets**: Copies over the assets to the `dist` folder
- **prebuild**: Runs before the `build` script, making sure we have assets
  copied and posts created. (_We will come back to the creation of posts_)
- **postbuild**: A helper script to actually move the produced rollup artifacts
  into their respective folder, to make it look cleaner
- **build:watch**: A simple watcher to build on every save.
- **dev**: I use `browser-sync` for dev, you can use whatever setup you are used
  to, but this is what I use.

{% message type="important" title="Important" %}

You need to add `dist` to your `.gitignore` file!

{% /message %}

Your `package.json` should look something like this:

```json
{
  "name": "static-blog.github.io",
  "version": "1.0.0",
  "type": "module",
  "description": "Static Blog",
  "scripts": {
    "clean": "rm -rf dist/*",
    "assets": "mkdir -p dist && cp -a ./src/assets/. ./dist/",
    "prebuild": "npm run clean && npm run assets && node scripts/posts/create.js",
    "build": "rollup -c rollup.config.js",
    "postbuild": "bash -c 'mv -f ./dist/*.{js,map} ./dist/js'",
    "build:watch": "rollup -c rollup.config.js -w",
    "dev": "npx browser-sync start -s \"dist\" --files \"dist/*.*\""
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<your username>/static-blog.github.io.git"
  },
  "bugs": {
    "url": "https://github.com/<your username>/static-blog.github.io/issues"
  },
  "engines": {
    "node": ">=18.16.0",
    "npm": ">=9.5.1"
  },
  "homepage": "https://github.com/<your username>/static-blog.github.io#readme",
  "devDependencies": {
    "@ironkinoko/rollup-plugin-styles": "^4.0.3",
    "@markdoc/markdoc": "^0.3.2",
    "@rollup/plugin-commonjs": "^25.0.1",
    "@rollup/plugin-node-resolve": "^15.0.2",
    "cssnano": "^6.0.0",
    "glob": "^10.3.5",
    "htmlparser2": "^9.0.0",
    "js-yaml": "^4.1.0",
    "postcss": "^8.4.23",
    "postcss-cli": "^10.1.0",
    "rollup": "^3.22.0",
    "rollup-plugin-node-externals": "^6.0.1",
    "stylus": "^0.60.0"
  }
}
```

{% message type="important" title="Important" %}

Remember to set the `author` and `license` fields

{% /message %}

### Configuration files

If you are like me and love to fine granulate options for the different modules
used in this setup, you might want to add some configuration files:

- `.browserslistrc`
- `.editorconfig`
- `.postcssrc.cjs`
- `.stylintrc`

```shell-session
$ struct
📦 static-blog.github.io
 ├── 📁 node_modules
 ├── 📄 .browserslistrc
 ├── 📄 .editorconfig
 ├── 📄 .gitignore
 ├── 📄 .postcssrc.cjs
 ├── 📄 .stylintrc
 ├── 📄 package-lock.json
 ├── 📄 package.json
 └── 📄 README.md
```

### Rollup

To be able to process `*.styl` files and produced bundled JavaScript, we are
using `rollup`. Start creating your `rollup.config.js`:

```shell-session
$ touch rollup.config.js
$ struct
📦 static-blog.github.io
 ├── 📁 node_modules
 ├── 📄 .browserslistrc
 ├── 📄 .editorconfig
 ├── 📄 .gitignore
 ├── 📄 .postcssrc.cjs
 ├── 📄 .stylintrc
 ├── 📄 package-lock.json
 ├── 📄 package.json
 ├── 📄 README.md
 └── 📄 rollup.config.js
```

And it should look something like this:

```javascript
import { nodeResolve } from '@rollup/plugin-node-resolve';
import styles from '@ironkinoko/rollup-plugin-styles';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: ['src/main.js'],
    output: {
      format: 'es',
      sourcemap: true,
      exports: 'named',
      dir: 'dist',
      assetFileNames: '[name][extname]'
    },

    plugins: [
      styles({
        mode: ['extract', './css/static-blog.css'],
        url: false,
        minimize: true
      }),
      nodeResolve(),
      commonjs()
    ]
  }
];
```

{% message type="note" title="Note" %}

As you see, we are not using a minifier here, but you can add that if you
require it!

{% /message %}

### Folder structure

Now, let us add some more folders to this:

```shell-session
$ struct
📦 static-blog.github.io
 ├── 📁 node_modules
 …
 ├── 📁 src
   ├── 📁 assets
     ├── 📁 css
     ├── 📁 img
     ├── 📁 js
     └── 📁 templates
   ├── 📁 styles
   └── 📄 main.js
 …
 └── 📄 rollup.config.js
```

#### `src/assets/js`

Remember earlier, from the npm scripts, that we copy over the `assets` folder
into `dist`? Well, we need a dummy file for the copying of js to work:

Go into the `src/assets/js` directory and create a `dummy.js` file:

```shell-session
$ cd src/assets/js
$ echo "console.log('dummy');" > dummy.js
$ cat dummy.js
console.log('dummy');
```

#### `src/assets/css`

In the `css` folder, you can put any css file you want, for example a custom
styling for `prismjs`, or any other library you would use.

#### `src/styles`

Then go to the `styles` folder to create a `index.styl` file, for all your
styles.

```shell-session
$ cd src/styles
$ touch index.styl
$ struct
  └── 📄 index.styl
```

Then in `src/main.js`, add the import of your styles, rollup will handle this
automatically, converting the `*.styl` file into css:

```javascript
import './styles/index.styl';
```

Allrighty then. We've now setup, and ready to write the
`/scripts/posts/create.js` file, to be able to convert markdown files to static
files!

### Convert posts

Create a directory named `scripts`, and make a file named `create.js` inside:

```shell-session
$ mkdir scripts
$ cd scripts
$ touch create.js
$ struct
  └── 📄 create.js
```

Open up `create.js` in your editor and add this:

```javascript
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

import { globSync } from 'node:fs';

import { createContentManifest } from './utils/create-content-manifest.js';
import { getHTML } from './utils/get-html.js';
import { getFrontmatter } from './utils/get-frontmatter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const TEMPLATE_PATH = resolve(
  __dirname,
  '../..//src/assets/templates/article.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = globSync(`${CONTENT_DIR}/*.md`);

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const document = contentManifest[frontmatter.route];

  if (document) {
    let html = '';

    const rendered = getHTML(document);
    const { year, month, day, slug, title, description } = frontmatter;

    html = TEMPLATE.replace(/{{CONTENT}}/, rendered);
    html = html.replaceAll(/{{TITLE}}/g, title);
    html = html.replaceAll(/{{DESCRIPTION}}/g, description);

    const pathToDir = join(__dirname, `../../dist/${year}/${month}/${day}`);
    const pathToFile = `${pathToDir}/${slug}.html`;

    fs.mkdirSync(pathToDir, { recursive: true });

    fs.writeFileSync(pathToFile, html, 'utf-8');
  }
});
```

{% message type="note" title="Note" %}

Instead of flooding this post with a lot of code (more than required), you can
check out the imported files in `create.js`
[here](https://github.com/phun-ky/phun-ky.github.io/tree/main/scripts/posts/utils),
because this is how I have developed my blog.

{% /message %}

### The article template

Now, let us create the template for all of our posts! Create a `article.html`
file in `src/assets/templates`:

```shell-session
$ cd src/assets/templates
$ touch article.html
$ struct
  └── 📄 article.html
```

And it could look something like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{TITLE}}</title>
    …
    <meta name="description" content="{{DESCRIPTION}}" />
    …
  </head>
  <body>
    <div id="app">
      <header>…</header>
      <main>
        <h1>{{TITLE}}</h1>
        <p>{{DESCRIPTION}}</p>
        {{CONTENT}}
      </main>
      <footer>…</footer>
    </div>
  </body>
</html>
```

Did you notice the `{{TITLE}}`, `{{DESCRIPTION}}` and `{{CONTENT}}` strings? We
are using them to put the data into it.

{% message type="note" title="Note" %}

The template could be anything you want it to be, with extra styling, headers,
libraries etc. This is just an example.

{% /message %}

We will cover the post path in the next chapter.

## Create your first post

We're ready to go! Go into `src/assets/posts` and create your first post:

```shell-session
$ cd src/assets/posts
$ touch 2023-09-24-<slug-of-your-post>.md
$ struct
  └── 📄 2023-09-24-<slug-of-your-post>.md
```

Where `<slug-of-your-post>` is the slug for your post. Don't worry, you can
change the file name later.

{% message type="important" title="Important" %}

The formatting of the filename is crucial for this setup to work. The filename
consists of:

```javascript
const filename = `${year}-${month}-${day}-${slug - of - your - post.md}`;
```

Where `year` is 4 digit year, `month` is two digit, for example `02` for
February, `day` is two digit, for example `29` and the slug, well, it is the
slug.

{% /message %}

Now, open the post in your editor, and add these frontmatter properties:

```yaml
---
route: /2023/09/30/static-blog
title: 'Create a static, sustainable website or blog'
category: 'Projects'
tags: [how-to, blog, JavaScript, rollup, nodejs, npm, github, yaml]
---
```

{% message type="important" title="Important" %}

If the filename is `2023-12-23-nightmare-before-christmas.md` During the
convertion, this will be converted to the url:
`/2023/12/23/nightmare-before-christmas.html`, so the `route`-property in the
fronmatter must be: `2023/12/23/nightmare-before-christmas`.

{% /message %}

And now you are ready to write your post! Write something down, and we will
proceed! Eventually, your `posts`-folder would look something like this:

```shell-session
$ struct
📦 static-blog.github.io
 …
 ├── 📁 src
   ├── 📁 assets
     …
     └── 📁 posts
       …
       ├── 📄 2014-03-24-working-with-javascript-modules-how-to-load-javascript-dependencies-without-requirejs.md
       ├── 📄 2014-03-25-how-to-create-a-new-page-in-confluence-with-given-template-from-a-link.md
       ├── 📄 2015-09-09-trusted-data.md
       ├── 📄 2015-09-14-how-to-work-with-trusted-data.md
       ├── 📄 2015-09-22-kents-theorem.md
       ├── 📄 2015-09-29-trusted-data-for-developers.md
       ├── 📄 2018-01-02-webgl-and-data-visualisation.md
       ├── 📄 2022-02-02-enabling-developers-and-designers-to-speak-the-same-language.md
       └── 📄 2023-01-17-from-nothing-to-state-of-the-art-how-we-build-design-systems-for-all.md
       …
 …
```

## Build and view your first post

Now, we're ready to see it in action.

From the root of your project, do this:

```shell-session
$ npm run build
> static-blog@1.0.0 prebuild
> npm run clean && npm run assets && node scripts/posts/create.js
> static-blog@1.0.0 clean
> rm -rf dist/*
> static-blog@1.0.0 assets
> mkdir -p dist && cp -a ./src/assets/. ./dist/
> static-blog@1.0.0 build
> rollup -c rollup.config.js
src/main.js → dist...
(!) Generated an empty chunk
"main"
created dist in 592ms
> static-blog@1.0.0 postbuild
> bash -c 'mv -f ./dist/*.{js,map} ./dist/js'
```

```shell-session
$ npm run dev
> static-blog@1.0.0 dev
> npx browser-sync start -s "dist" --files "dist/*.*"
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.86.36:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
[Browsersync] Serving files from: dist
[Browsersync] Watching files...

```

These commands will build your files, convert your posts and copy your assets,
and then open up a browser to view your blog.

Since we have not setup an `index.html`-file, there's nothing to see. However,
go to `http://localhost:3000/2023/09/30/static-blog.html` and see your first
post!

From here you can add posts, add the styling or even JavaScript to your blog.

{% message type="note" title="Note" %}

I will not cover the category, tags or index page, but feel free to check out
[my setup](https://github.com/phun-ky/phun-ky.github.io/) to help with this!

{% /message %}

After you have run `npm run build`, the `dist`-folder should look something like
this:

```shell-session
$ struct
📦 static-blog.github.io
 …
 ├── 📁 dist
   ├── 📁 2023
     └── 📁 09
       └── 📁 30
         └── 📄 static-blog.html
   ├── 📁 css
   ├── 📁 img
   ├── 📁 js
   ├── 📁 posts
   └── 📁 templates
 …
```

## Summary

You have now learned how to build a static blog site! What can be done further?
Styling, interactivity, add missing pages and publish on
[Github Pages!](https://pages.github.com). I will cover more of these features
in separate articles. Stay tuned!
