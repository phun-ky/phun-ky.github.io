---
layout: post
title: "How to fix 'Failed to build gem native extension' when installing jekyll"
description: ""
category: "How-to"
tags: [how-to, gem, ruby, error, apt-get, ubuntu]
---
{% include JB/setup %}

Came across this error when I tried to install jekyll on my ubuntu laptop for testing out jekyll bootstrap locally:

	sudo gem install jekyll 
	Building native extensions.  This could take a while...
	ERROR:  Error installing jekyll:
		ERROR: Failed to build gem native extension.

	        /usr/bin/ruby1.9.1 extconf.rb
	/usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require': cannot load such file -- mkmf (LoadError)
		from /usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
		from extconf.rb:1:in `<main>'


	Gem files will remain installed in /var/lib/gems/1.9.1/gems/fast-stemmer-1.0.2 for inspection.
	Results logged to /var/lib/gems/1.9.1/gems/fast-stemmer-1.0.2/ext/gem_make.out

And this is how you fix it:

`$ sudo apt-get install ruby1.9.1-dev`
