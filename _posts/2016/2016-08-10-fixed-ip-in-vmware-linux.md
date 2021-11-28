---
layout: post
title: 固定 Vmware 中的 Linux 的 IP地址
categories: [系统, 推荐]
description: 当需要用主机与虚拟机的 Linux 进行通信时，绑定 IP 地址是至关重要的
keywords: Vmware, Linux, IP
tags: [Vmware, Linux, IP]
---

　　当需要主机与 Vmware 虚拟机进行通信或者 Vmware 里面的多个虚拟机进行通信的时候，固定彼此的 IP 和掌控网关是十分必要的。

#### Vmware 软件设置

* Vmware 的上网模式需要设置成特定「虚拟网络」，在 Linux 的虚拟系统点击右键 -> 设置
	
	[![vmware-config-network][img1]][img1]{:data-lightbox="fx-vm-ip"}

#### 主机 IP 设置

* 共享你可以上网的无线网络 "VMnet1" 

    > 在网络共享里面，这里我讲我的 "WLAN" 无线网络共享给了 "VMnet1"

    > 选中 "WLAN" 点击右键 →  属性 → 共享 → 勾选两个选项 →  家庭网络连接(<u>H</u>
) →  "VMware Network Adapter VMnet1"

	[![host-share-wlan][img2]][img2]{:data-lightbox="fx-vm-ip"}

* 固定 "VMnet1" 的IP
	
	> 这里设置的 IP 也就是主机相对于 Linux 虚拟机这个局域网的 IP 地址

	> 图中设置的 IP 地址为 192.168.183.2

	> 默认网关(<u>D</u>)不用设置，DNS 服务器设置主要是便于 Linux 通过此 DNS 上网

	[![host-fixed-ip][img3]][img3]{:data-lightbox="fx-vm-ip"}


#### Linux IP 设置

* 固定 Linux 的IP

	> <font color="red">此 IP 一定要与 "VMnet1" 设置的 IP(192.168.183.2) 这个网段一致，
	  这里设置的是 192.168.183.101</font>
	
	> 这里以 CentOS 为例，其它的 Linux 发行版的 IP 设置请自行百度

	[![centos-set-ip][img4]][img4]{:data-lightbox="fx-vm-ip"}

#### 访问测试
* Linux 访问外网和主机测试
	
	> 可以看到 Vmware中的 CentOS ping 通了 baidu 和 主机 "192.168.183.2"

	[![centos-ping-network][img5]][img5]{:data-lightbox="fx-vm-ip"}

* 主机访问 Linux 测试

	> 可以看到主机 ping 通了 Linux

	[![host-ping-centos] [img6]][img6]{:data-lightbox="fx-vm-ip"}


[img1]: /images/post/vmware/vmware-config-network.png
[img2]: /images/post/vmware/host-share-wlan.png
[img3]: /images/post/vmware/host-fixed-ip.png
[img4]: /images/post/vmware/centos-set-ip.png
[img5]: /images/post/vmware/centos-ping-network.png
[img6]: /images/post/vmware/host-ping-centos.png