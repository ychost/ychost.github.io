---
layout: post
title: 在 x86 平板上面安装 Ubuntu 
categories: [系统,推荐]
description: x86 的平板安装 win10 太卡，安装 android 兼容性不好，要是在上面安装一个 Linux 这岂不是一件很酷的事情
keywords: x86 平板, Linux, Ubuntu, 蓝魔 R9s Pro
tags: [Linux, x86, Tablet]
---

x86 平板安装 win10 太卡，安装 android 兼容性不好，要是在上面安装一个 Linux 这岂不是一件很酷的事情，而且基于 x86 架构的 Linux 软件资源可谓是异常丰富，本文以国产寨板「蓝魔R9s Pro」为例介绍在普通的 x86 平板上安装 Ubuntu


### 准备
1. 在[Linuxium.au][href1]上面下载自己需要的系统
  > 这些系统都是打了补丁的所以可以直接安装，我下载的是「Ubuntu Budgie 17.04 Beta 1」。
  > 我已经将其系统从「谷歌网盘」复制到了「百度网盘」，稍后放出下载链接。

2. 百度网盘链接：[http://pan.baidu.com/s/1c2cjqxU][href3] 密码：knz5

2. 一块容量大于 4G 的 U盘 用来做系统安装盘，一根 OTG 线和一个 USB集线器 用来连鼠标和键盘。

3. [rufus][href2] 用来将系统刻录到 U盘 的软件。


### 刻录系统到 U盘
1. 「设备」选中用来刻录的 U盘。
2. 然后点击「ISO镜像」 旁边的那个光驱图标选择将要刻录的系统。
3. 点击「开始」用默认的设置，点确定直接开始刻录，等待进度条走满。

    > 注意：分区方案和目标系统类型： 「用于UEFI计算机的GPT分区方案」，其余的选项可以默认

   [![rufus][img2]][img2]{:data-lightbox="x86-table-linux"}

### 准备安装
1. 将 U盘，键盘鼠标通过 OTG线 和 USB集线器 连接到平板上面。
2. 启动平板然后按 ESC 进入 BIOS。
3. 在 Security 选项里面，设置 Secure Boot为 Disable。

   [![bios-security][img3]][img3]{:data-lightbox="x86-table-linux"}

   在 Boot 选项里面设置 Boot Option #1 为你的 U盘 这里是 UEFI： SMI USB DISK 1100。

   [![bios-boot][img4]][img4]{:data-lightbox="x86-table-linux"}
   
4. 点击 F4(save & Exit)，重启后进入安装界面

### 开始安装

安装过程和普通电脑安装 Ubuntu 一样，在这个界面线可以不急着安装可以先看看驱动情况比如 WIFI，蓝牙等等看驱动没有根据驱动情况再决定是否安装，不然安好后发现没有驱动那么这样体验非常不好。

1. 点击 Install Ubuntu
2. 我选的是「擦除整个磁盘」来安装 Ubuntu，然后点击下一步即可
3. 输入用户名和密码等等，点击开始安装
   [![ubuntu-install][img5]][img5]{:data-lightbox="x86-table-linux"}

### 启动系统
1. 安装完成之后，点击重启即可进入系统。
   [![ubuntu-preview][img6]][img6]{:data-lightbox="x86-table-linux"}
2. 后面操作就和普通的 Ubuntu 操作一致了，经测试 17.04 的驱动比 16.04 完善，我的在 16.04 下面声卡没有驱动，但是在 17.04 下面直接就驱动了。
   [![ubuntu-preview-2][img7]][img7]{:data-lightbox="x86-table-linux"}



[href1]: http://linuxiumcomau.blogspot.com/2017/03/ubuntu-16042-and-ubuntu-1704-beta-1.html
[href2]: https://rufus.akeo.ie/
[href3]: http://pan.baidu.com/s/1c2cjqxU

[img1]: /images/post/linux/linuxium-page.png
[img2]: /images/post/windows/rufus.png
[img3]: /images/post/tablet/bios-security.png
[img4]: /images/post/tablet/bios-boot.png
[img5]: /images/post/tablet/ubuntu-install.png
[img6]: /images/post/tablet/ubuntu-preview.png
[img7]: /images/post/tablet/ubuntu-preview-2.png