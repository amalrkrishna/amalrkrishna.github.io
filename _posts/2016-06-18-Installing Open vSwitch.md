---
layout: post
title:  Installation & Configuration of Open vSwitch in Voyage
tags:
- Linux
- Open vSwitch
- Voyage
- Post
---

<p align="justify">Open vSwitch does not come by default in voyage linux. Therefore, it has to be installed manually by the user. For kernel space implementation of Open vSwitch, the kernel modules needs to be installed prior to the Open vSwitch installation.</p>

<ol>
<li>Installing Dependencies</li>

{% highlight css %}
$ apt-get install python-all libc-dev perl libtool kernel-package libssl-dev
{% endhighlight %}

<li>Downloading and Extracting Open vSwitch 2.3.1</li>
{% highlight css %}
$ wget http://openvswitch.org/releases/openvswitch-2.3.1.tar.gz
$ tar -zxf openvswitch-2.3.1.tar.gz
$ cp -r openvswitch-2.3.1/* /usr/src/openvswitch-2.3.1
{% endhighlight %}

<li>Building Kernel Modules</li>
{% highlight css %}
$ apt-get install openvswitch-datapath-source
$ apt-get install linux-headers-3.10.11-voyage
$ apt-get install linux-source-3.10.11-voyage
$ cd /usr/src
$ tar -jxf linux-source-3.10.11-voyage.tar.bz2
$ cd linux-source-3.10.11-voyage
$ make-kpkg --added-modules=openvswitch modules
$ apt-get install openvswitch-switch openvswitch-common
{% endhighlight %}

<li>Installation</li>
{% highlight css %}
$ cd /root/openvswitch-2.3.1
$ ./configure --with-linux=/usr/src/linux-headers-3.10.11-voyage
$ make
$ make install
$ make modules_install
{% endhighlight %}

<li>Running the Application</li>
{% highlight css %}
$ ps -A | grep ovs
$ mkdir -p /usr/local/etc/openvswitch
$ rm /usr/local/etc/openvswitch/conf.db
$ cd openvswitch-2.3.1/
$ ovsdb-tool create /usr/local/etc/openvswitch/conf.db vswitchd/vswitch.ovsschema
$ ovsdb-server --remote=punix:/usr/local/var/run/openvswitch/ db.sock --remote=db:Open_vSwitch,Open_vSwitch,manager_options --pidfile --detach
$ ovs-vsctl --no-wait init
$ ovs-vswitchd --pidfile --detach
$ ovs-vsctl del-br br0
ovs-vsctl add-br br0 -- set Bridge br0 fail-mode=secure
$ ovs-vsctl set bridge br0 other-config:datapath-id=000000000000000x
$ ovs-vsctl add-port br0 wlan0
$ ifconfig wlan0 0
$ ifconfig br0 10.10.xx.xx netmask 255.255.255.0 up
$ route add default gw 10.10.1.1 br0
$ ovs-vsctl set-controller br0 tcp:10.10.xx.xx:6633
{% endhighlight %}

</ol> 
