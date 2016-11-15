---
layout: post
title:  Installation and Configuration of OLSR daemon 0.6.5.4
tags:
- Linux
- OLSR
- Daemon
- Installation
---

<p align="justify">OLSR daemon is an ad-hoc wireless mesh routing daemon.The Installation and Configuration of OLSR daemon 0.6.5.4 can be done using the following steps:</p>

<ol>
<li>Download and extract OLSR package</li>

{% highlight css %}
$ wget http://www.olsr.org/releases/0.6/olsrd-0.6.5.4.tar.bz2
$ tar -jxf olsrd-0.6.5.4.tar.bz2
$ cd olsrd-0.6.5.4
{% endhighlight %}

<li>Building and Installation</li>
{% highlight css %}
$ make
$ make install
$ make install install_libs
{% endhighlight %}

<li>Configuring OLSR Daemon</li>
<p align="justify">Before the execution, the configuration file (/etc/olsrd.conf) needs to be modified.</p>
{% highlight css %}
$ line 23 : --"#DebugLevel 1"
$ line 23 : ++"DebugLevel 1"
$ line 232 : --"#PlParam "accept" "0.0.0.0"" 
$ line 232 : ++"PlParam "accept" "0.0.0.0""
$ line 253 : --"#Interface "<OLSRd-Interface1>" "<OLSRd-Interface2>"" 
$ line 253 : ++"Interface "wlan0""
{% endhighlight %}

<li>Running the Application</li>
{% highlight css %}
$ ifconfig wlan0 down
$ iwconfig wlan0 mode-adhoc essid iist_mesh freq 2.427G	
$ ifconfig wlan0 10.10.xx.xx netmask 255.255.255.0 up
$ olsrd -d 1
{% endhighlight %}

</ol> 
