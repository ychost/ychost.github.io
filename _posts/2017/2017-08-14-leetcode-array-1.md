---
layout: post
title: 「LeetCode」Array系列 1：Array Partition I [Easy] 
categories: [刷题]
description: LeetCode小白刷题记录，总结刷题经验,Array Topics
keywords: LeetCode,刷题,面试,Array Topics
tags: [LeetCode, 刷题, Array]
---

### Array Partition I

1. 难度：Easy

1. [原文][href1]

    > Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.

    > Example 1:

    > Input: [1,4,3,2]

    > Output: 4

    > Explanation: n is 2, and the maximum sum of pairs is 4 = min(1, 2) + min(3, 4).

    > Note:

    > 1. n is a positive integer, which is in the range of [1, 10000].

    > 2. All the integers in the array will be in the range of [-10000, 10000].

1. 翻译

    > 输入：一个长度为 2n 的数组

    > 输出：分成n个小组满足如下条件

      1. 取每组中的最小值然后求和，满足求的和是最大值
      1. 返回这个最大的和
    
    > 注意：
      
      1. n 的范围为 [1,10000] 的整数
      1. 数组元素的范围为 [-10000,10000]

1. 举例

    > 输入：[1,4,3,2]

    > 输出：4 = \\(min(1, 2) + min(3, 4)\\)

### 解法

1. 先对数组进行排序，然后取\\((a_i,a_{i+1})\\) (i 为偶数) 为一组，显然该分组满足条件

   ```go
        func arrayPairSum(nums []int) int {
            sort.Ints(nums)
            sum := 0 
            for i:=0;i<len(nums);i+=2{
                sum +=nums[i]
            } 
            return sum
        }
   ```
2. 调用系统的排序方式很耗时间，所以直接用一大数组来达到排序的效果，数组的序号为 ```nums[i]```，值为 ```nums[i]``` 在数组中出现的次数，然后求 Sum

    > 注：该解法只能在 n 的范围确定，数组元素的范围确定的情况下

   ```go
     func arrayPairSum2(nums []int) int {
        var hashArr [20001]int
        for i := 0; i < len(nums); i++ {
            //nums[i] 可能为负数
            hashArr[nums[i] + 10000]++
        }

        ans, flag := 0, 0
        for i := 0; i < len(hashArr); {
            //等同于排序后求 sum += nums[i];i+=2
            if hashArr[i] > 0 && flag == 0 {
                ans = ans + i - 10000
                hashArr[i]--
                flag = 1
            } else if hashArr[i] > 0 && flag == 1 {
                hashArr[i]--
                flag = 0
            } else {
                i++
            }
        }

        return ans

    }   
   ```

### 总结

1. 当问题划定取值范围的时候，可以只考虑范围的极限而不用考虑所有普通情况
2. 在给定范围中排序，可以用数组序号这种方式

[href1]: https://leetcode.com/problems/array-partition-i/description/ 