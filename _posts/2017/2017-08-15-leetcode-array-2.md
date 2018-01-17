---
layout: post
title: 「LeetCode」Array系列 2：Plus One [Easy] 
categories: [刷题]
description: LeetCode小白刷题记录，总结刷题经验,Array Topics
keywords: LeetCode,刷题,面试,Array Topics
tags: [LeetCode, 刷题, Array]
---

### Plus One

1. 难度：Easy

1. [原文][href1]

    > Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.
You may assume the integer do not contain any leading zero, except the number 0 itself.
The digits are stored such that the most significant digit is at the head of the list.

2. 翻译

    > 输入：将一个数的每一位拆分而成的数组

    > 输出：将该数+1然后返回同样格式的数组，高位在前

3. 举例

    > 输入：[1,2,9,9,9]

    > 输出：[1,3,0,0,0]

### 解法

1. 这是个很简单的大数+1的算法，如果有进位则只取个位，十位留个高位相加
  
   ```go
    func plusOne(digits []int) []int {
        ansRs := make([]int, 0)
            carry := 1
            mod := 0
            div := 0
            for i := len(digits) - 1; i >= 0; i-- {
                digits[i] = digits[i] + carry
                mod = digits[i] % 10
                div = digits[i] / 10
                ansRs = append(ansRs, mod)
                carry = div
            }
            if carry > 0 {
                ansRs = append(ansRs, carry)
            }
            ans := make([]int, 0)
            for i := len(ansRs) - 1; i >= 0; i-- {
                ans = append(ans, ansRs[i])
            }
            return ans
    }
   ```

### 总结

1. 关于加法进位直接从地位遍历到高位，然后计算两数之和+进位，如果大于10则再将进位值扔给上位

[href1]:https://leetcode.com/problems/plus-one/discuss/