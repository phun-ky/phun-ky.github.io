--- 
layout: post 
title: "Fix for "Failed to load the NVIDIA kernel module" on Ubuntu"
description: ""
category: "Archive"
tags: []
---
{% include JB/setup %}  
I struggled with my NVIDIA drivers after a kernel update, and no matter what I tried; I edited my xorg.conf, reinstalled drivers from source or with apt-get, nothing worked, until I found a great solution to this error (you can maybe fix this with similar errors):



<pre class="brush: bash">"(EE) NVIDIA(0): Failed to load the NVIDIA kernel module!"</pre>

So, the fix:



First, go here: <a href="http://www.nvidia.com/Download/index.aspx?lang=en-us">http://www.nvidia.com/Download/index.aspx?lang=en-us</a> to get the latest NVIDIA drivers. Install them as root after you've reset x (ctrl+alt+backspace). Then reboot.



Then remove the xorg.conf that the NVIDIA install created and start X with default options.



Edit /etc/modprobe.d/lrm-video with a text editor and put a # in front of the line containing something like

<pre class="brush: bash">install nvidia /sbin/lrm-video nvidia $CMDLINE_OPTS</pre>

There might be one or more lines like that, so it could look like this:

<pre class="brush: bash">
# Make nvidia/nvidia_legacy and fglrx use /sbin/lrm-video to load
install fglrx /sbin/lrm-video fglrx $CMDLINE_OPTS
#install nvidia /sbin/lrm-video nvidia $CMDLINE_OPTS
#install nvidia_legacy /sbin/lrm-video nvidia_legacy $CMDLINE_OPTS
#install nvidia_new /sbin/lrm-video nvidia_new $CMDLINE_OPTS'
</pre>
Add the line:

<pre class="brush: bash">nvidia</pre>

to /etc/modules file. This file contains the list of kernel modules that should be always loaded when your machine boots. After you've done this, run:

<pre class="brush: bash">sudo nvidia-xconfig</pre>

to make a new xorg.conf and restart X. Good luck!