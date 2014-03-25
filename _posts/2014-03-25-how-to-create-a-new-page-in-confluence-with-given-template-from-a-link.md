---
layout: post
title: "How to create a new page in Atlassian Confluence with given template from a link"
description: ""
category: "How-to"
tags: [how-to, template, confluence]
---
{% include JB/setup %}
## The issue
I was trying to solve an issue, amidst the documentation haze for my latest applications, to create a new page with a given template from a link, to spare me the hazzle of doing it "manually".

## Investigation
I did my homework and tried to find other similar issues, when [I found this issue at Atlassian Answers](https://answers.atlassian.com/questions/80549/is-it-possible-to-link-to-a-not-already-created-undefined-page-in-confluence-from-an-external-site). The answers there did not help, but one of the commenters pointed out you can manipulate the query string to resolve the issue. The problem was that the commenter did not use the correct URL. 

## The solution

I inspected the URL that created a new page when you select a template, and found this solution:

    http://domain.com/pages/createpage.action?spaceKey=<spacekey>&fromPageId=<parent page id>&templateId=<template id>


## Sugar

If you want to automatically locate all undefined links and inject the correct URL for creating a new page with a specified template, you can do something like this:

<script src="https://gist.github.com/phun-ky/78fc3e243527b01bec59.js"></script>

Add this code snippet in a HTML code block addon on the page where you want to alter the links.


Happy documenting!