--- 
layout: post 
title: "ubuntu studio info and torrents"
description: ""
category: "Archive"
tags: []
---  
I've been counting the days now, to the day when I am throwing out Windows XP Professional on my stationary computer and installing a Linux distro.
 The day has come, right now, this very instant I am downloading the Ubuntu Studio Feisty Fawn 7.04. I Will let you know when the install fest starts, most likely after dinner, and will update you on the WTF's and the "oooooh" about it all.
 The <a href="http://www.ubuntustudio.com/home">Ubuntustudio.com</a> <br/> server is on and off, so thanks to some digging I found some other torrents to make use of:
 
<a href="http://ubuntustudio.org/files/UbuntuStudio_7.04.torrent">http://ubuntustudio.org/files/UbuntuStudio_7.04.torrent</a>
 
<a href="http://fluxbuntu.org/UbuntuStudio_7.04.torrent">http://fluxbuntu.org/UbuntuStudio_7.04.torrent</a>
 
<a href="http://www.ubuntugids.be/UbuntuStudio_7.04.torrent">http://www.ubuntugids.be/UbuntuStudio_7.04.torrent</a>
 
<a href="http://www.velmont.net/UbuntuStudio_7.04.torrent">http://www.velmont.net/UbuntuStudio_7.04.torrent</a>
 
 And if you want to add the Ubuntu Studio repo:
 
<pre class="brush: bash">
sudo su -c 'echo deb
http://archive.ubuntustudio.org/ubuntustudio feisty main >> /etc/apt/sources.list'
wget -q http://archive.ubuntustudio.org/ubuntustudio.gpg -O- | sudo apt-key add - && sudo apt-get update
</pre>
## Update: Direct iso link

<a href="http://www.favpocket.com/shares/iso/ubuntu/UbuntuStudio%207.04/">http://www.favpocket.com/shares/iso/ubuntu/UbuntuStudio 7.04/</a>. Stay tuned for the install, step by step!
