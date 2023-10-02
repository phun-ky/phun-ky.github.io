---
layout: post

route: /2007/02/09/xhtml-javascript-flash-validated
title: 'XHTML JavaScript flash validated?'
category: 'Archive'
tags: [programming, scripting, xhtml, javascript, flash, validation]
---

I finally found a way to get my sites containing flash, xhtml 1.0 validated! I
have tried several different quirks and tricks to make the flash validated, with
no real success - the Flash Satay example from an article posted at
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.alistapart.com/articles/flashsatay/">A
list apart</a> and the default Adobe embed to mention a few.

The solution was SWFObject from
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://blog.deconcept.com/swfobject/">deconcept.com</a>!
To say it directly:

> SWFObject is a small Javascript file used for embedding Adobe Flash content.
> The script can detect the Flash plug-in in all major web browsers (on Mac and
> PC) and is designed to make embedding Flash movies as easy as possible.

To mention a tip: you can use the noscript tag with the js script to include an
image incase the browser cant read flash OR javascript.

### A little update

Robert Nyman has
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.robertnyman.com/2007/02/01/how-to-write-valid-htmlxhtml-code-to-include-flash/">written
another way</a> to do this, have not tested it yet, but check it out.
