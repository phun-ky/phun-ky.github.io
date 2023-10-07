---
route: /2023/10/04/create-a-simple-vanilla-javascript-spa
title: 'Create a simple, Vanilla JavaScript SPA'
description: 'I never really liked frameworks, maybe in the start of my career, because it
made life simpler, at first, and then it made life harder. And for a long time
I have been aware of the digital footprint that me, as a developer, has left
behind, and the responsibilities that I have as a member of the global community.
So, after some tinkering, and much thanks to other developers that has coded
before me, I finally made a working, _minimal footprint_,
vanilla JavaScript Single Page Application setup.'
category: 'How-to'
tags: [how-to, app, javascript, rollup, nodejs, npm, github, spa, single-spa, ts, typescript, js]
---

> Do you _really_ need a framework for this?

If you follow this guide, you will have your own Vanilla JavaScript SPA up
and running in no time!

{% message type="note" title="Note" %}

Even though I say `JavaScript` here, in this example
I have used `TypeScript`. It is not required, so feel free
to strip out the typings if you want.

{% /message %}

**Table of Contents**

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
   1. [npm](#npm)
      1. [Dependencies](#dependencies)
      2. [npm scripts](#npm-scripts)
   2. [Configuration files](#configuration-files)
   3. [Rollup](#rollup)
   4. [Folder structure](#folder-structure)
      1. [`public`](#public)
      2. [`src/assets/js`](#srcassetsjs)
      3. [`src/assets/css`](#srcassetscss)
      4. [Styles](#styles)
4. [SPA](#spa)
   1. [`src/lib/spa/index.ts`](#srclibspaindexts)
   2. [router](#router)
      1. [`src/lib/spa/router/index.ts`](#srclibsparouterindexts)
      2. [`src/lib/spa/router/routes.ts`](#srclibsparouterroutests)
      3. [`src/lib/spa/router/utils/get-router-match.ts`](#srclibsparouterutilsget-router-matchts)
      4. [`src/lib/spa/router/utils/potential-matches-mapper.ts`](#srclibsparouterutilspotential-matches-mapperts)
   3. [utils](#utils)
      1. [`src/lib/spa/utils/bootstrap.ts`](#srclibspautilsbootstrapts)
      2. [`src/lib/spa/utils/dom-content-loaded.ts`](#srclibspautilsdom-content-loadedts)
      3. [`src/lib/spa/utils/event-after-app-render.ts`](#srclibspautilsevent-after-app-renderts)
      4. [`src/lib/spa/utils/popstate.ts`](#srclibspautilspopstatets)
      5. [`src/lib/spa/utils/event-matches.ts`](#srclibspautilsevent-matchests)
      6. [`src/lib/spa/utils/get-params.ts`](#srclibspautilsget-paramsts)
      7. [`src/lib/spa/utils/navigate-to.ts`](#srclibspautilsnavigate-tots)
      8. [`src/lib/spa/utils/update-nodes.ts`](#srclibspautilsupdate-nodests)
      9. [`src/lib/spa/utils/string-to-html.ts`](#srclibspautilsstring-to-htmlts)
      10. [`src/lib/spa/utils/set-title.ts`](#srclibspautilsset-titlets)
      11. [`src/lib/spa/utils/wait-for.ts`](#srclibspautilswait-forts)
5. [Putting it together](#putting-it-together)
   1. [`src/main.ts`](#srcmaints)
   2. [`src/app.ts`](#srcappts)
   3. [`src/pages/StartPage/index.ts`](#srcpagesstartpageindexts)
   4. [`src/pages/AboutPage/index.ts`](#srcpagesaboutpageindexts)
   5. [`src/pages/ErrorPage/index.ts`](#srcpageserrorpageindexts)
   6. [`src/pages/PageNotFoundPage/index.ts`](#srcpagespagenotfoundpageindexts)
6. [Summary](#summary)

## Features

This setup will give you features such as:

* Dynamic importing of pages
* Only update nodes that has changed
* Minimal carbon footprint
* SPA Framework similar setup and inner workings
* Minimal adjustments required to switch to a framework
* Some sort of equivalent to `useEffect` and `useState` like in React

## Prerequisites

**Knowledge of**:

* JavaScript
* npm
* NodeJS
* git

**Tools**:

* terminal
* editor
* web browser

## Setup

{% message type="info" title="TL;DR" %}

If you do not like long reading, you can check out the repository for
[this setup here](https://github.com/phun-ky/vanilla-js-spa)

{% /message %}

First we need to set up a repository. Head on over to
[https://github.com](https://github.com) and create a new repository. Call it
whatever you want, and clone it into your workspace. For the sake of this guide,
we are referring to the repository as `vanilla-js-spa`;

```shell-session
$ cd ~/Workspace
$ git clone git@github.com:<your username>/vanilla-js-spa.github.io.git
Cloning into vanilla-js-spa.github.io
```

Then `cd` into your project:

```shell-session
$ cd vanilla-js-spa.github.io
$ struct
📦 vanilla-js-spa.github.io
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
📦 vanilla-js-spa.github.io
 ├── 📄 .gitignore
 ├── 📄 package.json
 └── 📄 README.md
```

#### Dependencies

After you've done that, install the required dependencies. First the dependencies required to build our application, then the dependency required for our SPA to work optimally:

```shell-session
$ npm i -D @ironkinoko/rollup-plugin-styles @rollup/plugin-commonjs @rollup/plugin-node-resolve cssnano postcss postcss-cli rollup rollup-plugin-dts rollup-plugin-node-externals rollup-plugin-typescript2 stylus ts-node tsconfig-paths tslib typescript 
added 295 packages, and audited 296 packages in 7s

found 0 vulnerabilities
$ npm i -S diff-dom
added 1 package, and audited 2 packages in 438ms

found 0 vulnerabilities
$ struct
📦 vanilla-js-spa.github.io
 ├── 📁 node_modules
 ├── 📄 .gitignore
 ├── 📄 package-lock.json
 ├── 📄 package.json
 └── 📄 README.md
```

{% message type="note" title="Note" %}

If you want, this is a great step to add linting stuff like `eslint` and
`prettier`

{% /message %}

#### npm scripts

Open up your `package.json`, and update the `scripts` property to something like
this:

```json
{
  …
  "scripts": {
    "clean": "rm -rf dist/*",
    "assets": "mkdir -p dist && cp -a ./public/. ./dist/ && cp -a ./src/assets/. ./dist/",
    "prebuild": "npm run clean && npm run assets",
    "build": "rollup -c rollup.config.js",
    "postbuild": "bash -c 'mv -f ./dist/*.{js,map} ./dist/js'",
    "build:watch": "rollup -c rollup.config.js -w",
    "dev": "npx browser-sync start -s \"dist\" --files \"dist/*.*\"  --single"
  },
  …
}
```

As you can see, we have added some scripts that will build this site:

* **clean**: A helper function that will clean the `dist` folder, because you
  _really_ dont want the produced files in your repository
* **assets**: Copies over the assets to the `dist` folder
* **prebuild**: Runs before the `build` script, making sure we have assets
  copied
* **postbuild**: A helper script to actually move the produced rollup artifacts
  into their respective folder, to make it look cleaner
* **build:watch**: A simple watcher to build on every save.
* **dev**: I use `browser-sync` for dev, you can use whatever setup you are used
  to, but this is what I use.

{% message type="important" title="Important" %}

You need to add `dist` to your `.gitignore` file!

{% /message %}

Your `package.json` should look something like this:

```json
{
  "name": "vanilla-js-spa.github.io",
  "version": "1.0.0",
  "type": "module",
  "description": "Vanilla JavaScript SPA",
  "scripts": {
    "clean": "rm -rf dist/*",
    "assets": "mkdir -p dist && cp -a ./public/. ./dist/ && cp -a ./src/assets/. ./dist/",
    "prebuild": "npm run clean && npm run assets",
    "build": "rollup -c rollup.config.js",
    "postbuild": "bash -c 'mv -f ./dist/*.{js,map} ./dist/js'",
    "build:watch": "rollup -c rollup.config.js -w",
    "dev": "npx browser-sync start -s \"dist\" --files \"dist/*.*\"  --single"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<your username>/vanilla-js-spa.github.io.git"
  },
  "bugs": {
    "url": "https://github.com/<your username>/vanilla-js-spa.github.io/issues"
  },
  "engines": {
    "node": ">=18.16.0",
    "npm": ">=9.5.1"
  },
  "homepage": "https://github.com/<your username>/vanilla-js-spa.github.io#readme",
  "devDependencies": {
    "@ironkinoko/rollup-plugin-styles": "^4.0.3",
    "@rollup/plugin-commonjs": "^25.0.1",
    "@rollup/plugin-node-resolve": "^15.0.2",
    "cssnano": "^6.0.0",
    "postcss": "^8.4.23",
    "postcss-cli": "^10.1.0",
    "rollup": "^3.22.0",
    "rollup-plugin-dts": "^5.3.0",
    "rollup-plugin-node-externals": "^6.0.1",
    "rollup-plugin-typescript2": "^0.35.0",
    "stylus": "^0.59.0",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "tslib": "^2.3.1",
    "typescript": "^5.1.3"
  },
  "dependencies": {
    "diff-dom": "^5.0.7"
  }
}
```

{% message type="important" title="Important" %}

Remember to set the `author` and `license` fields

{% /message %}

### Configuration files

If you are like me and love to configure options for the different modules
used in this setup, you might want to add some configuration files:

* `.browserslistrc`
* `.editorconfig`
* `.postcssrc.cjs`
* `.stylintrc`
* `tsconfig.json`
* `tslint.json`

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 ├── 📁 node_modules
 ├── 📄 .browserslistrc
 ├── 📄 .editorconfig
 ├── 📄 .gitignore
 ├── 📄 .postcssrc.cjs
 ├── 📄 .stylintrc
 ├── 📄 package-lock.json
 ├── 📄 package.json
 ├── 📄 README.md
 ├── 📄 tsconfig.json
 └── 📄 tslint.json
```

### Rollup

To be able to process `*.styl` files and produced bundled JavaScript, we are
using `rollup`. Start creating your `rollup.config.js`:

{% message type="note" title="Note" %}

I use Stylus for my styling, you can choose `sass/scss` or `less` if you prefer
that. Just remember to install the correct dependencies, and use the correct
configuration files

{% /message %}

```shell-session
$ touch rollup.config.js
$ struct
📦 vanilla-js-spa.github.io
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
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import styles from '@ironkinoko/rollup-plugin-styles';
import svg from 'rollup-plugin-svg-import';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: ['src/main.ts'],
    output: {
      format: 'es',
      sourcemap: true,
      exports: 'named',
      dir: 'dist',
      assetFileNames: '[name][extname]'
    },
    plugins: [
      svg({
        stringify: true
      }),
      styles({
        mode: ['extract', './css/vanilla-js-spa.css'],
        url: false,
        minimize: true
      }),
      nodeResolve(),
      commonjs(),
      ts({
        useTsconfigDeclarationDir: true,
        sourceMap: false,
        typescript
      })
    ]
  }
];
```

### Folder structure

Now, let us add some more folders to our app:

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 ├── 📁 node_modules
 …
 ├── 📁 public
   └── 📄 index.html
 ├── 📁 src
   ├── 📁 assets
     ├── 📁 css
     ├── 📁 img
     ├── 📁 js
   ├── 📁 components
   ├── 📁 config
   ├── 📁 features
   ├── 📁 lib
   ├── 📁 pages
   ├── 📁 styles
   ├── 📁 types
   ├── 📄 app.ts
   └── 📄 main.ts
 …
 └── 📄 rollup.config.js
```

#### `public`

We need a place to consume the SPA, so create `public/index.html`, and put this
into it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>vanilla-js-spa</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="app"></div>
    <link async href="/css/vanilla-js-spa.css" rel="stylesheet" type="text/css" />
    <script
      defer
      type="module"
      src="/js/main.js"
      type="text/javascript"
    ></script>
  </body>
</html>
```

#### `src/assets/js`

Here you can put any JavaScript you want, that is prebuilt. For example a custom
[Prism](https://prismjs.com/) build.

{% message type="important" title="Important" %}

Remember earlier, from the npm scripts, that we copy over the `assets` folder
into `dist`? Well, we need at least one file for the copying of js to work.
So if you haven't added any `*.js` file, add a dummy file:

Go into the `src/assets/js` directory and create a `dummy.js` file:

```shell-session
$ cd src/assets/js
$ echo "console.log('dummy');" > dummy.js
$ cat dummy.js
console.log('dummy');
```

{% /message %}

{% message type="warning" title="Warning" %}

These files will **not** be processed

{% /message %}

#### `src/assets/css`

In the `css` folder, you can put any css file you want, for example a custom
styling for `prismjs`, your custom [tailwindcss](https://tailwindcss.com/) or
any other library you would use.

{% message type="warning" title="Warning" %}

These files will **not** be processed

{% /message %}

#### Styles

Then go to the `styles` folder to create a `index.styl` file, for all your
styles.

```shell-session
$ cd src/styles
$ touch index.styl
$ struct
  └── 📄 index.styl
```

Then in `src/main.ts`, add the import of your global styles, rollup will handle this
automatically, converting the `*.styl` file into css:

```javascript
import './styles/index.styl';
```

## SPA

Now, let's get into the JavaScript part of this!

### `src/lib/spa/index.ts`

Create a folder `spa`, inside ofr `src/lib`, and then `index.ts`:

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 …
 ├── 📁 src
   ├── …
   ├── 📁 lib
     └── 📁 spa
       └── 📄 index.ts
   └── …
 …
```

Then copy and paste this into the file:

{% message type="note" title="Note" %}

I promise, this is the largest file. It can be simplified and shortened.

{% /message %}

```typescript
import {
  FunctionType,
  EventArray,
  EventDataAction,
  EventDataId,
  RouteDetails,
  EventType,
  StateContext,
  UseStateValue,
  UseStateReturn
} from './types';

import { waitFor } from './utils/wait-for';
import { setTitle } from './utils/set-title';
import { updateNodes } from './utils/update-nodes';

/**
 * The main functionality that is to be replaced if a framework is to be used
 * instead. The functionality that spa provides, is the same principles and naming that React uses,
 * except for the global event handlers like `addOnClick`.
 */
export const spa = (() => {
  const _root: HTMLElement | null = document.querySelector('#app');

  if (!_root) {
    throw new Error(
      'Missing element for application! Please make sure you have an element with the id of `app` in the DOM'
    );
  }

  const stateHooks: Record<string, StateContext> = {};
  const effectHooks: unknown[] = [];

  let _templateCallback;
  let _page;
  let clickEventArray: EventArray<EventDataId> = [];
  let onRouteChangeEventArray: EventArray<EventDataId> = [];
  let onAfterAppRenderEventArray: EventArray<EventDataId> = [];
  let effectIndex = 0;

  const init = async (
    // eslint-disable-next-line no-unused-vars
    templateCallback: FunctionType,
    routeDetails: RouteDetails
  ) => {
    if (!templateCallback) {
      throw new Error('Missing param `templateCallback` for `init()`');
    }

    if (!routeDetails) {
      throw new Error('Missing param `routeDetails` for `init()`');
    }

    const { page } = routeDetails;

    if (!page) {
      throw new Error('Missing page');
    }

    _templateCallback = templateCallback;
    _page = page;

    await render(routeDetails);
  };
  const render = async (routeDetails?: RouteDetails) => {
    let page = _page;
    let routeChanged = false;

    if (routeDetails) {
      page = routeDetails.page;
      routeChanged = routeDetails.routeChanged;
    }

    console.info(`trying to render "${page?.route?.name}"`);
    clickEventArray = [];
    onRouteChangeEventArray = [];
    onAfterAppRenderEventArray = [];
    // reset state indexes
    Object.keys(stateHooks).forEach(
      (context) => (stateHooks[context].index = 0)
    );

    effectIndex = 0;

    document.dispatchEvent(
      new CustomEvent('eventBeforeAppRender', {
        bubbles: true,
        cancelable: true
      })
    );

    let _html = '';
    let error = false;

    try {
      _html = await _templateCallback(page);
    } catch (e) {
      if (e.message.indexOf('404') !== -1) {
        setTitle('404, page not found');
        _html = `<h1>404, page not found</h1>`;
      } else {
        _html = await _templateCallback('ErrorPage', {
          error: e
        });

        error = true;
        console.error(e);
        console.info(
          `failed to render "${page?.route?.name}", rendering error page`
        );
      }
    }

    updateNodes(_root, _html);

    await waitFor(10);

    document.removeEventListener(
      'eventAfterRouteChanged',
      handleOnRouteChangedListener
    );
    document.addEventListener(
      'eventAfterRouteChanged',
      handleOnRouteChangedListener
    );

    if (routeChanged) {
      document.dispatchEvent(
        new CustomEvent('eventAfterRouteChanged', {
          bubbles: true,
          cancelable: true,
          detail: {
            routeDetails
          }
        })
      );
    }

    const onRender = () => {
      if (
        page &&
        page.route &&
        page.route.page.onRender &&
        typeof page.route.page.onRender === 'function'
      ) {
        page.route.page.onRender();
      }

      document.dispatchEvent(
        new CustomEvent(`eventAfterPage${page.route.name}Render`, {
          bubbles: true,
          cancelable: true
        })
      );

      if (
        _templateCallback &&
        _templateCallback.onRender &&
        typeof _templateCallback.onRender === 'function'
      ) {
        _templateCallback.onRender();
      }

      document.dispatchEvent(
        new CustomEvent('eventAfterAppRender', {
          bubbles: true,
          cancelable: true
        })
      );
    };

    document.removeEventListener(
      'eventAfterAppRender',
      handleAfterAppRenderListeners
    );
    document.addEventListener(
      'eventAfterAppRender',
      handleAfterAppRenderListeners
    );

    onRender();

    document.removeEventListener('click', handleClickListeners);
    document.addEventListener('click', handleClickListeners);
  };
  const handleAfterAppRenderListeners = () => {
    onAfterAppRenderEventArray.forEach((callback: EventDataAction) => {
      callback();
    });
  };
  const handleOnRouteChangedListener = () => {
    onRouteChangeEventArray.forEach((action: EventDataId) =>
      action.callback()
    );
  };
  const handleClickListeners = (e: EventType<HTMLElement>) => {
    clickEventArray.forEach((target: EventDataId) => {
      if (e.target.id === target.id) {
        target.callback(e);
      }
    });
  };
  /**
   * To be able to add event listeners to the "string html" produced by the
   * components, we have to use "global" event handlers.
   * Every usages of this type of function (like `addOnClick`) is to be replaced if
   * a framework is used.
   * @param {string} id The id used for the event
   * @param {Function} callback The callback to use on the event
   */
  // eslint-disable-next-line no-unused-vars
  const addOnClick = (id: string, callback: FunctionType) => {
    clickEventArray.push({ id, callback });
  };
  const addOnRouteChange = (callback: FunctionType) => {
    onRouteChangeEventArray.push(callback);
  };
  const addOnAfterAppRender = (callback: FunctionType) => {
    onAfterAppRenderEventArray.push(callback);
  };
  const useState = (
    initValue: UseStateValue,
    context: string
  ): UseStateReturn => {
    if (!context || typeof context !== 'string' || context === '') {
      throw new Error('Missing parameter `context` for `useState`');
    }

    if (!stateHooks[context]) {
      stateHooks[context] = { state: [], index: 0 };
    }

    const contextStateIndex = stateHooks[context].index;
    const state = (
      stateHooks[context].state[contextStateIndex] !== undefined
        ? stateHooks[context].state[contextStateIndex]
        : initValue
    ) as UseStateValue;
    const _contextStateIndex = contextStateIndex;
    const setState = (newValue: UseStateValue) => {
      if (stateHooks[context].state[_contextStateIndex] !== newValue) {
        stateHooks[context].state[_contextStateIndex] = newValue;
      }

      render();
    };

    stateHooks[context].index++;

    return [state, setState];
  };
  const useEffect = async (
    callback: unknown | Promise<FunctionType> | FunctionType,
    dependencyArray: unknown[]
  ) => {
    const oldDependencies = effectHooks[effectIndex];

    let hasChanged = true;

    if (oldDependencies) {
      hasChanged = dependencyArray.some(
        (dep: unknown, i: number) => !Object.is(dep, oldDependencies[i])
      );
    }

    effectHooks[effectIndex] = dependencyArray;
    effectIndex++;

    if (hasChanged && callback && typeof callback === 'function') {
      if (callback.constructor.name === 'AsyncFunction') {
        await callback();
      } else {
        callback();
      }
    }
  };

  return {
    addOnClick,
    addOnRouteChange,
    addOnAfterAppRender,
    useEffect,
    useState,
    init,
    render
  };
})();

export const {
  addOnClick,
  addOnRouteChange,
  addOnAfterAppRender,
  useEffect,
  useState,
  init,
  render
} = spa;

export default spa;
```

Then, create a directory, `src/lib/spa/types`, and create an `index.ts`-file,
and enter the referenced types used in the previous file:

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 …
 ├── 📁 src
   ├── …
   ├── 📁 lib
     └── 📁 spa
       └── 📁 types
         └── 📄 index.ts
       └── 📄 index.ts
   └── …
 …
```

```typescript
…
// eslint-disable-next-line no-unused-vars
export type FunctionType = (...args: unknown[]) => void;


export type EventDataId = {
  id: string;
  // eslint-disable-next-line no-unused-vars
  callback: EventDataAction;
};

// eslint-disable-next-line no-unused-vars
export type EventDataAction = (...args: unknown[]) => void;

export type EventDataSelector = {
  selector: string;
  // eslint-disable-next-line no-unused-vars
  callback: EventDataAction;
};

// eslint-disable-next-line no-unused-vars
export type EventDataUnion<T> = FunctionType | T;

export type EventArray<T> = EventDataUnion<T>[];

export type UseStateValue =
  | boolean
  | string
  | number
  | unknown[]
  | Record<string, unknown>;

// eslint-disable-next-line no-unused-vars
export type UseStateReturn = [
  UseStateValue,
  FunctionType
];

export type StateContext = {
  state: UseStateValue[];
  index: number;
};
```

### router

We obviously need a router! inside of `src/lib/spa`, create the directory
`src/lib/spa/router`, and add these files:

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 …
 ├── 📁 src
   ├── …
   └── 📁 lib
     └── 📁 spa
       └── 📁 router
         ├── 📁 utils
           ├── 📄 get-router-match.ts
           └── 📄 potential-matches-mapper.ts
         ├── 📄 routes.ts
         └── 📄 index.ts
 …
```

#### `src/lib/spa/router/index.ts`

```typescript
import { getParams } from '../utils/get-params';

import { Route, RouterMatch } from '../types';

import { getRouterMatch } from './utils/get-router-match';

import { routes } from './routes';

let previousPage: RouterMatch = {
  route: { name: 'none' }
};
let previousParams = {};

export const router = () => {
  const page: RouterMatch = getRouterMatch(routes);
  const currentParams = getParams(page);

  let paramsChanged = false;
  let routeChanged = false;

  if (previousPage.route.name === (page.route as Route).name) {
    if (JSON.stringify(previousParams) !== JSON.stringify(currentParams)) {
      paramsChanged = true;
      routeChanged = true;
      window.scrollTo(0, 0);
      document.dispatchEvent(
        new CustomEvent('eventParamsChanged', {
          bubbles: true,
          cancelable: true,
          detail: {
            previousParams,
            currentParams
          }
        })
      );
    }
  } else {
    routeChanged = true;
    window.scrollTo(0, 0);
  }

  previousParams = getParams(page);
  previousPage = page as RouterMatch;

  const routeDetails = {
    page,
    previousPage,
    previousParams,
    currentParams,
    paramsChanged,
    routeChanged
  };

  if (routeChanged) {
    document.dispatchEvent(
      new CustomEvent('eventBeforeRouteChanged', {
        bubbles: true,
        cancelable: true,
        detail: {
          routeDetails
        }
      })
    );
  }

  return routeDetails;
};
```

#### `src/lib/spa/router/routes.ts`

```typescript
import { Route } from '../types';

export const routes: Route[] = [
  { path: '/', page: 'StartPage', name: 'Start', regex: /^\/$/ },
  { path: '/about', page: 'AboutPage', name: 'About', regex: /^\/about$/ }
];
```

#### `src/lib/spa/router/utils/get-router-match.ts`

```typescript
import { RouterMatch, Routes } from '../../types';
import { potentialMatchesMapper } from './potential-matches-mapper';

export const getRouterMatch = (routes: Routes): RouterMatch => {
  // Test each route for a potential match.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const potentialMatches = routes.map(potentialMatchesMapper as any);

  let match = potentialMatches.find(
    (potentialMatch: RouterMatch) => potentialMatch.result !== null
  ) as RouterMatch;

  if (!match) {
    // javascript, i'm looking at you!!
    const pathName = decodeURI(location.pathname) + '';

    match = {
      route: { path: '/404', page: 'PageNotFoundPage', name: 'Page not found' },
      result: [pathName]
    };
  }

  return match;
};
```

#### `src/lib/spa/router/utils/potential-matches-mapper.ts`

```typescript
import { RouterMatch, Route } from '../../types';

export const potentialMatchesMapper = (
  route: Route
): RouterMatch => {
  // javascript, i'm looking at you!!
  let pathName = decodeURI(location.pathname) + '';

  return {
    route: route,
    result: route.regex ? pathName.match(route.regex) : null
  };
};
```

### utils

To make everything play nice together, we need some utils that we have
referenced so far:

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 …
 └── 📁 src
   └── 📁 lib
     └── 📁 spa
       └── 📁 utils
         ├── 📄 bootstrap.ts
         ├── 📄 dom-content-loaded.ts
         ├── 📄 event-after-app-render.ts
         ├── 📄 popstate.ts
         ├── 📄 event-matches.ts
         ├── 📄 get-params.ts
         ├── 📄 navigate-to.ts
         ├── 📄 update-nodes.ts
         ├── 📄 string-to-html.ts
         ├── 📄 set-title.ts
         └── 📄 wait-for.ts
 …
```

#### `src/lib/spa/utils/bootstrap.ts`

This is just a helper to reduce circular dependencies, you can move or remove this if you want.

```typescript
import App from '../../../app';

import { RouteDetails } from '../types';
import { init } from '../';

export const bootstrap = async (routeDetails: RouteDetails) => {
  await init(App, routeDetails);
};
```

#### `src/lib/spa/utils/dom-content-loaded.ts`

```typescript
import { NavigateToEvent, EventType } from '../types';

import { router } from '../router';
import { bootstrap } from './bootstrap';
import { eventMatches } from './event-matches';
import { navigateTo } from './navigate-to';

// When DOM is loaded
export const DOMContentLoaded = async () => {
  // If any navigation is fired through a custom event
  document.addEventListener('navigateTo', (e: NavigateToEvent) => {
    const { to } = e.detail;

    navigateTo(to);
  });
  // If a user clicks a link that should change the popstate, instead of hard routing
  document.body.addEventListener(
    'click',
    async (e: EventType<HTMLElement>) => {
      const el = eventMatches(e, '[data-link]') as HTMLAnchorElement;

      if (el) {
        e.preventDefault();
        await navigateTo(el.href);
      }
    }
  );

  // Get current route
  const routeDetails = router();

  // Reinitialisze the SPA
  await bootstrap(routeDetails);
  
};
```

And we need to update `src/lib/spa/types/index.ts` with the types:

```typescript
…
/**
 * Represents the event object for an element.
 * @template T - Type of the element used as a target.
 */
export type EventType<T> = Event & {
  target: T & {
    files?: FileList | null;
    id: string;
    parentElement: Element | null;
  };
  currentTarget: HTMLElement & {
    documentElement: HTMLElement;
  };
};

/**
 * Represents the keyboard event object for an element.
 * @template T - Type of the element used as a target.
 */
export type KeyboardEventType<T> = KeyboardEvent & {
  target: T & {
    id: string;
  };
  currentTarget: HTMLElement & {
    documentElement: HTMLElement;
  };
};

export type NavigateToEvent = Event & {
  detail: {
    to: string;
  };
};

```

#### `src/lib/spa/utils/event-after-app-render.ts`

```typescript
export const eventAfterAppRender = () => {
  // Preserve focus state on render
  if (
    document.activeElement &&
    !document.activeElement.isEqualNode(globalThis.activeElement)
  ) {
    const { id } = globalThis.activeElement;

    if (id) {
      const elementToFocus = document.getElementById(id);

      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }
};

```

#### `src/lib/spa/utils/popstate.ts`

The handler we run on every `popstate` event.

```typescript
import { router } from '../router';
import { bootstrap } from './bootstrap';

export const popstate = async () => {
  const routeDetails = router();

  await bootstrap(routeDetails);
};
```

#### `src/lib/spa/utils/event-matches.ts`

```typescript
import { EventType } from '../types';

/**
 * @param {Event} event The event.
 * @param {string} selector The selector.
 * @returns {Element}
 *   The closest ancestor of the event target (or the event target itself) which matches the selectors given in parameter.
 */
export const eventMatches = (
  event: EventType<HTMLElement>,
  selector: string
): HTMLElement | undefined => {
  // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by a polyfill).
  // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
  // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
  const { target, currentTarget } = event;

  if (typeof target.matches === 'function') {
    if (target.matches(selector)) {
      // If event target itself matches the given selector, return it
      return target;
    }

    if (target.matches(`${selector} *`)) {
      const closest: HTMLElement | null = target.closest(selector);

      if (
        closest &&
        (currentTarget.nodeType === Node.DOCUMENT_NODE
          ? currentTarget.documentElement
          : currentTarget
        ).contains(closest)
      ) {
        return closest;
      }
    }
  }

  return undefined;
};
```

#### `src/lib/spa/utils/get-params.ts`

```typescript
import { RouterMatch } from '../types';

export const getParams = (match: RouterMatch) => {
  if (!match.result) return {};

  const values = match.result.slice(1);

  if (!match.route.path) return {};

  const keys = Array.from(match.route.path.matchAll(/:([\w]+)/g)).map(
    (result: string[]) => result[1]
  );

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};
```

#### `src/lib/spa/utils/navigate-to.ts`

```typescript
import App from '../../../app';

import { init } from '../';
import { router } from '../router';

export const navigateTo = async (url: string) => {
  history.pushState(null, '', url);

  const routeDetails = router();

  await init(App, routeDetails);
};
```

#### `src/lib/spa/utils/update-nodes.ts`

`update-nodes.ts` is the most important file in the SPA,
since it is doing what we love most about framework SPAs:
It only updates the nodes that has changed!

This is also the _only_ dependency this SPA uses in production.

```typescript
import { stringToHTML } from './string-to-html';

import { DiffDOM } from 'diff-dom';

/**
 * A wrapper to be able to update DOM nodes, using the 3rd party library `diff-dom`.
 * This compares the old DOM nodes with the new DOM nodes and applies any changes.
 * It is the same modus operandi as the inner working of a modern-day JS framework, e.g., React.
 *
 * The `updateNodes` function takes two parameters: `root` and `html`.
 * The root parameter is an `HTMLElement` where the DOM changes
 * will be applied, and the `html` parameter is a string representing
 * the new DOM nodes to be applied.
 *
 * The function uses the third-party library `diff-dom` to compare
 * the old DOM nodes with the new DOM nodes and apply any changes,
 * simulating the behavior of modern JS frameworks like React.
 * The `updateNodes` function does not return anything (returns `void`).
 *
 * {% message type="warning" %}
 *
 * **NOTE:** Does not detect text changes. See [fiduswriter/diffDOM#advanced-merging-of-text-node-changes](https://github.com/fiduswriter/diffDOM#advanced-merging-of-text-node-changes)
 *
 * {% /message %}
 *
 * @see [diffDOM](https://github.com/fiduswriter/diffDOM)
 * @param {HTMLElement} root - The root HTMLElement where the DOM changes will be applied.
 * @param {string} html - The HTML string representing the new DOM nodes to be applied.
 * @returns {void} - This function does not return anything (returns void).
 *
 * @example
 * ```ts
 * const rootElement = document.getElementById('app');
 * const newHTML = App();
 * // Updates only the changed DOM elements
 * updateNodes(rootElement, newHTML);
 * ```
 */
export const updateNodes = (root: HTMLElement, html: string): void => {
  const currentDOM = stringToHTML(root.innerHTML);
  const newDOM = stringToHTML(html);
  const dd = new DiffDOM();
  const diff = dd.diff(currentDOM, newDOM);

  dd.apply(root, diff);
};
```

#### `src/lib/spa/utils/string-to-html.ts`

```typescript
/**
 * Convert a template string into HTML DOM nodes.
 *
 * The `stringToHTML` function takes a parameter `str`, which is
 * the template string to be converted into HTML.
 * It uses the `DOMParser` to parse the template string into HTML DOM nodes and
 * then returns the `body` of the parsed document as a `Node`.
 *
 * @param {string} str - The template string to be converted into HTML.
 * @returns {Element} - The template HTML represented as DOM nodes.
 */
export const stringToHTML = (str: string): Element => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');

  return doc.body;
};
```

#### `src/lib/spa/utils/set-title.ts`

```typescript
/**
 * Sets the title of the document.
 *
 * @param {string} title - The title to set for the document.
 *
 * @example
 * ```ts
 * // Sets the document title to "My Page Title"
 * setTitle('My Page Title');
 * ```
 */
export const setTitle = (title: string): void => {
  document.title = title;
};
```

#### `src/lib/spa/utils/wait-for.ts`

```typescript
/**
 * Delays execution for the specified time.
 *
 * @param {number} ms - The time to wait in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after the specified time.
 *
 * @example
 * ```ts
 * // Wait for 2 seconds
 * await waitFor(2000);
 * ```
 */
export const waitFor = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
```

## Putting it together

### `src/main.ts`

Open up `src/main.ts` and update it to look something like this:

```typescript
// Global events
import { DOMContentLoaded } from './lib/spa/utils/dom-content-loaded';
import { eventAfterAppRender } from './lib/spa/utils/event-after-app-render';
import { popstate } from './lib/spa/utils/popstate';

// Styles
import './styles/index.styl';

// Events that happens on URL change in our SPA
window.addEventListener('popstate', popstate);
// Events that happens after DOM is loaded
document.addEventListener('DOMContentLoaded', DOMContentLoaded);
// Events that happens after eveyr App render
document.addEventListener('eventAfterAppRender', eventAfterAppRender);
```

### `src/app.ts`

Continuing, open up `src/app.ts`, and add this:

```typescript
import { getParams } from './lib/spa/utils/get-params';
import { RouterMatch } from './lib/spa/types';
import { addOnAfterAppRender } from './lib/spa';

const App = async (match: RouterMatch, params: unknown) => {
  let _page: string;
  let _params = params;

  if (typeof match === 'string') {
    _params = params;
    _page = 'ErrorPage';
  } else {
    const { route } = match;
    const { page } = route;

    if (!page) {
      _page = 'ErrorPage';
    } else {
      _page = page;
    }

    _params = getParams(match);
  }

  globalThis.activeElement = document.activeElement;
  
  let content = '';

  if (_page === 'StartPage') {
    const { StartPage: currentPage } = await import('./pages/StartPage');

    content = await currentPage();
    
  } else if (_page === 'AboutPage') {
    const { AboutPage: currentPage } = await import('./pages/AboutPage');

    content = await currentPage();
    
  } else if (_page === 'ErrorPage') {
    const { ErrorPage: currentPage } = await import('./pages/ErrorPage');

    content = currentPage({ params: _params });
  } else {
    const { PageNotFoundPage: currentPage } = await import(
      './pages/PageNotFoundPage'
    );

    content = currentPage();
  }

  return `<main>${content}</main>`;
};

export default App;
```

We need to add the types as well! Create and open up `src/lib/spa/types/index.ts`,
and add this:

```typescript
export type Route = {
  name: string;
  path?: string;
  page?: string;
  regex?: RegExp;
  layout?: string;
};

export type PreviousRoute = {
  name: string;
};

export type Routes = Route[];

export type RouteDetails = {
  page: RouterMatch;
  previousPage: RouterMatch;
  previousParams: unknown;
  currentParams: unknown;
  paramsChanged: boolean;
  routeChanged: boolean;
};

export type RouterMatch = {
  route: Route;
  result?: RegExpMatchArray | null;
};
```

Now let us make our first pages in the SPA!

### `src/pages/StartPage/index.ts`

```typescript
export const StartPage = async () => {
  return `<div>
  <h1>
    Hello world
  </h1>
  <p>
    Here is the link to <a href="/about" data-link="/about">The about page</a>
  </p>
</div>`;
};
```

{% message type="important" title="Important" %}

Notice the usage of the `data-link` attribute? This is to make sure we are using
the built in method of navigating in the SPA, so we can use `pushState`.

{% /message %}

### `src/pages/AboutPage/index.ts`

```typescript
export const AboutPage = async () => {
  return `<div>
  <h1>
    About
  </h1>
  <p>
    Here is the link to <a href="/" data-link="/">The home page</a>
  </p>
</div>`;
};

```

### `src/pages/ErrorPage/index.ts`

```typescript
export const ErrorPage = ({ params }) => {
  const { error } = params;

  return `<div>
      <h1>Something went wrong</h1>
      <p>${error}</p>
      <pre>
        <code>${error.stack}</code>
      </pre>
    </div>`;
};
```

### `src/pages/PageNotFoundPage/index.ts`

```typescript
export const PageNotFoundPage = () => {
  return html`Page not found`;
};
```

If you now run `npm run build` and then `npm run dev`, you will see the result
in your browser!

```shell-session
$ npm run build
> vanilla-js-spa@1.0.0 prebuild
> npm run clean && npm run assets
> vanilla-js-spa@1.0.0 clean
> rm -rf dist/*
> vanilla-js-spa@1.0.0 assets
> mkdir -p dist && cp -a ./public/. ./dist/ && cp -a ./src/assets/. ./dist/
> vanilla-js-spa@1.0.0 build
> rollup -c rollup.config.js
src/main.ts → dist...
created dist in 1.2s
> vanilla-js-spa@1.0.0 postbuild
> bash -c 'mv -f ./dist/*.{js,map} ./dist/js'
```

```shell-session
$ npm run dev
> vanilla-js-spa@1.0.0 dev
> npx browser-sync start -s "dist" --files "dist/*.*"  --single
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3002
    External: http://192.168.86.36:3002
 --------------------------------------
          UI: http://localhost:3003
 UI External: http://localhost:3003
 --------------------------------------
[Browsersync] Serving files from: dist
[Browsersync] Watching files...
```

## Summary

You should have your directory to look something like this:

```shell-session
$ struct
📦 vanilla-js-spa.github.io
 ├── 📁 node_modules
 ├── 📁 src
   ├── 📁 assets
     ├── 📁 css
     ├── 📁 img
     ├── 📁 js
   ├── 📁 components
   ├── 📁 config
   ├── 📁 features
   ├── 📁 lib
     └── 📁 spa
       ├── 📁 router
         ├── 📁 utils
           ├── 📄 get-router-match.ts
           └── 📄 potential-matches-mapper.ts
         ├── 📄 routes.ts
         └── 📄 index.ts
       ├── 📁 types
         └── 📄 index.ts
       ├── 📁 utils
         ├── 📄 bootstrap.ts
         ├── 📄 dom-content-loaded.ts
         ├── 📄 event-after-app-render.ts
         ├── 📄 popstate.ts
         ├── 📄 event-matches.ts
         ├── 📄 get-params.ts
         ├── 📄 navigate-to.ts
         ├── 📄 update-nodes.ts
         ├── 📄 string-to-html.ts
         ├── 📄 set-title.ts
         └── 📄 wait-for.ts
       └── 📄 index.ts
   ├── 📁 pages
    ├── 📁 ErrorPage
      └── 📄 index.ts
    ├── 📁 PageNotFoundPage
      └── 📄 index.ts
    └── 📁 StartPage
      └── 📄 index.ts
   ├── 📁 styles
   ├── 📄 app.ts
   └── 📄 main.ts
 ├── 📄 .browserslistrc
 ├── 📄 .editorconfig
 ├── 📄 .gitignore
 ├── 📄 .postcssrc.cjs
 ├── 📄 .stylintrc
 ├── 📄 package-lock.json
 ├── 📄 package.json
 ├── 📄 README.md
 ├── 📄 rollup.config.js
 ├── 📄 tsconfig.json
 └── 📄 tslint.json
```

And you are now ready to start creating your content and components in
a full fledged Vanilla JavaScript Single Page Application, with _no_ frameworks!
