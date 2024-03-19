---
layout: post

route: /2010/03/15/how-to-add-icons-to-links-with-css
title: 'How to add icons to links with css'
description: 'Have you ever thought your links looked boring and that they needed the little
extra? Well, fear not, for I have the solution!'
category: 'How-to'
tags: ['css']
---

## The CSS

Put this in your css file, preferably after your global CSS notation for links.
I have added the most used icons/link types, so if you feel the need to update
it, please do. Make sure you have the correct icons before you test it ;)

```css
a[href^='https:'] {
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/page_link.png) center right no-repeat;
}

a[href^="https://twitter"]
{
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/twitter_16.png) center right no-repeat;
}

a[href^="https://qik"]
{
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/qik_16.png) center right no-repeat;
}

a[href^="https://qik"]
{
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/qik_16.png) center right no-repeat;
}

a[href$='.rss'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/rss_16.png) center left no-repeat;
}

a[href^="https://feeds."]
{
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/rss_16.png) center left no-repeat;
}

a[href^="https://digg"]
{
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/digg_16.png) center right no-repeat;
}

a[href^="https://facebook"]
{
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/facebook_16.png) center right no-repeat;
}

a[href^="https://flickr"]
{
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/flickr_16.png) center right no-repeat;
}

a[href^='https:'] {
  display: inline-block;
  padding-right: 20px;
  background: transparent url(/img/icons/page_white_key.png) center right
    no-repeat;
}

a[href^='mailto:'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/email.png) center left no-repeat;
}

a[href$='.pdf'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_acrobat.png) center left
    no-repeat;
}

a[href$='.jpg'] {
  background: none;
}

a[href$='.iso'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_dvd.png) center left
    no-repeat;
}

a[href$='.md5'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_key.png) center left
    no-repeat;
}

a[href$='.swf'],
a[href$='.fla'],
a[href$='.swd'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_flash.png) center left
    no-repeat;
}

a[href$='.xls'],
a[href$='.csv'],
a[href$='.xlt'],
a[href$='.xlw'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_excel.png) center left
    no-repeat;
}

a[href$='.ppt'],
a[href$='.pps'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_powerpoint.gif) center left
    no-repeat;
}

a[href$='.doc'],
a[href$='.rtf'],
a[href$='.txt'],
a[href$='.wps'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_word.png) center left
    no-repeat;
}

a[href$='.zip'],
a[href$='.gzip'],
a[href$='.rar'] {
  display: inline-block;
  padding-left: 20px;
  line-height: 18px;
  background: transparent url(/img/icons/page_white_compress.png) center left
    no-repeat;
}
```

## Recommended Icons to use

I recommend the
<a class="ph" target="_blank" rel="noopener noreferrer" href="https://www.famfamfam.com/lab/icons/silk/">Silk
Icon set from famfamfam.com</a>. They are free to use for non-profit use.
