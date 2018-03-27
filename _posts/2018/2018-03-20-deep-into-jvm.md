---
layout: post
title: 《深入理解 Java 虚拟机》 笔记
categories: [笔记]
description: 《深入理解 Java 虚拟机》一书的笔记，一方面可以加深自己对 Jvm 的理解，另一方面为了校招面试而准备。
keywords: Jvm, 笔记
tags: [Jvm, 笔记]
excerpt:  《深入理解 Java 虚拟机》一书的笔记，一方面可以加深自己对 Jvm 的理解，另一方面为了校招面试而准备。
---

## 内存
### 内存划分
Java 内存分五个区：虚拟机栈、本地方法栈、程序计数器、堆、方法区。

1. 程序计数器
  * 一块比较小的区域，不通虚拟机实现方式不一样，主要存放当前线程所执行字节码的行号指示，每一个线程都私有一个，唯一一个不会出现 OutOfMemoryError 异常。
1. 虚拟机栈 
  * 线程私有，栈帧：局部变量表、操作数表、动态链接库、方法出口
  > 注：栈溢出攻击就是让局部变量表的内存溢出到方法出口，然后将攻击代码地址覆盖方法出口地址  
  > StackOverflowError: 线程请求的栈深度大于虚拟机所允许的深度  
1. 本地方法栈
  * 与虚拟机栈相似，主要服务与虚拟机使用的 Native 方法，也会抛出上述两个异常
  > 在 HotSpot 虚拟机中虚拟机栈和本地方法栈是合二为一的
1. 堆
  * 线程共享，存放对象实例和数组
  > HotSpot 为 Eden+FromSurvivor+ToSurvivor+老年代
1. 方法区
  * 线程共享，存放已被虚拟机加载的类信息，常量，静态变量，JIT后的代码等，不需要连续内存
  > 该区的主要回收目标是针对常量池和回收和对类型的卸载
  * 运行时常量池，并非 Class 文件定义的 常量才能进入，运行期间也能往里添加常量，如：```String.intern()```

当出现```StackOverflow```异常的时候可以打印线程栈信息定位问题，如果是在建立线程中导致内存溢出，可以考虑减少最大堆和减少栈容量来换取更多的线程。
> 减少最大堆则可增加整个栈区的容量，减少栈容量（每个线程的栈容量减少而栈区总容量又增加）所以可以换取更多的线程

### 对象创建
1. 类检查，检查类能否在常量池中定位到一个符号引用(ClassNotFoundException)，且检查类是否被加载、解析、初始化过，如果没有则先执行相应的加载过程。
1. 分配内存，指针碰撞（内存规整，用指针指向使用过和未使用的临界区）、空闲列表（内存不规整用表来索引空间地址）两种方式。
   * 如果在分配内存发生线程冲突
   * 第一种：采用 CAS 配上失败重试保证更新操作的原子性
   * 第二种：堆预先分配一块内存给各个线程，每个线程只在自己的分配缓冲区进行操作
主要分配三块区域：对象头、实例数据、对齐填充
1. 空间初始化，分配的内存空间初始化为 0 （不包括对象头）
> 保证 Java 代码在不赋初值的时候就能直接使用，访问的默认值
1. 设置对象头信息，元数据、哈希码、GC分代年龄、偏向锁Id、锁标志等等。
1. 填充实例数据，初始化对象的属性，调用构造函数等
1. 填充对其字节，JVM 要求一个对象占的空间必须是 8 的整数倍

### 对象访问
1. 句柄池，Reference->句柄池->{对象实例数据，对象类型数据}
> 移动对象只需要改变句柄池中的指针，而不需要改变 Reference
1. 直接指针，Reference->{对象实例数据，对象类型数据指针->对象类型数据}
> 访问速度快，直接可访问到对象数据，但是需要维护对象类型数据的指针

## 垃圾收集
### 堆区回收
1. 引用计数法，很难解决对象的相互引用问题
1. 可达性分析，当一个对象没有到 GC Roots 的引用链则认为对象可被回收，可作为 GC Roots 的对象包括：
   *虚拟机栈（本地变量表）中中引用的对象   
   * 方法区中的类静态属性引用的对象
   * 方法区中常量引用的对象
   * JNI(Native 方法)引用的对象

引用分类：
   * 强引用：普通引用```Object obj = new Object()```，只要引用存在就不会回收
   * 软引用：```SoftReference```，如果内存不足则会回收引用对象
   * 弱引用：```WeakReference```，只要发生 GC 则会回收
   * 虚引用：```PhantomReference```，不能调用对象的任何属性方法，只能在对象被回收的时候收到一个系统通知

finalize：  
当一个对象被判断「死亡」的时候会标记筛选出重写 ```finalize()``` 且未被调用过的对象放置到 F-Queue 统一执行，完毕后再筛选出 GC Roots 不可达的对象将其回收，如果对象在```finalize()```方法中将```this```赋值给某个变量，那么对象可以逃脱死亡。
> 注: 并不能保证```finalize()```执行完毕，比如在```finalize()```中执行耗时操作，那么虚拟机则会终止其运行防止阻塞 F-Queue。  
> 一个对象的```finalize()```只能被虚拟机调用一次

### 方法区回收
方法区的对象并不是必然回收，由虚拟机参数而定。
1. 回收无用用类
   * 该类的所有实例都被回收
   * 加载该类的```ClassLoader```已经被回收
   * 没有在任何地方通过反射访问该类的访问
1. 回收常量
没有任何对象对常量引用则回收

### 回收算法
1. 标记-清除算法，效率低，内存碎片问题
   * 第一步：标记所有需要回收的对象
   * 第二步：清除所有标记的对象
1. 复制算法，实现简单，运行高效但是内存利率低
   * 将内存划分为大小相等的两块，每次只使用其中的一块。
   * 一块用完了，将活着的对象复制到另一块，然后清理该块
1. 标记-整理算法，效率比较低
   * 第一步：标记所有需要回收的对象
   * 第二步：将标记的对象移动到内存的一端，然后清除
1. 分代算法，结合了复制算法，标记-整理算法
   * 分为新生代+老年代，新生代(Eden+From Survivor+To Survivor)(8:1:1)
   * 新生代采用复制算法，老年代采用标记-整理算法
   * 每次只使用 Eden 和一个 Survivor，回收时将存活的对象复制到另一块 Survivor
   * 如果复制时 Survivor 空间不够则将其移动到老年代（分配担保）
   * 在分配大对象（如大数组）的时候会直接分配到老年代

虚拟机在枚举 GC Roots 的时候并不需要一个不漏的检查完所有执行上下文和全局引用的位置，而是采用了一个```OopMap```数据结构在「特定的位置」记录了引用信息。  

### 垃圾收集器
1. 新生代收集器，复制算法
   * Serial(串行收集器)，单线程，垃圾收集的时候会暂停所有工作线程,效率低，停顿时间长
   * ParNew(并行收集器)，Serial 的多线程版本，与 Serial 特性一致
   * Parallel Scavenge(并行收集器)，达到一个可控的吞吐量(运行用户代码时间/(运行用户代码时间+垃圾收集时间))，其余与 ParNew 类似

1. 老年代收集器
   * Serail Old(串行收集器)，标记-整理算法
   * Parallel Old(并行收集器)，标记-整理算法
   * [CMS(并发收集器)][href7]，标记-清除算法，与用户线程一起工作，容易产生内存碎片
   
1. 新生代+老年代收集器
   * G1(并行+并发收集器),可预测停顿，不会产生内存碎片
   * G1(Garbage-First)优先回收价值最大的 Region

1. Minor GC 与 Full GC 的区别  
   * 新生代 GC (Minor GC): 指发生在新生代的垃圾回收集动作，回收速度快。
   * 老年代 GC (Full GC/Major GC): 指发生在老年代的 GC，出现了 Full GC 经常会伴随至少一次的 Minor GC，回收速度慢。

## 虚拟机性能监控与故障处理工具
/jdk/bin 目录下面的一些工具，比如 jstack/jps/jmap/jstat 等等，这些工具的大小都很小，在 jdk_1_8 里面差不多为 17k，因为这些命令行工具多数是 jdk/lib/tools.jar 类库的一层薄包装，tools.jar 为 17M 在 jdk_1_8 下面。

| 工具 | 主要作用 |
|:----:|:--------|
|[jps][href1]   | JVM Process Status Tool，显示指定系统内所有的 HotSpot 虚拟机进程|
|[jstat][href4] | JVM Statistics Monitoring Tool，用于收集 HotSpot 各方面运行数据|
|[jinfo][href5] | Configuration Info for Java，显示虚拟机配置信息|
|[jmap][href3]  | Memory Map for Java，生成虚拟机内存转储快照（heapdump 文件）|
|[jhat][href6]  | JVM Heap Dump Browser，分析 heapdump 文件 |
|[jstack][href2]| Stack Trace for Java，显示虚拟机线程快照 |
|jConsole       | 简易的可视化控制台 |
|jvisualVM      | 功能强大的控制台   |

## 虚拟机调优

## 虚拟机执行子系统
### class 文件结构  
class 文件是一组以 8 位字节为基础单位的二进制流，各项数据按顺序紧凑地排列在的 Class 文件中，中间没有添加任何分隔符。当遇到 8 位以上空间数据项时，按 Big-Endian(大端) 分割成若干个 8 个字节进行存储。
   
| 类型             | 名称                  | 数量                    | 备注     |
| -------------- | ------------------- | --------------------- | ------ |
| u4             | magic               | 1                     | 魔数     |
| u2             | minor_version       | 1                     | 次版本    |
| u2             | major_version       | 1                     | 主版本    |
| u2             | constant_pool_count | 1                     | 常量池容量  |
| cp_info        | constant_pool       | constant_pool_count-1 | 常量表    |
| u2             | access_flags        | 1                     | 访问标志   |
| u2             | this_class          | 1                     | 类索引    |
| u2             | super_class         | 1                     | 父类索引   |
| u2             | interfaces_count    | 1                     | 接口数量   |
| u2             | interfaces          | interfaces_count      | 接口索引集合 |
| u2             | fields_count        | 1                     | 字段数量   |
| field_info     | fields              | fields_count          | 字段表    |
| u2             | methods_count       | 1                     | 方法数量   |
| method_info    | methods             | methods_count         | 方法表    |
| u2             | attributes_count    | 1                     | 属性数量   |
| attribute_info | attributes          | attributes_count      | 属性表    |


> 注：类型 u1 表示 1 个字节，带 info 的表示为一张表  
> 分析一个 class 文件可以用 ```javap -verbose som.class``` 命令，没必要自己手动查二进制


1. constant_pool_count（常量池容量）
   * 表示 class 所引用的常量计数，从 1 开始，比如 0x0016 表示 22，代表常量池的引用范围为 1~22。
   * 当为 0 表示「不需要引用任何一个常量池项目」含义
   * 主要为字面常量和符号引用

1. access_flag（访问标志）
   * 标识 Class 是类还是接口，是否定义 public，是否为 abstract，是否 final 等等

1. this_class/super_class/interfaces（类、接口相关索引）
   * 除了 java.lang.Object 外，所有的 java 类的父类索引都不为 0

1. field_info（字段表）
   * 包括类级别变量以及实例级别变量，不包含局部变量
   * 含访问标志、属性索引、描述符
   * 描述符主要描述数据类型、方法参数表、返回值等等

1. method_info（方法表）
   * 结构和 field_info 一致
   * 方法表中的方法体放在「Code」的属性值里
   * 如果子类没有重写（Override）父类的方法，则方法表中就不会出现来自父类的方法信息
   * 编译器会自动添加「\<clinit\>」（类构造器）和「init」（实例构造器）方法
   * Java 语言级别的特征签名只含有方法名称、参数顺序及参数类型，而字节码的特征签名还包括方法返回值以及受检查的异常表

1. attribute_info（属性表）
   * 字段表、方法表均有指向该表的索引
   * Code 是里面比较重要的属性，包含了方法体的字节码，操作数栈等等
   * 异常表描述了从某行到某行如果发生某异常则跳转到某行值处理
   * LineNumberTable 与 LocalVariableTable 分别关联了字节码的行与变量名和源码的映射
   * Signature 属性包含了普通签名和泛型信息，所以即使是泛型擦除机制，通过反射也可以获取泛型的相关信息，但是是有限制的，只能获取 Class 级别的泛型信息，比如静态变量、字段、继承泛型等等，无法获取到局部变量的泛型信息。

### 字节码

[href1]: http://www.hollischuang.com/archives/105
[href2]: http://www.hollischuang.com/archives/110
[href3]: http://www.hollischuang.com/archives/303
[href4]: http://www.hollischuang.com/archives/481
[href5]: http://www.hollischuang.com/archives/1094
[href6]: http://www.hollischuang.com/archives/1047
[href7]: https://www.jianshu.com/p/2a1b2f17d3e4