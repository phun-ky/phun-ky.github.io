---
layout: post

route: /2008/04/03/how-to-speed-up-your-site
title: 'How to speed up your site'
description: ''
category: 'Archive'
tags: [tweaking, programming, tuning, how-to]
---

How can you speed up your site on an Apache PHP server? Piece of cake if you ask
me. How simple is it? With some copy and paste jobs from my article you can
speed up your site significally.

Follow these simple and easy steps to make your site faster today!

## Step 1

Always give the browser an opportunity to download gzip (compressed) versions of
the content. To do this, here's an example that I did with my javascript files:
(As a bonus, we're setting an expires header on the js files aswell!)

Put this code in a .htaccess file in your javascript directory ( I assume you
have one, if not, just put it in the folder that you have your .js files in):

    AddHandler application/x-httpd-php .js
    php_value auto_prepend_file ../gzip/gzip-js.php
    php_flag zlib.output_compression On

Then, make the gzip-js.php file in the /gzip/ directory you're making to do
this, and paste this php code in it: (assuming you have a php server)

## Step 2

    header("Content-type: text/javascript; charset: UTF-8");
    header("Cache-Control: must-revalidate");
    $offset = 60 * 60 ;
    $ExpStr = "Expires: " .
    gmdate("D, d M Y H:i:s",
    time() + $offset) . " GMT";
    header($ExpStr);

There you've done it! Next step: set an expires header to the rest of your
content.

## Step 3

A first-time visitor to your page will make several HTTP requests to download
all your sites files, but using the Expires header you make those files
cacheable. This avoids unnecessary HTTP requests on subsequent page views.
Expires headers should be used on all components including scripts, stylesheets,
and Flash components.

Put these lines of code in your root .htaccess file.

    ExpiresActive On
    ExpiresDefault "access plus 48 hours"
    ExpiresByType application/javascript A172800
    ExpiresByType application/x-javascript A172800
    ExpiresByType text/javascript A172800
    ExpiresByType text/html A172800
    ExpiresByType text/xml A172800
    ExpiresByType text/css A172800
    ExpiresByType text/plain A172800
    ExpiresByType image/gif A172800
    ExpiresByType image/jpg A172800
    ExpiresByType image/jpeg A172800
    ExpiresByType image/png A172800
    ExpiresByType application/x-shockwave-flash A172800

172800 == 48 hours if my math is correct.

Or put this in your httpd.conf file (preferable).

    <FilesMatch "\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$">
    Header set Expires "Thu, 15 Apr 2010 20:00:00 GMT"
    </FilesMatch>

Remember these .htaccess tips are for apache servers only, and you may want to
install mod_header and mod_expires on your web server.
