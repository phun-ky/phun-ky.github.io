---
layout: post
title: "How to inject proper page styling, with indented chapers, with jQuery and CSS"
description: ""
category: "How-to"
tags: [how-to, javascript, jquery, drupal, chapter-styling, css, DOM]
---
{% include JB/setup %}
A friend of mine had an issue with a [Drupal](https://drupal.org/) theme page, where he couldn"t change the HTML structure to fit his needs with the indented chapter styling. He got it fixed initially by using CSS selectors that increased in size for each chapter, a method that "worked", but was not very efficient:

<script src="https://gist.github.com/phun-ky/7e7c5dfd64a847ed6489.js"></script>

I found a better solution, by manipulating the DOM with [jQuery](http://jquery.com/): 

<p data-height="500" data-theme-id="5306" data-slug-hash="xKqlu" data-default-tab="result" class="codepen">

See the Pen <a href="http://codepen.io/phun-ky/pen/xKqlu/">How to inject proper paper styling to document</a> by Alexander Vassbotn Røyne-Helgesen (<a href="http://codepen.io/phun-ky">@phun-ky</a>) on <a href="http://codepen.io">CodePen</a>.

</p>

<script async="async" src="//codepen.io/assets/embed/ei.js"></script>