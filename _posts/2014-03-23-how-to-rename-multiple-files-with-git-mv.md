---
layout: post
title: "How to rename multiple files with git mv"
description: ""
category: "How-to"
tags: [git, rename, how-to]
---
{% include JB/setup %}
I needed a solution where I had to rename multiple files with git mv, instead of renaming every file first, then use `git rm` and then `git add`. Came across a solution that I've tweaked to fit my need:

<script src="https://gist.github.com/phun-ky/8726964.js"></script>