---
route: /2014/03/24/working-with-javascript-modules-how-to-load-javascript-dependencies-without-requirejs
title:
  'Working with javascript modules, how to load JavaScript dependencies without
  require.js'
description:
  'In the current project I am working on, we wanted to load our dependencies in
  synchronous order without the use of a big library like require.js.'
category: 'How-to'
image: https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/ISS_Habitation_module.jpg/608px-ISS_Habitation_module.jpg
tags: [javascript, dependencies, load.js, how-to]
---

<p class="ph lead">
In the current project I am working on, we wanted to load our dependencies in "synchronous" order without the use of a big library like <a class="ph" target="_blank" rel="noopener noreferrer" href="http://requirejs.org/">require.js</a>.
</p>

<figure class="ph">
  <img alt="Photo of a ISS module" aria-describedby="iss_module" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/ISS_Habitation_module.jpg/608px-ISS_Habitation_module.jpg" class="img-responsive img-rounded img-thumbnail"/>
  <figcaption class="ph">
    <small class="ph">
      "<a class="ph" id="iss_module" href="https://commons.wikimedia.org/wiki/File:ISS_Habitation_module.jpg#/media/File:ISS_Habitation_module.jpg">ISS Habitation module</a>" by NASA - <a rel="nofollow" class="ph external free" href="http://replay.web.archive.org/20020212183550/http://spaceflight.nasa.gov/gallery/images/station/habitationmod/html/97_17427.html">http://replay.web.archive.org/20020212183550/http://spaceflight.nasa.gov/gallery/images/station/habitationmod/html/97_17427.html</a>. Licensed under Public Domain via <a class="ph" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/">Commons</a>. <strong class="ph">Figure 1</strong>
    </small>
  </figcaption>
</figure>

We've already used a microframework to load script files,
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://github.com/chriso/load.js">load.js</a>
by
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://github.com/chriso">Chris
O'Hara</a>, and we wanted to keep that microframework, as it acts like a
"boilerplate" for loading of different script files when we need them.

The result of this lead us to a solution where we integrated a `loadDeps`
function to load our dependencies.

_In this how-to, we expect that you already have
[load.js](https://github.com/chriso/load.js) and [jQuery](http://jquery.com) in
the DOM._

## The dependency loader

The dependency loader looks like this:

```javascript
/**
 * Load dependencies
 *
 * Takes three arguments, eventid, scripts_to_load and env_path
 *
 * scripts_to_load follows this syntax:
 *
 * <script handle from module> : {
 *   path     : <path to script, relative to environment path>,
 *   deps     : <optional dependency array with handles>,
 *   onload   : <optional function to be fired on load of the script>
 * }
 *
 * NOTE: the dependencies must be an actual script object in
 * scripts_to_load, and in the list before the script that requires them!
 *
 * @param   String    eventid   Most likely the name of the application, without spaces
 * @param   Object    scripts_to_load
 * @param   String    env_path
 */
var loadDeps = function (eventid, scripts_to_load, env_path) {
  /**
   * Callback for loading of deps
   *
   * @type    Function
   * @private
   * @param   Object  script
   * @param   String  handle
   * @param   String  eventid
   */
  var _callback = function (script, handle, eventid) {
      console.warn(
        eventid +
          ': Script: "' +
          handle +
          '" loaded from ' +
          eventid +
          ' loader! Please check the build configuration'
      );

      if (script.onload) {
        if (typeof script.onload === 'function') {
          script.onload();
        }
      }
    },
    _load_dependency = function (env_path, script, handle, eventid) {
      load(env_path + script.path).thenRun(function () {
        _callback(script, handle, eventid);
      });
    },
    /**
     * Is object not in window?
     *
     * @type    Function
     * @param   String
     * @private
     * @return  Boolean
     */
    _is_not_in_window = function (obj) {
      return obj in window === false;
    },
    /**
     * Flag for all dependencies loaded
     *
     * @type  Boolean
     * @private
     */
    _all_dependencies_loaded,
    /**
     * Flag for all libraries loaded
     *
     * @type  Boolean
     * @private
     */
    _all_libraries_loaded;

  /**
   * Loop through scripts_to_load to look for scripts to load
   *
   * @param     Object  scripts_to_load
   * @key       handle  Handle of the script to be loaded
   * @value     script  The script package itself
   */
  $.each(scripts_to_load, function (handle, script) {
    /**
     * If the script is not in the window object (not loaded),
     * and the script to be loaded got dependencies,
     * loop through the dependency list to load the dependencies before
     * the main script is loaded
     */
    if (_is_not_in_window(handle) && script.deps) {
      // Do we have a dependency list with someting in it?
      if (script.deps.length) {
        /**
         * Wait for depencies
         *
         * @timeout   20
         */
        setTimeout(function _waitForDependencies() {
          _all_dependencies_loaded = true;

          /**
           * Loop through script.deps to look for scripts to load
           *
           * @param     Object      script.deps
           * @key       i           Index
           * @value     dependency  The dependency handler
           */
          $.each(script.deps, function (i, dependency) {
            // Is dependency loaded?
            if (_is_not_in_window(dependency)) {
              // Set to false, since it is not loaded
              _all_dependencies_loaded = false;
            }
          });

          // If all dependencies are loaded
          if (_all_dependencies_loaded) {
            /**
             * Load the script that required the dependencies,
             * and we load the script and run any required onload methods
             */
            _load_dependency(env_path, script, handle, eventid);
          } else {
            /**
             * Wait for depencies interval
             *
             * @call      _waitForDependencies
             * @timeout   20
             */
            setTimeout(_waitForDependencies, 20);
          }
        }, 20);
      } else {
        /**
         * If the dependency list is defined, but empty,
         * we load the script and run any required onload methods
         */
        _load_dependency(env_path, script, handle, eventid);
      }
    } else if (_is_not_in_window(handle)) {
      /**
       * If the script is not in the window object (not loaded),
       * and have no dependencies (covered in the first conditional statement above),
       * we load the script and run any required onload methods
       */
      _load_dependency(env_path, script, handle, eventid);
    }
  });

  /**
   * Wait for libraries
   *
   * @timeout   20
   */
  setTimeout(function _checkLibraries() {
    _all_libraries_loaded = true;

    /**
     * Loop through scripts_to_load to check if everything is loaded
     *
     * @param     Object      scripts_to_load
     * @key       handle      Handle of the script
     * @value     script      The script object
     */
    $.each(scripts_to_load, function (handle, script) {
      // Is it loaded?
      if (_is_not_in_window(handle)) {
        _all_libraries_loaded = false;
      }
    });

    // Is everything loaded?
    if (_all_libraries_loaded) {
      $(document).trigger(eventid + ':dependencies:loaded');
    } else {
      /**
       * Wait for libraries interval
       *
       * @call      _checkLibraries
       * @timeout   20
       */
      setTimeout(_checkLibraries, 20);
    }
  }, 20);
};
```

And it takes three arguments: `eventid`, `scripts_to_load` and `env_path`.

- `eventid` is a String, an ID to be used to identify the event triggered when
  the dependencies are done loading.
- `scripts_to_load` is an Object containing the dependencies to load, the path
  of the dependency and an optional callback to run when the dependency is done
  loading
- `env_path` is a String, a relative path to where the dependencies can be found

## The scripts_to_load object

The scripts to load object can look like this:

```
Missing code!
```

## How to use it

Define your own dependencies as the gist describes it above, then, if you want
to, you can define an event listener to listen to the event fired when all the
dependencies are loaded:

```javascript
$(document).one(
  '<ID to be used for the events fired>:dependencies:loaded',
  function () {
    // Do stuff here when we have finished loading the dependencies
  }
);
```

Then, you pass that object to the `window.loadDeps` function, with required
variables:

```javascript
window.loadDeps(
  '<ID to be used for the events fired>',
  _scripts_to_load,
  '<relevant relative path where the script resides>'
);
```

And that's it! You have now implemented your own JavaScript dependency loader
without the use of Require.js!
