---
layout: post
title: 「MCU 回忆录」第二章 C51 按键驱动
categories: [MCU, 推荐]
description: 按键驱动算是单片机编程的一个入门级的知识，但是想要把一个按键驱动写的优雅而高效并不是那么容易，本文是介绍一种用类似于 Android 编程监听按键的方式来写 C51 的按键驱动
keywords: C51, 按键驱动, 回调
tags: [C51, KeyDriver]

---
　　按键驱动算是单片机编程的一个入门级的知识，但是想要把一个按键驱动写的 「优雅而高效」 并不是那么容易，本文是介绍一种用类似于 Android 编程监听按键的方式来写 C51 的按键驱动，同时这也是本系列 「MCU 回忆录」 的第二章。

### 传统的按键驱动

```flow
st=>start: start:>http://www.baidu.com
op1=>operation: 操作1
cond1=>condition: YES or NO?
sub=>subroutine: 子程序
e=>end

st->op1->cond1
cond1(yes)->e
cond1
```