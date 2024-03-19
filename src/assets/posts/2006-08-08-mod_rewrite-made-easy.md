---
layout: post

route: /2006/08/08/modrewrite-made-easy
title: 'mod_rewrite made easy'
description:
  'Lately I have been trying to make all my links to look so pretty that even
  art critics could say something nice about them, and to make it easier for
  visitors to remember my links. And believe me, it is actually easier than it
  seems.'
category: 'How-to'
tags: [how-to, mod_rewrite, php, semantic urls]
---

How? Well, the solution to this problem was the use of
[mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html).

I am not going to explain to you what it is in depth, but basically, it rewrites
URI's and also makes it easier for search engines to find your pages. A little
tutorial follows.

Instead of using long useless links like:

```uri
https://www.phun-ky.net/showpost.php?year=2006&month=08&slug=mod_rewrite_easy
```

You can make it look so much better with mod_rewrite, like this:

```uri
https://phun-ky.net/2006/08/mod_rewrite_easy
```

Just by adding these lines in a `.htaccess`-file:

```apacheconf
RewriteEngine On
RewriteRule ([0-9]+)/([0-9]+)/(.*)$ showpost.php?year=$1&month=$2&slug=$3
Options +FollowSymlinks
RewriteCond %{http_host} ^www\.phun-ky\.net [nc]
RewriteRule ^(.*)$ https://phun-ky.net/$1 [r=301,nc,L]
```

If this was hard or you want to learn more, check out the cheat sheet posted
with this post or read this
[.htaccess](http://corz.org/serv/tricks/htaccess2.php) tips and tricks.
