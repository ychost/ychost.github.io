---
layout: post
title: 《深入理解 Java 虚拟机》 笔记
categories: [笔记]
description: 《深入理解 Java 虚拟机》一书的笔记
keywords: Jvm, 笔记
tags: [Jvm, 笔记]
excerpt:  《深入理解 Java 虚拟机》一书的笔记
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
1. 指令集
   * boolean、byte、short、char 的操作都会扩展为 int 的操作

1. 加载和存储指令
   * 将数据在栈帧中的局部变量表和操作数栈之间来回传输
   * 局部变量->操作数栈：iload、iload\<n\>、fload、fload_\<n\>...
     > iload_0 与操作数为 0 时的 iload 指令语义完全一致
   * 操作数栈->局部变量：istore、istore_\<n\>...
   * 常量->操作数栈 bipush...

1. 运算指令
   * 两个操作数栈的的值进行某种特定的运算
   * iadd、isub、imul、idiv、irem、ineg...
   * 浮点数严格遵循 IEEE 754，取整的时候向令舍入模式丢弃小数部分

1. 类型转换指令
   * 将两个不同的数值类型进行相互转换，窄化转换不抛异常

1. 对象创建与访问指令 
   * new、newarray、anewarray...

1. 操作数栈管理指令
   * pop、pop2、dup、dup2 ...

1. 控制转移指令
   * 让虚拟机有条件或者无条件地从指定位置的指令
   * ifeq、goto、iflt...

1. 方法调用和返回指令
   * invokevirutal、invokeinterface、ireturn、freturn、return(void 的时候) ...

1. 异常处理指令 
   * athrow，用异常表匹配来完成异常处理

1. 同步指令
   * synchronized

## 虚拟机类加载机制
### 类加载过程
__类加载生命周期__  

加载->连接->初始化->使用->卸载  
> 连接阶段包括：验证->准备->解析  
> 注：各个阶段可能交叉进行，并非严格准守该流程

1. 加载
   * 通过类的全限定名获取此类的二进制流
   * 将字节流所代表的静态存储结构转化为方法区运行时数据结构
   * 在内存中生成代表这个类的 java.lang.Class 对象，作为这个类的各个数据在方法区的入口

   如果加载的时候数组，则有所区别，数组本身不通过类加载器创建它是由 newarray 指令直接创建

1. 验证   
确保 Class 文件的字节流中包含的信息符合当前虚拟机的要求，且不会危害虚拟机自身的安全 
   * 文件格式验证，验证文件二进制是否符合 JVM 规范
   * 元数据验证，语义分析验证，验证该类是否有父类，是否继承了 final 类，是否实现完所有接口方法等等
   * 字节码验证，确定程序语义是合法的，保证跳转指令不会跳转到方法体以外，保证类型转换有效等等
   * 符号引用验证，类型匹配校验，全限定名是否能找到对应的类、引用的权限时候可被当前类访问等等

1. 准备  
正式为类变量分配内存并设置初始值（设置默认值）

   ```java
//在准备阶段分配内存并设置 val 的值为 0 而不是123
public static int val = 123
//在准备阶段直接设置 val 的值为 123 的常量值
public static final int val = 123
   ```

1. 解析  
将常量池内的符号引用替换为直接引用
   * 符号引用：符号可以是一组描述所引用的目标只要能定位到目标即可
   * 直接引用：可以直接指向目标的指针、或者间接定位到目标的句柄
   * 对同一符号引用进行多次解析虚拟机会缓存解析结果，但是对 invokedynamic（目前 java 语言不生成这条指令） 不成立，该指令为「动态」调用指令只有程序实际运行到该指令解析动作才能进行

   注：转换的前提是方法在真正运行之前有一个可确定的调用版本。

1. 初始化  
开始执行类中定义的 Java 程序代码
   * 执行类构造器 \<clinit\>()「线程安全」，合并类中所有变量赋值动作和静态语句块并执行，虚拟机自动保证父类 \<clinit\>() 限制性，因此第一个被执行的\<clinit\>() 方法为 java.lang.Object
   * \<clinit\>() 的里面的语句顺序为定义的顺序，即下面代码不能通过编译
     ```java
       static class Person {
        static {
            A = 2;                  //给变量赋值可以正常编译通过，但是最后 A 的值仍然为 1
            System.out.println(A);  //会提示「非法向前」引用
         }
         
        public static int A = 1;
      }
     ```

__类初始化条件__

只有如下五中情况会触发类的初始化：
1. 遇到 new、getstatic、putstatic 或者 invokestatic 这 4 条字节码指令
1. 使用 java.lang.reflect 包的方法对类进行反射调用
1. 当一个类初始化的时候发现父类没有初始化则对父类初始化
1. 虚拟机启动时，会自动初始化包含 main() 方法那个类
1. 使用 JDK1.7 时，如果一个 java.lang.invoke.MethodHandle 实例解析结果 REF_getStatic、REF_putStatic、REF_invokeStatic 方法句柄，且这个方法句柄对应的类没有初始化，则需要对其进行初始化

注：声明该类的数组、调用该类的 static final 常量、调用该类父类的 static 变量，均不会对该类进行初始化。

__类初始化顺序__   

1. 父类静态变量
1. 父类静态代码块
1. 子类静态变量
1. 子类静态代码块
1. 父类非静态变量
1. 父类非静态代码块
1. 父类构造函数
1. 子类非静态变量
1. 子类非静态代码块
1. 子类构造函数

### 类加载器
比较两个类是否「相等」，只有这两个类是由同一个类加载器加载的前提下才有意义

#### 双亲委派模型
[深入 Java 核心][href8]
1. 启动类加载器，加载 $JAVA_HOME/lib 目录里面的类
1. 扩展类加载器，加载 $JAVA_HOME/lib/ext 目录里面的类
1. 应用程序类加载器，加载用户自定义的类

如果一个类加载器收到了类加载请求，它首先不会自己去尝试加载这个类，而是把请求委派给父类加载器去完成，每一层类加载器都是如此，只有当父类加载器反馈无法完成这个加载请求，子类加载器才尝试自己去加载。

使用双亲委派模型可以保证类随着它的加载器具备了一个带有优先级的层级，确保了类的唯一性，比如 java.lang.Object 都是通过启动加载器去加载的，如果用户自定义加载器去加载了一个 java.lang.Object 那么系统将会出现多个 Object 类，应用程序将会变得一片混乱。

OSGi 等为了实现模块化热部署破坏了双亲委托机制

## 字节码执行引擎
### 栈帧
栈帧是虚拟机栈的基本元素，栈帧包括：局部变量表、操作数栈、动态连接、方法返回地址和一些额外附加信息。
每次只执行栈顶的栈帧（当前栈帧），如下图所示

[![jvm-stack-frame][img1]][img1]{:data-lightbox="deepin-jvm"}

__局部变量表__  
   * 用于存放方法参数和方法内部定义的局部变量，存放的基本内存单位为 Slot
   * 对于 64 位的数据类型```long```、```double```，虚拟机会以大端模式分配两个连续的 Slot 空间
   * 局部变量表（非静态方法）的第 0 位为实例的引用```this```
   * 里面的 Slot 可以复用，可能会影响到垃圾回收
   * 局部变量表里面的变量不会执行默认初始化操作，所以使用的时候必须先赋值

```java
  // 这里并不能回收 placeholder 因为由于 placeholder 占用的 Slot 可能会被复用，
  //所以 GcRoot 还是保留着对这一部分内存的关联
  public static void main(String[] args){
    {
      byte[] placeholder = new byte[64 * 1024 * 1024];
    }
    System.gc();
  }
  //这里 placeholder 可以被回收，这里用 a 来占用了 placeholder 的 Slot，
  //就可以将 placeholder 的空间给清空
  public static void main(String[] args){
    {
      byte[] placeholder = new byte[64 * 1024 * 1024];
    }
    int a = 0;// 或者使用 placeholder = null;
    System.gc();
  }
```

__操作数栈__  
  * 存放字节码指令和数据
  
__动态连接__  
  * 包含一个指向运行时常量池中该栈帧所属方法的引用，即栈帧可连接到该方法的入口地址

__方法返回地址__  
  * 两种方法可以退出方法，遇到返回的字节码指令和遇到异常
  * 正常返回的时候直接用调用者的 PC 计数器作为返回地址（栈帧中存有调用者的 PC 计数器值）
  * 异常返回的返回地址根据异常表来决定

__附加信息__  
  * 具体的虚拟机可以增加一些没有规范描述的信息到栈中，比如与调试相关的信息等等

### 方法调用
方法调用不是方法执行，它的唯一任务是确定被调用方法的版本（即调用哪个方法），一切方法在 Class 文件里面存储都只是符号引用，而不是实际内存布局中的入口地址，只有在类加载期间，甚至到运行期间才能确定目标方法的直接引用。  

__解析__  
  * 编译时期就确定下来的方法的调用成为解析
  * 主要为静态方法和私有方法两大类，```invokestatic```、```invokespecial``` 都能在编译期确定
  * 静态方法、私有方法、实例构造器、父类方法，它们在类加载的时候就将符号引用解析为直接引用

__分派__  
  1. 静态分派  
虚拟机在重载时是通过变量的静态类型而不是实际类型做为判定依据，该过程是编译可知的，典型应用是方法 __重载__

```java
public class Human{

}
public class Man extends Human{

}
public static void main(String[] args){
  //Human 为变量的静态类型（外观类型）
  //Man   为变量的实际类型
  Human xm= new Man();
  //这里调用的结果为 hey human 
  sayHello(xm);
}

static void sayHello(Man man){
  System.out.println("hey man");
}

static void sayHello(Human hm){
  System.out.println("hey human");
}

```

__动态分派__  
典型应用为方法的 __重写__  ，方法在编译期间未知只有在运行期间才能确定，主要依赖于 ```invokevirtual``` 指令

```java
public abstract class Human{
  public abstract void sayHello();
}

public class Man extends Human{
  public void sayHello(){
    System.out.println("hey man");
  }
}

public class Woman extends Man{
  public void sayHello(){
    System.out.println("hey woman");
  }
}

//这段代码都应该知道结果是啥，这就是典型的动态派发的应用
public static void main(String[] args){
  Human man = new Man();
  Human woman = new Woman();
  man.sayHello();
  woman.sayHello();
  man = woman;
  man.sayHello();
}
```

__单分派与多分派__   
Java 是一门「静态多分派，动态单分派」语言，C# 引入了 ```dynamic```才实现动态多分派，或者使用```new```关键字来覆盖父类方法，也能实现动态多分派。具体区别如下：
* Java
```java
//如果 Son 重写了父类的 sayHello() 那么这里调用的只能是 Son 的 sayHello()
Father son = new Son();
son.sayHello();
```
* C#
```c#
//如果子类 override 父类的 sayHello() 则调用 Son 的 sayHello()
//如果子类 new 父类的 sayHello() 则调用 Father 的 
Father son = new Son();
son.sayHello();
```

__动态调用分派过程__  
采用了虚表法：表中存放着各个方法的实际入口地址，如果某个方法在子类没有重写，那么子类的虚方法表里面的地址入口和父类一致都指向父类的实现入口，如果重写了则分别指向自己方法的入口地址。

### 执行引擎
虚拟机的执行引擎都有解释执行、编译执行两种选择

编译过程

[![jvm-compile-process][img2]][img2]{:data-lightbox="deepin-jvm"}

Java 的指令集是基于栈的，这种指令集相对于基于寄存器的指令集而言，可移植性高、代码相对紧凑但是速度比基于寄存器的指令集慢（完成相同功能的指令数量一般比寄存器架构多）。

## 编译期
__编译器__  
1. 前端编译器： *.java 到 *.class，比如 Javac、ECJ
1. 后端编译器（JIT）： *.class 到机器码，比如 C1、C2
1. 前端提前编译器（AOT）：*.java 到机器码，比如 GCJ、JET

虚拟机设计团队把对性能优化集中到了后端的即时编译器（JIT）

__Javac 的编译过程__  
1. 解析与填充符号表过程
   * 解析：词法分析（字符流转变为 Tokens）、语法分析（生成抽象语法树「AST」)
   * 填充符号表：将符号地址和符号信息填充到表格中，供其它阶段使用，比如语义检查等等
1. 插入注解处理器的注解处理过程
   * 注解可以干涉语法树，当处理了一个注解之后又会回到解析过程，直到所有注解处理完毕
1. 分析与字节码生成过
   * 主要为语义分析（保证符合逻辑），如类型是否匹配、变量使用是否声明、方法每条路径是否有返回值等等
   * 字节码生成：添加```<clinit>()```、```<init>()``` 方法到语法树中  
     注：
     * ```<init>()```、```<init>()```并非的默认构造函数。
     * 这两个方法实际上是一个代码收敛过程，把语句块（```{}```、```static{}```）、变量初始化（实例变量、类变量）、调用父类实例构造器（仅仅是实例，不含```<clinit>()```）收敛到一起。
     * 收敛顺序：父类实例构造器、成员变量、语句块（保证了父类构造器必然先执行）。

[![jvm-javac-process][img3]][img3]{:data-lightbox="deepin-jvm"}

__泛型__  
1. Java 的泛型只存在于源码中，编译后替换为原生类型，并且在相应地方插入了强制转换代码。
1. ```Signature```属性的出现使得擦除仅仅是对方法 Code 属性的字节代码进行擦除，实际上元数据中还保留泛型的信息，这也是我们能通过反射获取参数化类型的根本依据。

__条件编译__  
1. ```c/c++```支持```#ifdef```编译，java 也能实现类似的条件编译。
   ```java
   //源码
    public static void main(String[] args){
      if(true){
        System.out.println("block 1")
      }else{
        System.out.println("block 2");
      }
    }
    //Class 反编译
    public static void main(String[] args){
      System.out.println("block 1");
    }
   ```

   可知，Java 的条件编译是 Java 的一颗语法糖，根据布尔变量值的真假编译器自动将分支不成立的代码块消除掉


## 运行期
### 解释与编译执行

1. 解释执行：启动速度快，空间占用少。
1. 编译执行：执行效率高。（主要编译「热点代码」）
1. 当编译器激进优化的时候，比如内联虚方法，出现了类继承结构改变、「罕见陷阱」时通过逆优化可以回退到解释状态继续执行。
1. 查看虚拟机的运行模式

   [![jvm-java-version][img4]][img4]{:data-lightbox="deepin-jvm"}

   * mixed mode：混合模式（解释 + 编译）
   * interpreted mode：解释
   * compiled mode：编译

1. 分层编译，在程序启动响应速度与运行效率之间达到最佳平衡
   * 第 0 层，程序解释执行，不开启性能监控功能，可触发第 1 层编译。
   * 第 1 层，将字节码编译成本地代码，简单优化，有必要会加入性能监控。
   * 第 2 层，将字节码编译成本地代码，会启用编译耗时较长的优化，甚至不可靠的激进优化。

### 编译对象
1. 热点代码：被多次调用的方法，被多次执行的循环体。
1. 对于两种热点代码，都会编译整个方法（循环体也是编译整个包含循环体的方法）。
1. 热点探测判断方法：
   * 基于采样的热点探测，虚拟机周期检查各个线程栈顶将频繁出现在栈顶的方法定位「热点方法」，该方法简单、高效，但是容易受到线程阻塞等影响。
   * 基于计数器的热点探测，为每个方法建立计数器，当计数超过一定的阈值则为「热点方法」，该方法负责但是更精确可靠。
   * HotSpot 采用的是「基于计数器的热点探测方法」。
1. 方法触发即使编译
  
   [![jvm-jit-process][img5]][img5]{:data-lightbox="deepin-jvm"}

1. 循环体触发即使编译

   [![jvm-jit-for-process][img6]][img6]{:data-lightbox="deepin-jvm"}

### 即时编译优化
__编译优化__  
一些常用的优化手段，以下优化是在虚拟机中进行的，所以并非针对 Java 一门语言
1. 内联：去除方法调用成本（如建立栈帧），让方法膨胀便于后面可以大范围优化
1. 冗余访问消除，将访问公共表达式的进行了消除。
   * 如果一个表达式 E 已经计算过了，而且从之前到现在不会发生变化，那么下次就没必要再去计算 E 了，直接将先前的值代替 E。

   ```java
   //优化前
   y = b.value;
   z = b.value;
   sum = y+z;
   //优化后
   y = b.value;
   z = y;
   sum = y+ z;
   ```
1. 复写传播，将额外的不需要的重复值变量擦除。
   ```java
   //优化前
   y = b.value;
   z = b.value;
   sum = y + z;
   //优化后
   y = b.value;
   y = y;
   sum = y + y;
   ```
1. 擦除无用代码，将完全没有意义或者永远不执行的代码擦除。
   ```java
   //优化前
   y = b.value;
   y = y;
   sum = y + y;
   //优化后
   y = b.value;
   sum = y + y;
   ```

__逃逸分析__  
如果能证明一个对象不会逃逸到方法或线程之外，即别的方法或者线程无法通过任何途径访问到该对象，则可以对这个变量进行一些高效优化。
1. 栈上分配，将对象分配在栈上省去垃圾回收时间，让对象随栈的生命周期一致。
1. 同步消除，线程同步比较耗时，一个变量不会逃逸出线程即线程安全，此时可以消除同步措施。
1. 标量替换，虚拟机原始数据类型（int、long 等值类型以及 reference等）称作标量，如果一个对象能够分解且不会出现逃逸现象，则将该对象的所有成变量恢复到标量访问（有很大概率分配到告诉寄存器中），为后续优化做准备。  
注：该优化手段是目前比较前沿的技术，但是完全准确判断一个对象是否逃逸是比较耗时的，如果分析完发现没几个不逃逸的对象则整体收益不高，所以目前的虚拟机默认都没有开启该优化手段。

## 高效并发

[img1]: /images/post/java/jvm-stack-frame.png
[img2]: /images/post/java/jvm-compile-process.png
[img3]: /images/post/java/jvm-javac-process.png
[img4]: /images/post/java/jvm-java-version.png
[img5]: /images/post/java/jvm-jit-process.png
[img6]: /images/post/java/jvm-jit-for-process.png

[href1]: http://www.hollischuang.com/archives/105
[href2]: http://www.hollischuang.com/archives/110
[href3]: http://www.hollischuang.com/archives/303
[href4]: http://www.hollischuang.com/archives/481
[href5]: http://www.hollischuang.com/archives/1094
[href6]: http://www.hollischuang.com/archives/1047
[href7]: https://www.jianshu.com/p/2a1b2f17d3e4
[href8]: /2018/01/15/deepin-into-java/