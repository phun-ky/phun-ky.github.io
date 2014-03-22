--- 
layout: post 
title: "how to put a gravatar on your blog"
description: ""
category: "Archive"
tags: []
---  
Gravatar, what is it? Gravatar stands for Globally Recognized Avatars. A gravatar is an avatar that's linked with your email adress. This avatar can be used on all sites that support Gravatar. Gravatar is as simple as it's genious. Go register on (gravatar.com)[http://www.gravatar.com] to get your Gravatar today!

Once you registered, you can test your gravatar under this article by using the comments!

## How do I get gravatars on my weblog?
Setting up gravatars on your weblog is easy, you don't even need an account! Plugins are available for leading weblog software, and our tutorials will have you running gravatars in no time. To request a gravatar from our servers, you simply add an image to your comments area with an "src" attribute that points to our gravatar image generator and includes an MD5 hash of the commenter's email address.

## So, how is this actually done?
It's done like this (in PHP):

	$default = "http://your.domain.com/imagefolder/default_gravatar.png";
	$size = 50;
	$grav_url =   "http://www.gravatar.com/avatar.php?gravatar_id=".md5($email)."&amp;default=".urlencode($default)."&amp;size=".$size;
