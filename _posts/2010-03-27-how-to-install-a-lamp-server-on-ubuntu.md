--- 
layout: post 
title: "How to install a LAMP server on Ubuntu"
description: ""
category: "Archive"
tags: []
---  
I was trying to install a LAMP server locally and after some guides and questions I managed to get it up and running smoothly. How hard is it? Well, it is not that hard, thanks to <a href="https://help.ubuntu.com/community/Tasksel">Tasksel</a> (Note: this will only work from Ubuntu 7.04 Feisty Fawn and above):

	sudo tasksel install lamp-server

## Troubleshooting


The following are some frequently encountered problems when checking the installation of your PHP stack in Ubuntu:



* _The browser shows you a popup asking you to open the file, as if the PHP engine is not recognized._

 There's a problem with your php5-common package. Replace it with php5 and phpmyadmin. To replace php5-common, run the following two commands:


	apt-get --purge remove php5-common


	apt-get install php5 phpmyadmin

## More help?



* <a href="https://help.ubuntu.com/community/ApacheMySQLPHP#After%20installing%20PHP">ApacheMySQLPHP</a>
* <a href="http://netbeans.org/kb/docs/php/configure-php-environment-ubuntu.html#lamp">Configuring the PHP Development Environment in Linux Ubuntu</a>


## What is LAMP?

From <a href="http://en.wikipedia.org/wiki/LAMP_%28software_bundle%29">Wikipedia</a>:


> LAMP is an acronym for a solution stack of free, open source software, originally coined from the first letters of Linux (operating system), Apache HTTP Server, MySQL (database software), and PHP, Python or Perl (scripting language), principal components to build a viable general purpose web server.


