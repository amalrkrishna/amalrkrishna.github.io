---
layout: post
title:  Installing Voyage 0.9.2 Linux in ALIX
tags:
- Linux
- Voyage
- ALIX
- Installation
---

<img src="https://s12.postimg.io/xcbdvpb59/voyage.png" alt="Installing Voyage 0.9.2 Linux in ALIX" width="100%">

<p align="justify">Voyage Linux is derived from Debian to run on an x86 embedded platforms such as PC Engines ALIX. Start the ALIX board with a bootable Voyage Linux USB drive.</p>

<ol>
<li>Installation steps</li>

{% highlight css %}
$ mkdir /root/tmp
$ mount -o loop /lib/live/mount/medium/live/filesystem.squashfs /root/tmp
$ mkdir /root/cf
$ /usr/local/sbin/format-cf.sh /dev/sda
$ /usr/local/sbin/voyage.update
{% endhighlight %}

<p align="justify">set /root/tmp as the distribution directory,7 – ALIX as target profile, /dev/sda as which device accesses the target disk, /root/cf as the mount point, 2-console interface and give default option for rest of the steps. Exit and reboot after installation. Finally, Login as user root with root password voyage.</p>

<li>Connecting to Wireless Access Point</li>
{% highlight css %}
$ remountrw
$ ifconfig wlan0 down
$ ifconfig wlan0 essid access-point-name
$ ifconfig wlan0 up
$ dhclient wlan0
{% endhighlight %}

<p align="justify">If wired LAN is available it can be used as an alternative.</p>

<li>Updating the OS</li>
{% highlight css %}
$ date -s “mm/dd/yyyy hh:mm”
$ apt-get update
$ apt-get upgrade
{% endhighlight %}

<li>Installing Dependencies and Build Tools</li>
{% highlight css %}
$ apt-get install build-essential bison flex netcat vim git
{% endhighlight %}

</ol> 
