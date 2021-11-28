---
layout: post
title: 蓝魔平板刷 Android Windows Linux
categories: [系统]
description: 不仅是蓝魔其它厂的 x86平板 刷机原理都是类似的，支持 Android，Windows，Linux 之间的互刷
keywords: 蓝魔, i9sPro, 刷机, Bios, Android, Windows, Linux
tags: [平板, 刷机]
excerpt: 不仅是蓝魔其它厂的 x86平板 刷机原理都是类似的，支持 Android，Windows，Linux 之间的互刷
---
本文是以「蓝魔 i9s Pro」为例，其它 x86平板 也可以参考刷机的过程  
<font color="red">如果你是其它平板，请不要下载本文提供的系统文件，工具文件是通用的</font>

### 准备
1. 一根 OTG 线
1. 一个 Hub 集线器
1. 一个 U 盘 （会将其数据抹掉）
1. 一个键盘、鼠标
1. 文件： 链接：[https://pan.baidu.com/s/1o9TV3Jk][href2] 密码：01xy  
> 镜像：蓝魔官方 Andorid，Windows8.1，非官方 Windows10，Ubuntu For Tablet，Remix
> 工具：Android Bios，Windows Bios，MTF 刷机工具，分区文件 partition.rar，Root 工具等

### 说明
1. Android，Windows，Linux 三个系统使用的 Bios 不一样
1. Android 的 Bios 是 x64 的
1. Windows 和 Linux 的 Bios 是 x86 的
1. 刷 Android 之前就需要刷入 Android 的 Bios，其它两系统类似
1. 目前仅支持 Android 和 Windows 共存

### 单刷 Android
1. 刷入 Android Bios
    * 将 Windows PE 烧写的 U 盘，制作成启动盘   
      烧写工具为 Rufus，PE 为 WinPE_5.1_x86_for_Tablet_1.7.iso
      > 注意：烧写的时候会清空 U 盘，烧写模式为 UEFI + GPT
    * 将 Bios 文件拷进 U 盘 （i9s-bios-android/stage01) 文件夹里面的文件  
    * 将 OTG + HUB + 鼠标 + 键盘 + U 盘， 连接到平板上面，然后开机不断 按 F7 会出现启动选项，请选择 U 盘启动
    * 进入 Windows PE 后执行刚刚拷贝的 stage01/flash.bat 文件刷入 Android Bios
    * 关机
1. 刷入 Android 系统
    * 文件为 MTF.rar 和 i9spro-Android.rar
    * 安装 38186_iSoC_USB_Driver_Setup_1_2_0
    * 安装 38185_Intel_Android_Driver_Setup_1_5_0
    * 安装 ManufacturingFlashTool_Setup_6.0.43.exe
    * 把 CUSTOM_CONFIG.INI 这个文件复制到 ManufacturingFlashTool 的安装目录
    * 打开 MFT，选择 File -> settings，SOC device设置为：VID:8087，PID:0A65，其它不用改动
    * 加载flash.xmli9spro-android.rar 里面）：点击 file -> open，找到固件的 xml 文件打开即可
        > 可根据自己的需要选择分区文件覆盖 partition.tbl，在 partition.rar 里面有 5G, 8G, 16G, 24G, 48G 的分区文件
    * i9s关机，按住 「音量+」「靠近电源键那个音量按钮」不要放开，使用usb线连接到电脑，电脑识别到设备之后就会自动升级，5分钟左右升级完成自动重启 
    * 重启，直接进入Android，点击桌面上的「迈微双启动」图标，启动该应用（解开所需文件）后，即可退出。若出现「该应用需要重启机器后才可使用」，则重启机器后再次启动该应用，然后关机；注意，之后就暂时不要再进入Android，也就是说，在你安装好 Windows 之前，只能够进入 2 次 Android 系统（如果第 3 次不小心开机进入了 Android，必须到 bios setup 里面执行 restore default，否则会没有双启动界面出来！）
1. 修改 Android 分区大小
    * 修改 i9spro-android.rar 的 partition.tbl 最后两个 add 行，例如官方的 24G 如下：
      ```
        add -b 5406760 -s 50331648 -t data -u 80868086-8086-8086-8086-000000000008 -l data -T 0 -P 0 /dev/block/mmcblk0
        add -b 55738408 -s 4096 -t data -u 80868086-8086-8086-8086-000000000009 -l guest-firmware -T 0 -P 0 /dev/block/mmcblk0
        reload /dev/block/mmcblk
      ```
      其中 50331648 = 24 * 1024 * 2048  
          55738408 = 5406760 + 50331648  
    * 可知，修改方法如下：
      ```
        add -b 5406760 -s X -t data -u 80868086-8086-8086-8086-000000000008 -l data -T 0 -P 0 /dev/block/mmcblk0
        add -b Y -s 4096 -t data -u 80868086-8086-8086-8086-000000000009 -l guest-firmware -T 0 -P 0 /dev/block/mmcblk0
        reload /dev/block/mmcblk
      ```
      其中：  
    　　  X = G * 1024 * 2048 (G <= 55.5，G 为 Android 的储存空间 GB 数)  
      　　Y = 5406760 + X

### 共存刷 Windows
1. 刷入 Windows  BIOS
    * 下载好「i9s-bios-windows」之后，把 fparts.txt、fpt64.efi、startup.nsh，I9S_SPINOR_11_W.bin 共 4 个文件复制到 u盘 根目录。
    * 把u盘、键盘插入到 usb hub 并通过 OTG 线连接到 i9s Pro
    * i9s长按3秒开机，出现 logo 之后马上不停的按键盘上的 F7 功能键，待出现启动选项菜单后，选择「UEFI:Built-in EFI Shell」，回车键确认，等待 5秒 后即可自动开始更换为 「win8 BIOS」的
    * 更新完成后，i9s会自动重启进入fastboot模式
    > 注意：如果你是初次刷此bios，此时屏幕是没有任何显示的  
    * 在电脑上安装「IntelAndroidDrvSetup1.5.0.exe」（已安装过的电脑不需要重复安装）
    * i9s Pro 通过 usb线 连接到电脑，在电脑上双击「1升级bios_stage2.bat」，稍等片刻即可完成升级。然后i9s会重启并有显示内容出现。此时可长按十秒钟强制关机。至此「Windows BIOS」就更换完成了  
     > 注意：刷了 WIN8 的 BIOS 以后，不能进入 Android 系统  
     > 万一进入了，处理方法为：重启进入到 BIOS 界面，在最后一项「Save or exit」中，选中「restore Defaults」后，直接回车，选yes,然后返回到第一项「save changes and exit」，再直接回车，选 yes,自动重启，便可接着刷 win8 系统了
1. 刷入 官方 Windows 8.1
    * 把 「i9spro-win8.1-20150106官方固件」 复制到格式化为 FAT32 的 u盘 根目录（u盘 卷标记得改为 WINPE ），通过 OTG 线连接到 i9s Pro，开机即可从 u盘 启动并自动部署好 win8 系统了（如果默认不从 u盘 启动，请接 usb hub、键盘、u盘 在开机时马上不停按 F7 键再选择从 u盘 启动），等待 20分钟 左右部署完成。如果刷的官方部署文件，当在 system32 停下来后，先拔掉U盘，再用键盘输入「EXIT」，机器会自动重启，再选「通用」后，确定。 
    * 通过双启动菜单选择进入Windows，在 C盘 的 MicroVirt 目录下找到「MicroVirtSetup.exe」文件，双击运行，执行完安装过程
    * 安装完成后，进入「C:\Program Files\MicroVirt\Dualboot」，点击「MicroVirtAt.exe」执行，今后该软件将自动加载
    * 点击任务栏右下角的迈微「M」图标
    * 点击「加载Android数据分区」 -- 此时Android分区被映射，并在桌面上已经创建快捷方式（实现 Android 空间在 Windows 系统上共享）

1. 刷入 非官方 Windows 10
    * 文件在「i9sPro-win10-非官方」，刷入方式同上
    * 需要在 Windows10 系统中隐藏 Android 的众多分区，以免不小心点中格式化，破坏 Android 系统
    * 下载 partitionhide 文件，通过u盘复制到 Windows 系统的 C盘 根目录
    * 长按桌面左下角的 Win 图标，在弹出的菜单中选择「命令提示符（管理员）（A）」打开命令窗口
    * 输入以下内容并按回车键即可(正常的话可以看到十几行提示，如某某盘符已被移除之类的)
      ```
    diskpart /s c:\partitionhide
    注意：以上命令全部为小写字母，在/s参数的前、后各有一个空格
      ```
    * 修改双系统切换后 Windows 时间比 Android 慢 8小时 的问题
    * 进入 Windows 系统，进行如下修改：
    > 在左下角「开始」按钮长按，选择「运行」，输入 regedit 并回车打开注册表，打开如下项目：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation\
新建一个「DWORD(32位)值（D）」，名称改为「RealTimeIsUniversal」，值设为 1 的键值，重启后就可以保持系统时间和 Android 一致了

### 单刷 Linux
请参考 [在 x86 平板上面安装 Ubuntu][href1]

### 参考
[I9S和I9SPRO双系统详细完整教程以及额外说明][href3]

[href1]: /2017/04/11/install-ubuntu-on-tablet/
[href2]: https://pan.baidu.com/s/1o9TV3Jk
[href3]: http://tieba.baidu.com/p/3530141496