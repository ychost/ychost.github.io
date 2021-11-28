---
layout: post
title: 算法-总结
categories: [Private]
description: 一些常用的算法归类，即一些常用的算法技巧 
keywords: 算法, Java
tags: [算法, Java]
excerpt: "总结的一些常用的算法技巧"
---

## 位运算
1. 判断是否为 2 的幂
```java
(num & (num-1)) == 0
```
1. 判断一个数是否为偶数
```java
(num & 1) == 0
```
1. 将一个数乘除 2
```java
// 乘2
num << 1
// 除2，注意是否需要最高位，否则用 >>>
num >> 1
```

1. 将一个数的二进制状态下最右边的 1 变成 0
```java
num = num & (num - 1)
```
1. 将一个字符改变大小写
```java
ch = (char)(ch ^ 32)
```

## 树
1. 完全二叉树叶节点个数
```java
//(总的节点数 + 1) / 2 取整
int count = (n+1)/2
```

## 其它
1. 32 位 int 的最大值的量级为 $$2 \times 10^9$$
1. 64 位 long 的最大值的量级为 $$2 \times 10^{18}$$
```
辅助记忆 2*9 = 18
```