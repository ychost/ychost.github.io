---
layout: post
title: Java 中 String、StringBuffer和StringBuilder的区别
categories: [后端]
description: Java 中的 String、StringBuffer、StringBuilder 是比较常用的字符串处理类，但是在特定的情况下三种类对字符串的处理效率、安全等方面是不一致的，本文主要分析这三个类之间的异同点
keywords: Java, String, StringBuffer, StringBuilder
tags: [Java,String]
repost: ["kingzone_2008", "http://blog.csdn.net/kingzone_2008/article/details/9220691"]
---
Java 中的 String、StringBuffer、StringBuilder 是比较常用的字符串处理类，但是在特定的情况下三种类对字符串的处理效率、安全等方面是不一致的，本文主要分析这三个类之间的异同点

### 1 String
String：字符串常量，字符串长度不可变。Java中String是immutable（不可变）的。

String类的包含如下定义：

```java
/** The value is used for character storage. */
private final char value[];

/** The offset is the first index of the storage that is used. */
private final int offset;

/** The count is the number of characters in the String. */
private final int count;
```

用于存放字符的数组被声明为final的，因此只能赋值一次，不可再更改。

### 2 StringBuffer（JDK1.0）
StringBuffer：字符串变量（Synchronized，即线程安全）。如果要频繁对字符串内容进行修改，出于效率考虑最好使用StringBuffer，如果想转成String类型，可以调用StringBuffer的toString()方法。

Java.lang.StringBuffer线程安全的可变字符序列。在任意时间点上它都包含某种特定的字符序列，但通过某些方法调用可以改变该序列的长度和内容。可将字符串缓冲区安全地用于多个线程。

StringBuffer 上的主要操作是 append 和 insert 方法，可重载这些方法，以接受任意类型的数据。每个方法都能有效地将给定的数据转换成字符串，然后将该字符串的字符追加或插入到字符串缓冲区中。append 方法始终将这些字符添加到缓冲区的末端；而 insert 方法则在指定的点添加字符。例如，如果 z 引用一个当前内容是"start"的字符串缓冲区对象，则此方法调用 z.append("le") 会使字符串缓冲区包含"startle"，而 z.insert(4, "le") 将更改字符串缓冲区，使之包含"starlet"。

3 StringBuilder（JDK5.0）
StringBuilder：字符串变量（非线程安全）。在内部，StringBuilder对象被当作是一个包含字符序列的变长数组。

java.lang.StringBuilder是一个可变的字符序列，是JDK5.0新增的。此类提供一个与 StringBuffer 兼容的 API，但不保证同步。该类被设计用作 StringBuffer 的一个简易替换，用在字符串缓冲区被单个线程使用的时候（这种情况很普遍）。

其构造方法如下：

|构造方法                        | 描述                                             |
|-------------------------------|--------------------------------------------------|
|StringBuilder()	            |创建一个容量为16的StringBuilder对象（16个空元素）    |
|StringBuilder(CharSequence cs) |创建一个包含cs的StringBuilder对象，末尾附加16个空元素|
|StringBuilder(int initCapacity)|创建一个容量为initCapacity的StringBuilder对象       |
|StringBuilder(String s)	    |创建一个包含s的StringBuilder对象，末尾附加16个空元素 |

在大部分情况下，StringBuilder > StringBuffer。这主要是由于前者不需要考虑线程安全。

### 4 三者区别
String 类型和StringBuffer的主要性能区别：String是不可变的对象, 因此在每次对String 类型进行改变的时候，都会生成一个新的 String 对象，然后将指针指向新的 String 对象，所以经常改变内容的字符串最好不要用 String ，因为每次生成对象都会对系统性能产生影响，特别当内存中无引用对象多了以后， JVM 的 GC 就会开始工作，性能就会降低。

使用 StringBuffer 类时，每次都会对 StringBuffer 对象本身进行操作，而不是生成新的对象并改变对象引用。所以多数情况下推荐使用 StringBuffer ，特别是字符串对象经常改变的情况下。

在某些特别情况下， String 对象的字符串拼接其实是被 Java Compiler 编译成了 StringBuffer 对象的拼接，所以这些时候 String 对象的速度并不会比 StringBuffer 对象慢，例如：

```java
String s1 = "This is only a" + " simple" + " test";
StringBuffer Sb = new StringBuilder("This is only a").append(" simple").append(" test");
```
生成 String s1对象的速度并不比 StringBuffer慢。其实在Java Compiler里，自动做了如下转换：
Java Compiler直接把上述第一条语句编译为：

```java
String s1 = "This is only a simple test";  
```
所以速度很快。但要注意的是，如果拼接的字符串来自另外的String对象的话，Java Compiler就不会自动转换了，速度也就没那么快了，例如：

```java
String s2 = "This is only a";  
String s3 = " simple";  
String s4 = " test";  
String s1 = s2 + s3 + s4;
```

这时候，Java Compiler会规规矩矩的按照原来的方式去做，String的concatenation（即+）操作利用了StringBuilder（或StringBuffer）的append方法实现，此时，对于上述情况，若s2，s3，s4采用String定义，拼接时需要额外创建一个StringBuffer（或StringBuilder），之后将StringBuffer转换为String；若采用StringBuffer（或StringBuilder），则不需额外创建StringBuffer。

### 5 使用策略
（1）基本原则：如果要操作少量的数据，用String ；单线程操作大量数据，用StringBuilder ；多线程操作大量数据，用StringBuffer。

（2）不要使用String类的"+"来进行频繁的拼接，因为那样的性能极差的，应该使用StringBuffer或StringBuilder类，这在Java的优化上是一条比较重要的原则。例如：

```java
String result = "";  
for (String s : hugeArray) {  
    result = result + s;  
}  
  
// 使用StringBuilder  
StringBuilder sb = new StringBuilder();  
for (String s : hugeArray) {  
    sb.append(s);  
}  
String result = sb.toString();  
```
当出现上面的情况时，显然我们要采用第二种方法，因为第一种方法，每次循环都会创建一个String result用于保存结果，除此之外二者基本相同（对于jdk1.5及之后版本）。
（3）为了获得更好的性能，在构造 StringBuffer 或 StringBuilder 时应尽可能指定它们的容量。当然，如果你操作的字符串长度（length）不超过 16 个字符就不用了，当不指定容量（capacity）时默认构造一个容量为16的对象。不指定容量会显著降低性能。

（4）StringBuilder一般使用在方法内部来完成类似"+"功能，因为是线程不安全的，所以用完以后可以丢弃。StringBuffer主要用在全局变量中。

（5）相同情况下使用 StringBuilder 相比使用 StringBuffer 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。而在现实的模块化编程中，负责某一模块的程序员不一定能清晰地判断该模块是否会放入多线程的环境中运行，因此：除非确定系统的瓶颈是在 StringBuffer 上，并且确定你的模块不会运行在多线程模式下，才可以采用StringBuilder；否则还是用StringBuffer。

参考资料：

[http://docs.oracle.com/javase/tutorial/java/data/buffers.html][href1]

[http://docs.oracle.com/javase/specs/jls/se7/html/jls-4.html#jls-4.12.4][href2]

[href1]: http://docs.oracle.com/javase/tutorial/java/data/buffers.html
[href2]: http://docs.oracle.com/javase/specs/jls/se7/html/jls-4.html#jls-4.12.4





