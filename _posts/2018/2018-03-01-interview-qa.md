---
layout: post
title: 面试题总结
categories: [面试]
description: 为了准备 2018 年校招而总结的一些刷过的题、踩过的坑、面经等等
keywords: 刷题, 面试
tags: [面试]
excerpt: 为了准备 2018 年校招而总结的一些刷过的题、踩过的坑、面经等等
---
### Java

### Spring

### Jvm

### SQL

### System
__1. 在Linux上，对于多进程，子进程继承了父进程的哪些__ 
1. 子进程继承父进程  
    用户号UIDs和用户组号GIDs、环境Environment、堆栈、共享内存、打开文件的描述符、执行时关闭（Close-on-exec）标志、信号（Signal）控制设定、进程组号、当前工作目录、根目录、文件方式创建屏蔽字、资源限制、控制终端 
1. 子进程独有  
    进程号PID、不同的父进程号、自己的文件描述符和目录流的拷贝、子进程不继承父进程的进程正文（text），数据和其他锁定内存（memory locks）、不继承异步输入和输出 
1. 父进程和子进程拥有独立的地址空间和PID参数

__2. 文件系统管理的最小磁盘空间单位是__  
微软操作系统（DOS、WINDOWS等）中磁盘文件存储管理的最小单位叫做「簇」  
扇区：硬盘不是一次读写一个字节而是一次读写一个扇区（512个字节）  
簇：系统读读写文件的基本单位，一般为2的n次方个扇区(由文件系统决定)  
> 块可以包含若干页，页可以包含若干簇，簇可以包含若干扇区
> 块-->页-->簇-->扇区


### Algorithm

__1. 已知一棵二叉树的前序遍历为CABEFDHG，中序遍历为BAFECHDG，那么它的后续遍历是：__  
这类由二叉树的（前序遍历+中序遍历 ==> 后序遍历）或者（后续遍历 + 中序遍历 ==> 前序遍历）的解法如下：
   * 找到树的根节点，前序遍历的第一个节点，后续遍历的最后一个节点
   * 中序遍历中根节点左边的为左子树，根节点右边的为又子树
   * 在前序/后序遍历中找到左右子树的根节点，在中序遍历中找到，子树的左右子树
   * 通过上面的<font color="red">递归</font>处理，就能复原二叉树，最后根据复原的二叉树进行遍历即可

以本题为例：
前序遍历：<font color="red">C</font>ABEFDHG
中序遍历：BAFE<font color="red">C</font>HDG
   1. 找到根节点 C，左子树：ABEF/BAFE，右子树：DHG/HDG 
   > 注：ABEF/BAFE 表示前序遍历：ABEF，中序遍历：BAFE

       {% mermaid %}
        graph TD
            C --> L[ABEF/BAFE]
            C --> R[DHG/HDG]
       {% endmermaid %}
   1. 左子树 ABEF/B<font color="red">A</font>FE 的根节点：A，左子树：B，右子树：EF/FE

       {% mermaid %}
        graph TD
            A --> L[B]
            A --> R[EF/FE]
       {% endmermaid %}

   1. 左子树 B，右子树：EF/F<font color="red">E</font>（F 是E的左子树），所以整个左子树如下：

       {% mermaid %}
        graph TD
            C --> A
            A --> B
            A --> E
            E --> F
       {% endmermaid %}
  1. 同理，还原整个二叉树如下：

       {% mermaid %}
          graph TD
            C --> A
            A --> B
            A --> E
            E --> F
            C --> D
            D --> H
            D --> G
       {% endmermaid %}
   1. 所以后续遍历为：BFEAHGDC

### Summary
1. C/C++ 各个类型在 x86/x64 的长度
1. C/C++ 的 struct 所占的字节数（字节对齐）
1. C++ 的 class 的多态数原理、析构函数调用顺序等
1. 二叉树的各项遍历，以及根据（前、中）推后续遍历，根据（后、中）推前序遍历
1. 具有 n 个几点二叉树的形态个数公式
\\[C_2 n ^ n /(n+1) \\]



