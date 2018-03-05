---
layout: post
title: 面试题总结
categories: [面试]
description: 为了准备 2018 年校招而总结的一些刷过的题、踩过的坑、面经等等
keywords: 刷题, 面试
tags: [面试]
excerpt: 为了准备 2018 年校招而总结的一些刷过的题、踩过的坑、面经等等
---
<style>
</style>

### Java
1. ####  HashMap, HashTable 和 ConcurrentHashMap 的区别
1. ####  Array 与 ArrayList 的区别
1. ####  Set 与 List 的区别
1. ####  hashCode 与 equals 的区别与联系
1. ####  Volatile的特征
    1. volatile是在synchronized性能低下的时候提出的。如今synchronized的效率已经大幅提升，所以volatile存在的意义不大。
    1. 如今非volatile的共享变量，在访问不是超级频繁的情况下，已经和volatile修饰的变量有同样的效果了。
    1. volatile不能保证原子性，这点是大家没太搞清楚的，所以很容易出错。
    1. volatile可以禁止重排序。
1. #### 禁止内存重排序/内存屏障/内存栅栏
__内存屏障（Memory Barrier，或有时叫做内存栅栏，Memory Fence）：__ 一种CPU指令，用于控制特定条件下的重排序和内存可见性问题。Java编译器也会根据内存屏障的规则禁止重排序。（也就是让一个CPU处理单元中的内存状态对其它处理单元可见的一项技术。）  
__内存重排序：__ 在一个线程内，按照代码顺序，书写在前面的操作先行发生于书写在后面的操作。准确地说应该是控制流顺序而不是代码顺序，因为要考虑分支、循环等结构。以下规则可禁止重排序：
   1. volatile变量规则(Volatile Variable Rule):对一个volatile变量的写操作发生于后面对这个变量的读操作，这里的“后面”也指的是时间上的先后顺序。
   1. 线程启动规则(Thread Start Rule)：Thread独享的start()方法先行于此线程的每一个动作。
   1. 线程终止规则(Thread Termination Rule)：线程中的每个操作都先行发生于对此线程的终止检测，我们可以通过Thread.join()方法结束、Thread.isAlive()的返回值检测到线程已经终止执行。
   1. 线程中断规则(Thread Interruption Rule)：对线程interrupte()方法的调用优先于被中断线程的代码检测到中断事件的发生，可以通过Thread.interrupted()方法检测线程是否已中断。
   1. 对象终结原则(Finalizer Rule)：一个对象的初始化完成(构造函数执行结束)先行发生于它的finalize()方法的开始。
   1. 传递性(Transitivity)：如果操作A先行发生于操作B，操作B先行发生于操作C，那就可以得出操作A先行发生于操作C的结论
1. #### 重载与重写的区别
1. #### 接口与抽象类的区别 
1. #### 自动装/拆箱
1. #### 基本类型
1. #### 线程同步、并发控制
1. #### 死锁，原子操作，
1. #### 实现多线程的方式
1. #### 进程的三态转换
1. #### Java和C/C++之间的差别
1. #### Poll和Select区别

### Web
1. #### Session, Cookie的区别
1. #### sendRedirect, foward的区别

### Jvm
1. #### GC 的工作原理

### SQL
1. #### 数据库事务隔离机制的特点

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
> 详见：[C 类型长度][href1]
1. C/C++ 的 struct 所占的字节数（字节对齐）
> 详见：[C 字节对齐][href2]
1. C++ 的 class 的多态数原理、析构函数调用顺序等
> 详见：[c++中虚析构函数如何实现多态的、内存布局如何？][href3]
1. 二叉树的各项遍历，以及根据（前、中）推后续遍历，根据（后、中）推前序遍历
> 详见：本文的 Algorithm 部分
1. 具有 n 个几点二叉树的形态个数公式
\\[C_{2n} ^ n  \over (n+1) \\]
1. 二叉树度为 0 的点比度为 2 的点多 1 个
>1. 设树有 $$n$$ 个节点，则有 $$n-1$$ 条边  
>1. 则 $$ 2n_2 + n_1 = n-1 $$（2 度节点有两条边，1 度节点只有一条边）
>1. 而 $$ n_2 + n_1 + n_0 = n$$，所以 $$n_0 = n_2 +1$$
1. SQL中 count(*) 跟 count(1) 的结果一样，都包括对NULL的统计，而count(column) 是不包括NULL的统计

[href1]: /2018/03/01/c-x86-x64-type-bytes/
[href2]: https://www.cnblogs.com/AlexMiller/p/5509609.html
[href3]: https://www.zhihu.com/question/36193367
