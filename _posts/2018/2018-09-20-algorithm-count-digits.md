---
layout: post
title: 算法-统计数字区间中 1 出现的次数
categories: [算法]
description: \[1,13] 区间中 1 出现的次数为 5 次分别为 1、10、11、12、13，现在求 [1,n] 区间中 1 出现的次数，推而广之能否求出 [1,n] 区间中任意数字出现的次数
keywords: 算法, 统计, 数字次数
tags: [Java, 数字]
excerpt: \[1,13] 区间中 1 出现的次数为 5 次分别为 1、10、11、12、13，现在求 [1,n] 区间中 1 出现的次数，推而广之能否求出 [1,n] 区间中任意数字出现的次数
---

### 背景
[1,13] 区间中 1 出现的次数为 5 次分别为 1、10、11、12、13，现在求 [1,n] 区间中 1 出现的次数，推而广之能否求出 [1,n] 区间中任意数字出现的次数
[牛客网连接](https://www.nowcoder.com/practice/bd7f978302044eee894445e244c7eee6?tpId=13&tqId=11184&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

### 分析
1. 对于每个位置来说都能把十进制的数分成两部分，比如对于 n=31415952