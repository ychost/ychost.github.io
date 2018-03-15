---
layout: post
title: 动态规划[6]-多重背包问题
categories: [算法]
description: 有 N 种物品和一个容量为 V 的背包。第 i 种物品最多有 n[i] 件可用，每件价值是 p[i]，重量是 w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
keywords: 动态规划,多重背包问题
tags: [动态规划, 多重背包问题]
excerpt: 有 N 种物品和一个容量为 V 的背包。第 i 种物品最多有 n[i] 件可用，每件价值是 p[i]，重量是 w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
---
<style>
.MathJax {
    font-size: 0.7em !important;
}
</style>

### 问题
有 N 种物品和一个容量为 V 的背包。第 i 种物品最多有 n[i] 件可用，每件价值是 p[i]，重量是 w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
> 注：该问题与完全背包一样，只是数量限制的区别，一个限量，一个不限量

### 思路
1. 状态定义：
   ```
    v(i,j) 表示容量为 j，物品个数为 i 的最大价值
    k[i], p[i], w[i] 分别表示每件物品的数量、价值、重量
   ```
1. 状态转移：  
$$
V(i,j) = \begin{cases}
0　　i=0 或 j=0  \\
 max \begin{cases}
    V[i-1,j-w(i) \times k(i)] + p(i) \times k(i) & j \geq w(i) \times k(i) 与 k(i) \leq n(i) \\
    V(i-1,j) &  j < w(i) \times k(i) 或 k(i) > n(i) \\
\end{cases}
\end{cases}
$$

### 实现
```java
//
```

