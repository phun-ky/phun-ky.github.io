---
layout: post

route: /2008/09/05/how-to-flash-your-bios-from-linux-with-no-doswindows-or-no-floppy-drive
title:
  'how to flash your bios from linux with no dos/windows or no floppy drive'
description: ''
category: 'Archive'
tags: []
---

This is a simple how to that I picked from the web, I take no credit from this
guide, give the credit to the guys
<a class="ph" target="_blank" rel="noopener noreferrer" href="http://www.linuxinsight.com/how-to-flash-motherboard-bios-from-linux-no-dos-windows-no-floppy-drive.html">from
LinuxInsight.com</a> that wrote it!

## Step 1: Download FreeDOS boot disk floppy image

FreeDOS, a free DOS-compatible operating system, is up to the challenge, no need
for proprietary DOS versions. So, all you need is a bootable floppy disk image
with FreeDOS kernel on it. We are fortunate that guys at FDOS site have prepared
one suitable for us. Use the OEM Bootdisk version, the one with just kernel and
command.com, because it leaves more free space on disk for the flash utility and
new BIOS image. You can also find a local copy of this image attached at the end
of this article. After you download the image, you need to decompress it. In
other words:

<pre class="brush: bash">
wget http://www.fdos.org/bootdisks/autogen/FDOEM.144.gz
gunzip FDOEM.144.gz
</pre>

## Step 2: Copy your BIOS flash utility and new BIOS image to the mounted floppy disk image

Requirement for this step is that you have support for the vfat and loop file
systems in the kernel. Or you can have those features compiled as modules. In
the latter case, load the modules before the next step, like this.

<pre class="brush: html">
modprobe vfat
modprobe loop
</pre>

Consult /proc/fileystems to see if you have the needed file systems supported.
If you do, you should be able to "loop mount" the floppy disk image to some
temporary path:

<pre class="brush: html">
mkdir /tmp/floppy
mount -t vfat -o loop FDOEM.144 /tmp/floppy
</pre>

If the mount went without errors, copy BIOS flash utility and new BIOS image to
the mounted floppy disk image. You'll probably have to unzip the archive you
downloaded from your motherboard vendor site, to get to those two files. Here's
just an example for a random motherboard (in your case, files will have
different names, of course):

<pre class="brush: html">
unzip 775Dual-VSTA(2.60).zip
Archive: 775Dual-VSTA(2.60).zip
inflating: 75DVSTA2.60
inflating: ASRflash.exe
cp 75DVSTA2.60 ASRflash.exe /tmp/floppy
</pre>

Doublecheck that everything went OK, that those two files weren't too big for
the floppy:

<pre class="brush: html">
Filesystem 1K-blocks Used Available Use% Mounted on
/tmp/FDOEM.144
1424 990 434 70% /tmp/floppy
</pre>

Finally, unmount the floppy disk image:

<pre class="brush: html">
umount /tmp/floppy
</pre>

## Step 3: Burn a bootable CD which will emulate floppy device for us

Next step is to burn the floppy image to a CD/DVD-RW media, but in a way that it
can be booted afterwards. First we need to make a bootable CD image, and then
burn it. Notice that on some modern distributions, cdrecord is renamed to wodim,
and mkisofs to genisoimage, but the parameters below should be the same.

<pre class="brush: html">
mkisofs -o bootcd.iso -b FDOEM.144 FDOEM.144
cdrecord -v bootcd.iso
</pre>

## Step 4: Reboot, flash, reboot, enjoy your new BIOS

Finally reboot your machine, make sure that your CD drive is first in the boot
sequence, and then run your BIOS upgrade procedure when the CD boots.

WARNING: Flashing motherboard BIOS is a dangerous activity that can render your
motherboard inoperable! While the author of this article has successfully run
this procedure many times, your mileage may vary. Be careful!
