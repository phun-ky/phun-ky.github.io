--- 
layout: post 
title: "how to remove empty lines in vi/vim"
description: ""
category: "Archive"
tags: []
---
{% include JB/setup %}  
Some simply ways to remove empty lines in a file:

<pre class="brush: bash">
# Use this sub:
:%s/^\n// 
# Or this:
:g/^$/d
# Or this:
:g/^\s*$/d 
</pre>