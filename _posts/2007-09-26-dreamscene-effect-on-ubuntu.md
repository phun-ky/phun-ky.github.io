--- 
layout: post 
title: "dreamscene effect on ubuntu"
description: ""
category: "Archive"
tags: []
---
{% include JB/setup %}  
Stumbled over a great effect for my gnome desktop on Ubuntu Studio, a Dreamscene look-a-like effect. The best thing was that I only needed 2 lines in the console for making this effect!

What is Windows Dreamscene? Windows Dreamscene is one of the extras Microsoft has provided for Windows Vista Ultimate users. Windows DreamScene is a utility that allows videos and other optimized animations to be used as desktop wallpapers. It is one of the Windows Ultimate Extras. Prior to its official announcement, DreamScene was rumored to be in creation under the names Motion Desktop and Borealis. Enough facts, this is how you do it:

Note: You can only do this in a Gnome GUI! Nautilus draws the desktop (including the icons) for you in Gnome by default. You have to tell it to stop doing that, so we can do the matrix animation in its place. Nautilus can be configured using gconf.

	gconftool-2 --type bool --set /apps/nautilus/preferences/show_desktop false

Now that you have the desktop to ourselves, ask xscreensaver 'glmatrix' to start drawing itself in the desktop window ('root' window).

	/usr/lib/xscreensaver/glmatrix -root

If you want the animation every time you log in, open "~/.config/autostart/glmatrix.desktop" in your text editor and paste the following:
	
	[Desktop Entry]
	Version=1.0
	Encoding=UTF-8
	Name=No name
	Name[en_IN]=Desktop matrix
	Exec=/usr/lib/xscreensaver/glmatrix -root
	X-GNOME-Autostart-enabled=true

If you are fed up with playing around and want your old desktop back, use this line in the terminal:
	
	gconftool-2 --type bool --set /apps/nautilus/preferences/show_desktop true && nautilus

Sources: <a href="http://www.winmatrix.com">winmatrix.com</a> <br/> (m.sudoku - "DreamScene for Linux: Screensaver as Desktop Wallpaper"), <a href="http://www.wikipedia.org">wikipedia.org</a> <br/> (dreamscene)
