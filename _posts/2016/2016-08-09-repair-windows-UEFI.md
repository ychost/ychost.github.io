---
layout: post
title: 修复 Windows10 的 UEFI 引导
categories: 系统
description: 有时候一不小心 Windows 的引导就坏掉了然后开不了机，这对于我们来说是至关重要的毕竟很多的资料和搭建好的各种环境都在这个系统里面
keywords: Windows, UEFI
tags: [Windows, UEFI, Repair]
---
　　UEFI 引导出问题是经常的事情，之前在装「黑苹果」的时候就经常忘记保存 EFI 分区的 /EFI/ 文件夹，这样的后果就是之前的Windows是没有引导的，只有一个「黑苹果」的
引导但是 Windows 的系统任然在硬盘上的，本文就是教你手动修复 EFI:/EFI/ 文件夹下面的 Windows 引导的。


### 第一步 工具准备
1. WinPE做的U盘
2. [bootice软件][href1]{:target="_blank"}

### 第二步 EFI分区挂载添加
1. 启动 WinPE 

2. 打开 CMD 命令端口，输入如下命令加载EFI分区

   ```
   diskpart
   list disk     % 查看所有的磁盘 %
   select disk 0 % 0 是含有引导分区磁盘号，选中含 EFI 分区的磁盘 %
   list vol      % 查看选中磁盘下面的分区 %
   select vol  0 % 0 是引导的分区，选中 EFI 分区 %
   ass           % 加载 EFI 分区 %
   ```



### 第三步 EFI 文件修复
1. 拷贝 "Sys:\Windows\Boot\EFI\bootmgfew.efi" 到 "\EFI\Microsoft\boot"

    > Sys 是你的系统所在分区，在 WinPE 下面不一定是 C 盘

    > 如果 EFI 分区下面没有这些文件夹自己新建

2. 打开 [bootice软件][href1]{:target="_blank"} 选择 BCD编辑 -> 其它 BCD 文件 -> 智能编辑
[![bootice-config][img1]][img1]{:data-lightbox="rp-win-uefi"}


3. 删除 "Windows 7/8 Loader" -> 添加
[![bootice-bcd-config][img2]][img2]{:data-lightbox="rp-win-uefi"}


   ```
   设备类型：Partition
   启动磁盘：Windows 系统所在磁盘
   启动分区：Windows 系统所在分区
   启动文件：将原有的 \Windows\system32\winload.exe 改成
                　　 \Windows\system32\winload.efi
   ```


### 第四步 保存文件
1. 保存该 BCD 文件到 "\EFI\Microsoft\Boot"

2. 重启系统即可

[href1]: http://www.pc6.com/SoftView/SoftView_34201.html
[img1]: /images/post/windows/bootice-config.png
[img2]: /images/post/windows/bootice-bcd-config.png 