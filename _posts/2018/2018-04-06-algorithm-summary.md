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

1. 将一个数的二进制状态下最右边的 1 变成 0
```java
num = num & (num - 1)
```

## 树
1. 完全二叉树叶节点个数
```java
//(总的节点数 + 1) / 2 取整
int count = (n+1)/2
```