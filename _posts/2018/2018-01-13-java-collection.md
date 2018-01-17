---
layout: post
title: java 集合继承关系图
categories: [后端]
description: Java 中基于 Collection 类的继承关系，以及各个继承类的异同点
keywords: Java, 集合关系
tags: [Java, Collection]
repost: ["java集合继承关系图", "https://www.cnblogs.com/jing99/p/7057245.html"]
---
本文主要介绍 Java 中继承自 Collection 的各个类之间的关系、异同点、常用方法等，以及 Collection 与 Collections 的区别

面向对象语言对事物的体现都是以对象的形式，所以为了方便对多个对象的操作，就对对象进行存储，集合就是存储对象最常用的一种方式。

数组虽然也可以存储对象，但长度是固定的；集合长度是可变的，数组中可以存储基本数据类型，集合只能存储对象。

集合类的特点：集合只用于存储对象，集合长度是可变的，集合可以存储不同类型的对象。

[![collection-struct][img1]][img1]{:data-lightbox="collection"}
[![collection-impl][img2]][img2]{:data-lightbox="collection"}

　　上述类图中，实线边框的是实现类，比如ArrayList，LinkedList，HashMap等，折线边框的是抽象类，比如AbstractCollection，AbstractList，AbstractMap等，而点线边框的是接口，比如Collection，Iterator，List等。

### 1、 Iterator接口

　Iterator接口，这是一个用于遍历集合中元素的接口，主要包含hashNext(),next(),remove()三种方法。它的一个子接口LinkedIterator在它的基础上又添加了三种方法，分别是add(),previous(),hasPrevious()。也就是说如果是先Iterator接口，那么在遍历集合中元素的时候，只能往后遍历，被遍历后的元素不会在遍历到，通常无序集合实现的都是这个接口，比如HashSet，HashMap；而那些元素有序的集合，实现的一般都是LinkedIterator接口，实现这个接口的集合可以双向遍历，既可以通过next()访问下一个元素，又可以通过previous()访问前一个元素，比如ArrayList。

　　抽象类的使用。如果要自己实现一个集合类，去实现那些抽象的接口会非常麻烦，工作量很大。这个时候就可以使用抽象类，这些抽象类中给我们提供了许多现成的实现，我们只需要根据自己的需求重写一些方法或者添加一些方法就可以实现自己需要的集合类，工作流昂大大降低。

### 2、Collection （集合的最大接口）继承关系

　　——List　可以存放重复的内容

　　——Set　　不能存放重复的内容，所以的重复内容靠hashCode()和equals()两个方法区分

　　——Queue　　队列接口

　　——SortedSet　　可以对集合中的数据进行排序

　　Collection定义了集合框架的共性功能。

[![collection-func][img3]][img3]{:data-lightbox="collection"}

　　add方法的参数类型是Object。以便于接收任意类型对象。

　　集合中存储的都是对象的引用(地址)。

### 3、List的常用子类
　　特有方法。凡是可以操作角标的方法都是该体系特有的方法。

[![collection-impl-func][img4]][img4]{:data-lightbox="collection"}

　　——ArrayList 　　线程不安全，查询速度快

　　——Vector　　线程安全，但速度慢，已被ArrayList替代

　　——LinkedList　　链表结果，增删速度快

### 4、Set接口

　　Set：元素是无序(存入和取出的顺序不一定一致)，元素不可以重复。  
　　——HashSet:  
　　　　底层数据结构是哈希表。是线程不安全的。不同步。  
　　　　HashSet是如何保证元素唯一性的呢？  
　　　　是通过元素的两个方法，hashCode和equals来完成。  
　　　　如果元素的HashCode值相同，才会判断equals是否为true。  
　　　　如果元素的hashcode值不同，不会调用equals。  

　　　　注意,对于判断元素是否存在，以及删除等操作，依赖的方法是元素的hashcode和equals方法。  

　　——TreeSet：

　　　　有序的存放：TreeSet　　线程不安全，可以对Set集合中的元素进行排序  

　　　　通过compareTo或者compare方法来保证元素的唯一性，元素以二叉树的形式存放。

### 5、Object类

　　在实际开发中经常会碰到区分同一对象的问题，一个完整的类最好覆写Object类的hashCode()、equals()、toString()三个方法。

### 6、集合的输出

　　——4种常见的输出方式

　　——Iterator： 迭代输出，使用最多的输出方式

　　——ListIterator： Iterator的子接口，专门用于输出List中的内容

　　——Enumeration

　　——foreach

　　在迭代时，不可以通过集合对象的方法操作集合中的元素，因为会发生ConcurrentModificationException异常。所以，在迭代器时，只能用迭代器的放过操作元素，可是Iterator方法是有限的，只能对元素进行判断，取出，删除的操作，如果想要其他的操作如添加，修改等，就需要使用其子接口，ListIterator。该接口只能通过List集合的listIterator方法获取。

### 7、Map接口

　　Correction、Set、List接口都属于单值的操作，而Map中的每个元素都使用key——>value的形式存储在集合中。

　　Map集合：该集合存储键值对。一对一对往里存。而且要保证键的唯一性。

[![map-func][img5]][img5]{:data-lightbox="collection"}

### 8、Map接口的常用子类

　　Map
　　——HashMap：底层是哈希表数据结构，允许使用 null 值和 null 键，该集合是不同步的。将hashtable替代，jdk1.2.效率高。
　　——TreeMap：底层是二叉树数据结构。线程不同步。可以用于给map集合中的键进行排序。

### 9、集合工具类

　　Collections:集合框架的工具类。里面定义的都是静态方法。

　　Collections和Collection有什么区别？  
　　　　Collection是集合框架中的一个顶层接口，它里面定义了单列集合的共性方法。  
　　　　　　它有两个常用的子接口，  
　　　　　　——List：对元素都有定义索引。有序的。可以重复元素。  
　　　　　　——Set：不可以重复元素。无序。  

　　　　Collections是集合框架中的一个工具类。该类中的方法都是静态的。  
　　　　　　提供的方法中有可以对list集合进行排序，二分查找等方法。  
　　　　　　通常常用的集合都是线程不安全的。因为要提高效率。  
　　　　　　如果多线程操作这些集合时，可以通过该工具类中的同步方法，将线程不安全的集合，转换成安全的
### 10、比较
[![collection-diff][img6]][img6]{:data-lightbox="collection"}

### 11、总结：

　　List：add/remove/get/set。

　　　　1，ArrayList：其实就是数组，容量一大，频繁增删就是噩梦，适合随机查找；

　　　　2，LinkedList：增加了push/[pop\|remove\|pull]，其实都是removeFirst；

　　　　3，Vector：历史遗留产物，同步版的ArrayList，代码和ArrayList太像；

　　　　4，Stack：继承自Vector。Java里其实没有纯粹的Stack，可以自己实现，用组合的方式，封装一下LinkedList即可；

　　　　5，Queue：本来是单独的一类，不过在SUN的JDK里就是用LinkedList来提供这个功能的，主要方法是offer/pull/peek，因此归到这里呢。

　　Set：add/remove。可以用迭代器或者转换成list。

　　　　1，HashSet：内部采用HashMap实现的；

　　　　2，LinkedHashSet：采用LinkedHashMap实现；

　　　　3，TreeSet：TreeMap。

　　Map：put/get/remove。

　　　　1，[HashMap/HashTable][href1]：散列表，和ArrayList一样采用数组实现，超过初始容量会对性能有损耗；

　　　　2，[LinkedHashMap][href2]：继承自HashMap，但通过重写嵌套类HashMap.Entry实现了链表结构，同样有容量的问题；

　　　　3，Properties：是继承的HashTable。

　　　　顺便说一下Arrays.asList，这个方法的实现依赖一个嵌套类，这个嵌套类也叫ArrayList！

[href1]: /2018/01/11/java-hashmap/
[href2]: /2018/01/12/java-linkedhashmap/

[img1]: /images/post/java/collection-struct.png
[img2]: /images/post/java/collection-impl.gif
[img3]: /images/post/java/collection-func.png
[img4]: /images/post/java/collection-impl-func.png
[img5]: /images/post/java/map-func.png
[img6]: /images/post/java/collection-diff.png

