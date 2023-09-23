---
layout: post

route: /2010/08/31/how-to-override-css-with-javascript
title: 'How to override CSS with JavaScript'
description: ''
category: 'Archive'
tags: [how-to, javascript, css, style]
---

A pretty nice snippet that I use all the time to override CSS set with the
!important switch.

```javascript
function addNewStyle(newStyle) {
  var styleElement = document.getElementById('styles_js');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = 'styles_js';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  styleElement.appendChild(document.createTextNode(newStyle));
}
```
