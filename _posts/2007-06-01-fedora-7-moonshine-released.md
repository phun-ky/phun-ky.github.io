--- 
layout: post 
title: "fedora 7 moonshine released!"
description: ""
category: "Archive"
tags: []
---
{% include JB/setup %}  
The Fedora project has released their latest distro yesterday, Fedora 7 (Moonshine). Some new features comes bundlet with it, and I would like to mention some features that are worth taking a notice of:
 ### System Level Changes
 - Fedora now integrates the experimental nouveau driver within Xorg and the kernel. The nouveau driver, which is disabled by default in this release, aims to provide free and open source 3D drivers for nVidia cards. End users are asked to provide feedback on this feature to the project developers, to further the goal of having fully functional 3D drivers by default.
 - This is the first release to include support for Sony Playstation 3.
 - This release includes the 2.6.21 based kernel which integrates Kernel-based Virtual Machine (KVM) technology with Fedora's graphical virt-manager and command-line virsh tools. KVM provides a hardware accelerated virtualization solution, and users have a choice between KVM and Xen, along with Qemu, in this release. The kernel included in this release also has support for VMWare's VMI interface.
 - Display devices can be hot plugged and work automatically, thanks to the inclusion of Xorg Server 1.3. 
 For the full list of features, follow <a href="http://fedoraproject.org/wiki/F7ReleaseSummary">this link to fedoraproject.org</a> <br/>.
