---
layout: post
title: "How to create a new page in confluence with given template from a link"
description: ""
category: "How-to"
tags: [how-to, template, confluence]
---
{% include JB/setup %}
I was trying to solve an issue, amidst the documentation haze for my latest applications, to create a new page with a given template from a link, to spare me the hazzle of doing it "manually".

I did my homework and tried to find other similar issues, when [I found this issue at Atlassian Answers](https://answers.atlassian.com/questions/80549/is-it-possible-to-link-to-a-not-already-created-undefined-page-in-confluence-from-an-external-site). The answers there did not help, but one of the commenters pointed out you can manipulate the query string to resolve the issue. The problem was that the commenter did not use the correct URL. 

I inspected the URL that created a new page when you select a template, and found this solution:

  http://domain.com/pages/createpage.action?spaceKey=<spacekey>&fromPageId=<parent page id>&templateId=<template id>

Happy documenting!