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
1. ####  HashMap, HashTable 和 ConcurrentHashMap 的区别
   1. HashMap是非线程安全的，HashTable 是线程安全的。
   1. HashMap的键和值都允许有 null 存在，而 HashTable 和 ConcurrentHashMap 都不行。
   1. 因为线程安全、哈希效率的问题，HashMap 效率比 HashTable 的要
   1. ConcurrentHashMap 对整个桶数组进行了分割分段(Segment)，然后在每一个分段上都用lock锁进行保护，相对于 HashTable 的 synchronized 关键字锁的粒度更精细了一些，并发性能更好，而 HashMap 没有锁机制，不是线程安全的。
   1. 三者的 hash 函数不一样
1. #### Java 集合
   > [java 集合继承关系图][href7]
1. #### IO字节流和字符流相互转换
   > [Java 字节流 字符流 转换流][href8]
1. ####  hashCode 与 equals 的区别与联系
两个 equals 不等的对象可能有相等的 hashCode。
1. ####  Volatile的特征
    1. volatile是在synchronized性能低下的时候提出的。如今synchronized的效率已经大幅提升，所以volatile存在的意义不大。
    1. 如今非volatile的共享变量，在访问不是超级频繁的情况下，已经和volatile修饰的变量有同样的效果了。
    1. volatile不能保证原子性。[Java并发_volatile实现可见性但不保证原子性][href6]
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
   1. 重载(Overload)指的是同一个类里面的两个方法具有相同的名称，但是方法参数类型可能不同
   1. 重写(Override)指的是子类覆盖父类的方法，两个方法属于不同类但是具有相同的签名
1. #### 自动装/拆箱
   1. 自动装箱时编译器调用valueOf将原始类型值转换成对象，同时自动拆箱时，编译器通过调用类似intValue(),doubleValue()这类的方法将对象转换成原始类型值。
   1. 自动装箱是将boolean值转换成Boolean对象，byte值转换成Byte对象，char转换成Character对象，float值转换成Float对象，int转换成Integer，long转换成Long，short转换成Short，自动拆箱则是相反的操作。
1. #### 基本类型
byte(8)、short(18)、int(32)、long(64)、float(32)、double(64)、boolean(1)、char(8) 8种
1. #### 线程
   > [53道Java线程面试题][href4]  
   > [Java语言定义的线程状态分析][href9]
1. #### 静态代理、动态代理
   > [java静态代理与动态代理简单分析][href10]  
   > [Java动态代理的两种实现方法][href11]
1. #### 过滤器与拦截器
   > [过滤器与拦截器的区别][href12]

1. #### 实现多线程的方式
1. #### 进程的三态转换
1. #### String, StringBuffer, StringBuilder 的区别
   * String字符串是常量，其值不能改变
   * StringBuilder是线程不安全的，速度更快
   * StringBuffer是线程安全的，速度比StringBuilder慢
   * [Java 中 String、StringBuffer和StringBuilder的区别][href5]
1. #### Java和C/C++之间的差别

### Web
1. #### Session, Cookie的区别
1. #### sendRedirect, foward的区别

### Jvm
1. #### GC 的工作原理

### SQL
1. #### 数据库事务隔离机制的特点
1. #### 数据库优化查询
   > [数据库优化查询][href13]
1. #### 三范式
   > [解释一下关系数据库的第一第二第三范式？][href15]

### System
1. #### 在Linux上，对于多进程，子进程继承了父进程的哪些
   1. 子进程继承父进程  
    用户号UIDs和用户组号GIDs、环境Environment、堆栈、共享内存、打开文件的描述符、执行时关闭（Close-on-exec）标志、信号（Signal）控制设定、进程组号、当前工作目录、根目录、文件方式创建屏蔽字、资源限制、控制终端 
    1. 子进程独有  
    进程号PID、不同的父进程号、自己的文件描述符和目录流的拷贝、子进程不继承父进程的进程正文（text），数据和其他锁定内存（memory locks）、不继承异步输入和输出 
    1. 父进程和子进程拥有独立的地址空间和PID参数
1. #### TCP 的三次、四次握手
   > [TCP协议中的三次握手和四次挥手(图解)][href14]
1. #### 文件系统管理的最小磁盘空间单位是  
微软操作系统（DOS、WINDOWS等）中磁盘文件存储管理的最小单位叫做「簇」  
扇区：硬盘不是一次读写一个字节而是一次读写一个扇区（512个字节）  
簇：系统读读写文件的基本单位，一般为2的n次方个扇区(由文件系统决定)  
> 块可以包含若干页，页可以包含若干簇，簇可以包含若干扇区
> 块-->页-->簇-->扇区

1. #### poll, select 和 epoll 区别
epoll跟select都能提供多路I/O复用的解决方案。在现在的Linux内核里有都能够支持，其中epoll是Linux所特有，而select则应该是POSIX所规定，一般操作系统均有实现。
   1. 支持一个进程所能打开的最大连接数  
     __select__  
      依赖于宏 FD_SETSIZE（x86 上面为 3232，x64 上面为 3264）  
     __poll__  
      无限制，原因是基于链表结构来存储的  
     __epoll__  
      有上限，但是很大，1G 内存大概为 10万，2G 内存大概为 20万
    1. FD 剧增后带来的 IO 效率问题  
     __select__  
      因为每次调用时都会对连接进行线性遍历，所以随着FD的增加会造成遍历速度慢的「线性下降性能问题」。  
     __poll__  
      同上，有「线性下降性能问题」  
     __epoll__   
      epoll 根据每个 fd 的「callback」来实现的，只有活跃的 socket 才能调用 callback，所以没有「线性下降性能问题」
    1. 消息传递方式  
      __select__  
        内核需要将消息传递到用户空间，都需要内核拷贝动作  
      __poll__  
       同上  
      __epoll__  
       通过内核和用户空间共享一块内存来实现的
    1. 总结  
       1. 在连接数少并且连接都十分活跃的情况下，select和poll的性能可能比epoll好，毕竟epoll的通知机制需要很多函数回调。
       1. select低效是因为每次它都需要轮询。但低效也是相对的，视情况而定，也可通过良好的设计改善
     




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
            E --> NULL
            E --> F
       {% endmermaid %}
  1. 同理，还原整个二叉树如下：

       {% mermaid %}
          graph TD
            C --> A
            A --> B
            A --> E
            E --> NULL
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
1. 树的度与节点的关系
> 度的和 = 节点数和 - 1

$$2*n_2 + 1*n_1 + n_0 = n_2 + n_1 + n_0$$ 

[href1]: /2018/03/01/c-x86-x64-type-bytes/
[href2]: https://www.cnblogs.com/AlexMiller/p/5509609.html
[href3]: https://www.zhihu.com/question/36193367
[href4]: https://www.cnblogs.com/king-garden/p/5672853.html
[href5]: /2018/01/13/java-string-buffer-builder/
[href6]: https://www.cnblogs.com/gossip/p/6182028.html
[href7]: /2018/01/13/java-collection/
[href8]: http://blog.csdn.net/puppylpg/article/details/45620387
[href9]: https://www.cnblogs.com/trust-freedom/p/6606594.html
[href10]: https://www.cnblogs.com/V1haoge/p/5860749.html
[href11]: http://blog.csdn.net/heyutao007/article/details/49738887
[href12]: http://www.cnblogs.com/joyang/p/4973435.html
[href13]: https://jingyan.baidu.com/article/154b463188c29928ca8f4181.html
[href14]: http://blog.csdn.net/whuslei/article/details/6667471/
[href15]: https://www.zhihu.com/question/24696366