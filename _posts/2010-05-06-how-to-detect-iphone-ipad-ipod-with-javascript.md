--- 
layout: post 
title: "How to detect iPhone, iPad, iPod with JavaScript"
description: ""
category: "Archive"
tags: []
---
{% include JB/setup %}  
Just a very quick and easy way to detect Apple's devices:


<pre class="brush: javascript"> 
var isiPad   = navigator.userAgent.match(/iPad/i) != null;   
var isiPhone = navigator.userAgent.match(/iPhone/i) != null;   
var isiPod = navigator.userAgent.match(/iPod/i) != null;</pre>