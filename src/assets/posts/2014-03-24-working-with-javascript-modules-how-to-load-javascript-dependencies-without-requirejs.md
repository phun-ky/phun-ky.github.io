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

<script src="https://gist.github.com/phun-ky/f5b297ff1ffa767414e7.js"></script>

And it takes three arguments: `eventid`, `scripts_to_load` and `env_path`.

- `eventid` is a String, an ID to be used to identify the event triggered when
  the dependencies are done loading.
- `scripts_to_load` is an Object containing the dependencies to load, the path
  of the dependency and an optional callback to run when the dependency is done
  loading
- `env_path` is a String, a relative path to where the dependencies can be found

## The scripts_to_load object

The scripts to load object can look like this:

<script src="https://gist.github.com/phun-ky/46d49683e9f9aa98ddec.js"></script>

## How to use it

Define your own dependencies as the gist describes it above, then, if you want
to, you can define an event listener to listen to the event fired when all the
dependencies are loaded:

    $(document).one( '<ID to be used for the events fired>:dependencies:loaded', function (){

      // Do stuff here when we have finished loading the dependencies

    });

Then, you pass that object to the `window.loadDeps` function, with required
variables:

    window.loadDeps( '<ID to be used for the events fired>', _scripts_to_load, '<relevant relative path where the script resides>' );

And that's it! You have now implemented your own JavaScript dependency loader
without the use of Require.js!
