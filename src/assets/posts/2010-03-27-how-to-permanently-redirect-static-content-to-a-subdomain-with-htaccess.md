---
layout: post

route: /2010/03/27/how-to-permanently-redirect-static-content-to-a-subdomain-with-htaccess
title:
  'How to permanently redirect static content to a subdomain with .htaccess'
description: 'I wanted to move all my static files to a sub domain to comply with good
standards and use a Content Delivery Network. I set up a sub domain and moved
all the images, style sheets and javascript files to this subdomain. To play
nice with the search engines and cached pages, I needed to set up a permanently
redirect (301) so the content would not get lost'
category: 'How-to'
tags: ['apache', 'htaccess', 'cdn']
---

Put this in a `.htaccess`-file in your top www dir:

```apacheconf
RewriteRule ^img/(.*)$ http://cdn.example.com/img/$1 [R=301] 
RewriteRule ^css/(.*)$ http://cdn.example.com/css/$1 [R=301]
RewriteRule ^js/(.*)$ http://cdn.example.com/js/$1 [R=301,L]
```
