--- 
layout: post 
title: "dreamscene effect on ubuntu"
description: ""
category: "Archive"
tags: []
---  
<p>Stumbled over a great effect for my gnome desktop on Ubuntu Studio, a Dreamscene look-a-like effect. The best thing was that I only needed 2 lines in the console for making this effect!</p> 
<p>What is Windows Dreamscene? Windows Dreamscene is one of the extras Microsoft has provided for Windows Vista Ultimate users. 
Windows DreamScene is a utility that allows videos and other optimized animations to be used as desktop wallpapers. It is one of the Windows Ultimate Extras. 
Prior to its official announcement, DreamScene was rumored to be in creation under the names Motion Desktop and Borealis.</p> <p>Enough facts, this is how you do it:</p>
<p>Note: You can only do this in a Gnome GUI!</p> <p>Nautilus draws the desktop (including the icons) for you in Gnome by default. You have to tell it to stop doing that, 
so we can do the matrix animation in its place. Nautilus can be configured using gconf.</p> 
<pre class="brush: bash">gconftool-2 --type bool --set /apps/nautilus/preferences/show_desktop false</pre> 
<p>Now that you have the desktop to ourselves, ask xscreensaver 'glmatrix' to start drawing itself in the desktop window ('root' window).</p> 
<pre class="brush: bash">/usr/lib/xscreensaver/glmatrix -root</pre> 
<p>If you want the animation every time you log in, open "~/.config/autostart/glmatrix.desktop" in your text editor and paste the following:</p> 
<pre class="brush: bash">
[Desktop Entry]
Version=1.0
Encoding=UTF-8
Name=No name
Name[en_IN]=Desktop matrix
Exec=/usr/lib/xscreensaver/glmatrix -root
X-GNOME-Autostart-enabled=true
</pre>
<p>If you are fed up with playing around and want your old desktop back, use this line in the terminal:</p> 
<pre class="brush: bash">
gconftool-2 --type bool --set /apps/nautilus/preferences/show_desktop true && nautilus
</pre>
<p>Sources: <a href="http://www.winmatrix.com">winmatrix.com</a> <img src="http://cdn.umedia.no/img/flag/us.png" alt="us flag"/> (m.sudoku - "DreamScene for Linux: Screensaver as Desktop Wallpaper"), <a href="http://www.wikipedia.org">wikipedia.org</a> <img src="http://cdn.umedia.no/img/flag/us.png" alt="us flag"/> (dreamscene)</p> 