---
layout: post

route: /2010/05/06/how-to-detect-iphone-ipad-ipod-with-javascript
title: 'How to detect iPhone, iPad, iPod with JavaScript'
category: 'Archive'
tags: [how-to, javascript, iphone, ipad, ipod, detect]
---

Just a very quick and easy way to detect Apple's devices:

```javascript
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
var isiPod = navigator.userAgent.match(/iPod/i) != null;
```
