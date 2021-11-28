---
layout: post
title: 动态规划[10]-Counting Bits
categories: [刷题]
description:  Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.
keywords: 动态规划, Counting Bits, LeetCode
tags: [动态规划,LeetCode,Medium]
excerpt: Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.
---

### 题目

```
Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Example:
For num = 5 you should return [0,1,1,2,1,2].

Follow up:

It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.
Credits:

给定一个非负的整数 num, 求出 [0,num] 区间所有整数的 1 的个数并以数组的形式返回
注：不要使用内置函数如：__builtin_popcount 等等
```

### 思路
这是一个找规律的题，不放将 [0,15] 的所有数的 1 的个数列举出来

```
0  0000    0   = 0
-------------
1  0001    1   = 1
-------------
2  0010    1   = 1 + dp[0]
3  0011    2   = 1 + dp[1]
-------------
4  0100    1   = 1 + dp[0]
5  0101    2   = 1 + dp[1]
6  0110    2   = 1 + dp[2]
7  0111    3   = 1 + dp[3]
-------------
8  1000    1   = 1 + dp[0]
9  1001    2   = 1 + dp[1]
10 1010    2   = 1 + dp[2]
11 1011    3   = 1 + dp[3]
12 1100    2   = 1 + dp[4]
13 1101    3   = 1 + dp[5]
14 1110    3   = 1 + dp[6]
15 1111    4   = 1 + dp[7]
-------------
...

可以看到当数为 2 的幂的时候值为 1，
当数不为 2 的幂的时候值为 1+dp[diff]，其中 diff=n-nearest。
nearest 是离 n 最近的 2 的幂，比如当 n=20 的时候 nearest = 16

```

### 实现
```java
class Solution {
    public int[] countBits(int num) {
        int[] dp = new int[num+1];
        int index = 0;
        for(int i=1;i<=num;i++){
            if((i&(i-1)) == 0){
               index = 0;
            }
            dp[i] = 1+dp[index++];
        }
        return dp;
    }
}
```

### 另一种高效解法
1. 该算法十分高效且理解起来十分简单
1. 对于一个数 i，它里面含有的 1 的个数 dp[i] 肯定等于 dp[i>>2] 的个数加上 i 最后一个是否为 1

```java
class Solution{
    public int[] countBits(int num){
        int[] dp = new int[num+1];
        for(int i=1;i<=num;i++){
            dp[i] = dp[i>>2]+(i&1);
        }
        return dp;
    }
}

```