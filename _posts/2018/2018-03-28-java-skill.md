---
layout: post
title: Java 实用技巧
categories: [后端]
description: 一些开发过程是常用的技巧
keywords: Java, 技巧
tags: [Java, 技巧]
---

### 集合
1. 利用 List 初始化 Set
```java
List<String> list = new ArrayList<>();
Set<String> set = new HashSet<>(list);
```

1. 数组初始化 List
```java
String[] array = {"a","b"};
List<String> list = Arrays.asList(array);
```

1. 向 map 中添加初始化元素，如果元素存在则不添加
```java
Map<String,String> map = new HashMap<>();
map.putIfAbsent("a","default");
```

1. 利用 Iterator 删除元素避免 fast-fail
```java
List<String> list = new LinkedList<>();
Iterator iter = list.iterator();
iter.removeIf(s->s.equals("a"));
```

1. 将数组快速转换成字符串
```java
int[][] next = \{\{1, 0\}, \{0, 1\}, \{-1, 0\}, \{0, -1\}\};
String s = Arrays.deepToString(next);
System.out.println(s);
//output
//[[1, 0], [0, 1], [-1, 0], [0, -1]]
```
1. 排序
```java
//数组排序
int[] array = new int[3];
Arrays.sort(array);
//List 排序
List<Integer> list = new ArrayList<>();
list.sort((o1,o2)->o1-o2);

```

### 算法
1. 判断一个正整数是否为 2 的幂
```java
(num & (num-1)) == 0
```
1. 将一个字符改变大小写
```java
ch = (char)(ch ^ 32)
```
