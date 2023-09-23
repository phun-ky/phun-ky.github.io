---
layout: post

route: /2006/08/08/modrewrite-made-easy
title: 'mod_rewrite made easy'
description: ''
category: 'How-to'
tags: [how-to, mod_rewrite, php, semantic urls]
---

Lately I've been trying to make all my links to look so pretty that even art
critics could say something nice about them, and to make it easier for visitors
to remember my links. And believe me, it is actually easier than it seems.

How? Well, the solution to this problem was the use of
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://en.wikipedia.org/wiki/Mod_rewrite">mod_rewrite</a>.

I am not going to explain to you what it is in depth, but basically, it rewrites
URI's and also makes it easier for search engines to find your pages. A little
tutorial follows.

Instead of using long useless links like:

    http://www.phun-ky.net/showpost.php?year=2006&month=08&slug=mod_rewrite_easy

You can make it look so much better with mod_rewrite, like this:

    http://phun-ky.net/2006/08/mod_rewrite_easy

Just by adding these lines in a .htaccess file:

    RewriteEngine On
    RewriteRule ([0-9]+)/([0-9]+)/(.*)$ showpost.php?year=$1&month=$2&slug=$3
    Options +FollowSymlinks
    RewriteCond %{http_host} ^www\.phun-ky\.net [nc]
    RewriteRule ^(.*)$ http://phun-ky.net/$1 [r=301,nc,L]

If this was hard or you want to learn more, check out the cheat sheet posted
with this post or read this
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://corz.org/serv/tricks/htaccess2.php">.htaccess
tips and tricks</a>.
