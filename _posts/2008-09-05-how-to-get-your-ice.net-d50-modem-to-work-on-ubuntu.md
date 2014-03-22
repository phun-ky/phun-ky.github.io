--- 
layout: post 
title: "how to get your ice.net d50 modem to work on ubuntu"
description: ""
category: "Archive"
tags: []
---  
A quick little how to on how to get your d50 modem to work on Ubuntu. I used the d50 on my laptop my entire summer vacation and it worked perfectly!

## The basic setup

* Install wvdial if you don't got it already, it's vital for this how to:

	sudo apt-get install wvdial

* Unpack your d50 modem and insert it into a free USB slot..
* The modem is also identified as a normal USB stick, where all the drivers and manuals are present
* Open up a terminal window and type:

	cd /media/NMT_D50v2301/Linux/

* And then type:

	sudo ./RDEVCHG

* You will probably get a message like "Switchmode Failed" or "Switchmode Success" or something like "Aborted (core dumped)". Even if I got these errors, the modem was installed
* Now, type:

	ls -la /dev/ttyACM*

* If you get something that looks like this, you've activated your modem:

	crw-rw---- 1 root dialout 166, 0 2008-04-23 09:31 /dev/ttyACM0

* Copy the execute.sh located on the d50 USB stick under the Linux folder to you home directory
* Edit the execute.sh so it looks something like this and then you are done with the basics:

	echo "--&gt; D-50 Linux Connection\n"
	rm -rf D-50config wvdialconf_log 
	wvdialconf D-50config &gt; wvdialconf_log
	echo "Carrier Check= no\nStupid Mode= yes" &gt;&gt; D-50config
	echo "Phone = #777
	Username = cdma
	Password = cdma" &gt;&gt; D-50config
	rm -rf wvdialconf_log
	echo "--&gt; Dialing...\n"
	wvdial --config D-50config

## Make a shortcut

To do this manually is kind of a bore, so I made this executable and made a shortcut to it on my desktop:

	cd /media/NMT_D50v2303R2/Linux
	sudo ./RDEVCHG
	#path to your execute.sh file, in this case bin/:
	cd /home/&lt;yourusername&gt;/bin/
	sudo sh execute.sh

In the shortcut command field, just enter:

	sudo sh /home/&lt;yourusername&gt;/D-50.sh
