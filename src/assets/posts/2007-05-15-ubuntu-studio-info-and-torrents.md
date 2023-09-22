---
layout: post

route: /2007/05/15/ubuntu-studio-info-and-torrents
title: 'Ubuntu studio info and torrents'
description: ''
category: 'Archive'
tags: [linux, ubuntu, ubuntu studio]
---

I've been counting the days now, to the day when I am throwing out Windows XP
Professional on my stationary computer and installing a Linux distro.

<img src="/img/blog/imge8e06119c45046979746fd0f269f22a8.png" class="img-responsive img-rounded img-thumbnail"/>

The day has come, right now, this very instant I am downloading the Ubuntu
Studio Feisty Fawn 7.04. I Will let you know when the install fest starts, most
likely after dinner, and will update you on the WTF's and the "oooooh" about it
all.

The
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.ubuntustudio.com/home">Ubuntustudio.com</a>
server is on and off, so thanks to some digging I found some other torrents to
make use of:

- <a class="ph" target="_blank" rel="noopener noreferrer" href="http://ubuntustudio.org/files/UbuntuStudio_7.04.torrent">http://ubuntustudio.org/files/UbuntuStudio_7.04.torrent</a>
- <a class="ph" target="_blank" rel="noopener noreferrer" href="http://fluxbuntu.org/UbuntuStudio_7.04.torrent">http://fluxbuntu.org/UbuntuStudio_7.04.torrent</a>
- <a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.ubuntugids.be/UbuntuStudio_7.04.torrent">http://www.ubuntugids.be/UbuntuStudio_7.04.torrent</a>
- <a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.velmont.net/UbuntuStudio_7.04.torrent">http://www.velmont.net/UbuntuStudio_7.04.torrent</a>

And if you want to add the Ubuntu Studio repo:

    sudo su -c 'echo deb
    http://archive.ubuntustudio.org/ubuntustudio feisty main >> /etc/apt/sources.list'
    wget -q http://archive.ubuntustudio.org/ubuntustudio.gpg -O- | sudo apt-key add - && sudo apt-get update

## Update: Direct iso link

<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.favpocket.com/shares/iso/ubuntu/UbuntuStudio%207.04/">http://www.favpocket.com/shares/iso/ubuntu/UbuntuStudio
7.04/</a>. Stay tuned for the install, step by step!
