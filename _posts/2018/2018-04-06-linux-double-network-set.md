---
layout: post
title: Linux 双网卡配置
categories: [系统]
description: "服务器一般配置有两块以上的网卡，有时候需要一个网卡供外网访问，一个网卡供内网访问，两个网卡所处的网段不一样。为了能使两个网卡一起工作就得自己手动配置 Linux 的路由表将指定的网段 ip 走固定的网卡。"
keywords: keyword1, keyword2
tags: [Linux, Route]
excerpt: "服务器一般配置有两块以上的网卡，有时候需要一个网卡供外网访问，一个网卡供内网访问，两个网卡所处的网段不一样。为了能使两个网卡一起工作就得自己手动配置 Linux 的路由表将指定的网段 ip 走固定的网卡。"
---
<font color="red">请不要直接复制下面的命令，根据自己的实际网络情况来定</font>


## 背景 
1. 有两张网卡，网卡 1 和网卡 2，其中网卡 1 连接在能上外网的路由器，网卡 2 连接在内网路由器
1. 网卡 1 参数
   ```
    ip      192.168.0.14
    netmask 255.255.0.0
    gateway 192.168.0.8
   ```
1. 网卡 2 参数
   ```
    ip      192.168.88.14
    netmask 255.255.0.0
    gateway 192.168.88.1
   ```
1. 目的
   ```
    网卡 1 能上外网，且能访问 192.168.0.x 的设设备（连接在外网路由器上的设备）
    网卡 2 只能上内网，能访问除 192.168.0.x 以外的设备（连接在内网路由器上的设备）
   ```

## 初始化网卡

1. 配置网卡信息
   ```
    $ sudo vim /etc/network/interfaces
   ```

1. 配置两个网卡的信息，这里静态分配了两个网卡的信息，网卡 1 和 网卡 2，注意：<font color="red">网卡 2 没有配置网关</font>
   ```
    # 网卡 1，名称 eno1
    auto eno1
    iface eno1 inet static
    address 192.168.0.14
    netmask 255.255.0.0
    gateway 192.168.0.8

    # 网卡 2，名称 eno2
    auto eno2
    iface eno2 inet static
    address 192.168.88.14
    netmask 255.255.0.0
    # 注意内网网卡没有设置网关
   ```

1. 配置 DNS
    ```
    $ sudo vim /etc/resolvconf/resolv.conf.d/base

    # 添加下面内容
    nameserver 114.114.114.114
    nameserver 8.8.8.8
   ```

## 配置路由


```
$ route
目标            网关            子网掩码        标志  跃点   引用  使用 接口
default         192.168.0.8     0.0.0.0         UG    0      0        0 eno1
172.17.0.0      *               255.255.0.0     U     0      0        0 docker0
192.168.0.0     *               255.255.0.0     U     0      0        0 eno1
192.168.0.0     *               255.255.0.0     U     0      0        0 eno2
```

__可知__   
   1. 访问 192.168.x.x 的地址的时走的是 eno1，虽然 eno2 也能走但是被覆盖了。
   1. 访问 192.168.x.x 之外的地址走的是 eno1 且经过网关 192.168.0.8


__配置路由__  

1. 配置 192.168.0.x 走 eno1，注意网段与掩码
   ```
    $ sudo route add -net 192.168.0.0 netmask 255.255.255.0 dev eno1
   ```

1. 配置 192.168.x.x 走 eno2，注意网段与掩码
   ```
    $ sudo route add -net 192.168.0.0 netmask 255.255.0.0 dev eno2
   ```

1. 测试生效
   ```
    # 测试网卡 1
    ping www.baidu.com
    ping 192.168.0.15 

    # 测试网卡 2
    ping 192.168.200.66
   ```

## 重启生效
将上述两个命令添加到 ```/etc/rc.local```
   ```
    vim  vim /etc/rc.local

    # 添加下面的内容
    route add -net 192.168.0.0 netmask 255.255.0.0 dev eno2
    route add -net 192.168.0.0 netmask 255.255.255.0 dev eno1
   ```