--- 
layout: post 
title: "xhtml javascript flash validated?"
description: ""
category: "Archive"
tags: []
---  
<p>I finally found a way to get my sites containing flash, xhtml 1.0 validated! I have tried several different quirks and tricks to make the flash validated, with no real success - the Flash Satay example from an article posted at <a href="http://www.alistapart.com/articles/flashsatay/">A list apart</a> <img src="http://cdn.umedia.no/img/flag/us.png" alt="us flag"/> and  the default Adobe embed to mention a few.</p> <p>The solution was SWFObject from <a href="http://blog.deconcept.com/swfobject/">deconcept.com</a> <img src="http://cdn.umedia.no/img/flag/us.png" alt="us flag"/>! To say it directly:</p> 
<blockquote>SWFObject is a small Javascript file used for embedding Adobe Flash content. The script can detect the Flash plug-in in all major web browsers (on Mac and PC) and is designed to make embedding Flash movies as easy as possible.</blockquote>
<p>To mention a tip: you can use the noscript tag with the js script to include an image incase the browser cant read flash OR javascript.</p>
<h3>A little update</h3>
<p>Robert Nyman has <a href="http://www.robertnyman.com/2007/02/01/how-to-write-valid-htmlxhtml-code-to-include-flash/">written another way</a> <img src="http://cdn.umedia.no/img/flag/us.png" alt="us flag"/> to do this, have not tested it yet, but check it out.</p>