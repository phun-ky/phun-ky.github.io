--- 
layout: post 
title: "How to override CSS with JavaScript"
description: ""
category: "Archive"
tags: []
---  
A pretty nice snippet that I use all the time to override CSS set with the !important switch.

<pre>
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
</pre>