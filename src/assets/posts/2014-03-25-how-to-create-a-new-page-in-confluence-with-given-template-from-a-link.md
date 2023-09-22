---
route: /2014/03/25/how-to-create-a-new-page-in-atlassian-confluence-with-given-template-from-a-link
title:
  'How to create a new page in Atlassian Confluence with given template from a
  link'
description:
  'I was trying to solve an issue, amidst the documentation haze for my latest
  applications, to create a new page with a given template from a link, to spare
  me the hazzle of doing it "manually".'
category: 'How-to'
image: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/500px-Atlassian-logo.svg.png
tags: [how-to, template, confluence]
---

## The issue

<figure class="ph">
  <img alt="The Atlassian Logo" aria-describedby="atlassian" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/500px-Atlassian-logo.svg.png" class="img-responsive img-rounded img-thumbnail"/>
  <figcaption class="ph">
    <small class="ph">
      "<a class="ph" id="atlassian" href="https://commons.wikimedia.org/wiki/File:Atlassian-logo.svg#/media/File:Atlassian-logo.svg">Atlassian-logo</a>" by <a rel="nofollow" class="ph external text" href="https://www.atlassian.com">www.atlassian.com</a> - <a rel="nofollow" class="ph external free" href="https://www.atlassian.com/ko/dms/wac/images/press/Resources/presskits/HipChat_Fast_Facts.pdf">https://www.atlassian.com/ko/dms/wac/images/press/Resources/presskits/HipChat_Fast_Facts.pdf</a>. Licensed under Public Domain via <a class="ph" href="//commons.wikimedia.org/wiki/">Wikimedia Commons</a>. <strong class="ph">Figure 1</strong>
    </small>
  </figcaption>
</figure>

<p class="ph lead">
  I was trying to solve an issue, amidst the documentation haze for my latest applications, to create a new page with a given template from a link, to spare me the hazzle of doing it "manually".
</p>

## Investigation

I did my homework and tried to find other similar issues, when
[I found this issue at Atlassian Answers](https://answers.atlassian.com/questions/80549/is-it-possible-to-link-to-a-not-already-created-undefined-page-in-confluence-from-an-external-site).
The answers there did not help, but one of the commenters pointed out you can
manipulate the query string to resolve the issue. The problem was that the
commenter did not use the correct URL.

## The solution

I inspected the URL that created a new page when you select a template, and
found this solution:

    http://domain.com/pages/createpage-entervariables.action?spaceKey=<spacekey>&fromPageId=<parent page id>&templateId=<template id>

This should also work:

    http://domain.com/?spaceKey=<spacekey>&templateId=<template id>&newSpaceKey=<spacekey>

## Sugar

If you want to automatically locate all undefined links and inject the correct
URL for creating a new page with a specified template, you can do something like
this:

<script src="https://gist.github.com/phun-ky/78fc3e243527b01bec59.js"></script>

Add this code snippet in a HTML code block addon on the page where you want to
alter the links.

Happy documenting!
