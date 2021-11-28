---
layout: post
title: 算法-组合数问题
categories: [算法]
description: "组合数问题，即从一堆数据中选取元素让所选取的元素满足某种关系，求出所有可能的选择方式。
  一般情况为所选取的元素之和为一个定值，然后求解出所有可能的选取方式。"
keywords: 组合数, Java
tags: [组合数, Java]
excerpt: "组合数问题，即从一堆数据中选取元素让所选取的元素满足某种关系，求出所有可能的选择方式。
  一般情况为所选取的元素之和为一个定值，然后求解出所有可能的选取方式。
"
---

## 背景
题目来源于 LeetCode 的 [Combinations][href1] 系列，这里对每种组合数的算法做的一个总结。

---
1. 给定的一个正整数```k```和```n```，从 1..n 中选取数据，求出所有的选取方式，每种选取方式的元素有```k```个，即求$$C_n^k$$的所有组合方式。
   ```
   n = 4   k = 2
   solution:
        [
            [2,4],
            [3,4],
            [2,3],
            [1,2],
            [1,3],
            [1,4],
        ]

   ```

1. 从给定的一个无重复正整数组```nums```中选取元素（ __每个元素可重复选择__ ）使得选取元素之和为定值```target```，求出各种选取方式。
   ```
    nums =  [2,3,6,7]  target = 7
    solution:
        [
            [7],
            [2, 2, 3]
        ]
   ```
1. 从给定正整数组```nums```中选取（ __每个元素只能选一次__ ）使得选取元素之和为定值```target```，求出各种选取方式。（选取方式不能出现重复，比如 [1,1,6] 与 [1,6,1] 重复）
   ```
   nums = [10, 1, 2, 7, 6, 1, 5]  target = 8
   solution:
        [
            [1, 7],
            [1, 2, 5],
            [2, 6],
            [1, 1, 6]
        ]
   ```
1. 给定一个正整数```k```和```n```，候选元素只有 1..9 ，使得从 1..9 中取出```k```个数之和为```n```
   ```
   k = 3  n = 7
   solution:
        [[1,2,4]]

   k = 3  n = 9
   solution:
        [
            [1,2,6], 
            [1,3,5],
            [2,3,4]
        ]

   ```

## 算法

 组合数算法是利用了 DFS 去求出所有满足要求的组合方式，其算法模板如下：
   ```java
void find(List<List<Integer>> result,
         int[] candidates,
         List<Integer> values, 
         int index,
         int reserve ){
        //这里是一次取值的终止方式，每次根据实际需要而定
        if(reserve == 0){
            List<Integer> list = new LinkedList<>();
            list.addAll(values);
            result.add(list);
        }else{
            for(int i=index;i<candidates.length;i++){
                if(candidates[i] <= reserve){
                    values.add(candidates[i]);
                    //这里可以决定是否一个元素可重复取，传入 i+1 则不能重复取，
                    find(result,candidates,values,i+1,reserve-candidates[i]);
                    //每次 nums[i] 取了之后，下一次回到这里的时候 nums[i] 就不能用了
                    values.remove(values.size() - 1);
                    //这里决定是否要取出重复选取方式比如：[6,1,6] 与 [6,6,1] 这种重复方式
                    while(i<candidates.length -1 && candidates[i] ==candidates[i+1]){
                        ++i;
                    }
                }
            }
        }
    }
   ```
1. 这里是以问题 3 为基础的算法模板，其它问题可在此模板上面修改。
1. 比如问题 2 与问题 3 的区别就是 __数组本身就是无重复的__ 且 __每个元素可以取多次__   
   那么修改如下：
   ```java
         //这里传入了 i+1 表明 nums[i] 只能取一次，下一次就是下一个元素了
     find (result,candidates,values,i+1,reserve-candidates[i]);
         //这里传入与上上一次相同的 i 表明 nums[i] 还能取 
     find (result,candidates,values,i,reserve - candidates[i]);

   ```

1. 问题 4 与问题 2 的区别就是 __指定了选取方式里面的元素必须为 k 个__ 与 __候选元素只有 1..9__  

   * 修改传参
     ```java
        void find(List<List<Integer>> result,
            int[] candidates,
            List<Integer> values, 
            int index,
            int reserve )

        //这里没有指定数组，但是指定了元素个数只能为 k 个 
        void find(List<List<Integer>> result,
                List<Integer> values,
                int index,int k,
                int reserve)
     ```

   * 修改终止条件
    ```java
        if (reserve == 0)
        //这里不但要求和满足条件，且元素个数也要满足条件
        if (reserve == 0 && values.size() == k) 
    ```
   * 修改迭代，这里就没有 nums 了，有的只有 1..9 
    ```java
    for (int i=index;i<nums.length;i++)
    //这里就变成 1..9 的迭代
    for(int i =index;i<=9;i++)
    ```

## 解法
1. 模板中的以下地方会根据需要进行修改
   * 终止条件
   * 是否允许一个元素取多次
   * 是否需要对数组去重
   * 下一次取数的迭代方法
   
1. 根据以上思路，很快就能解决上述的所有问题，这里就不列出每个问题的具体实现了，百度 LeetCode Combinations 会有各路大神的实现方式，究其根本是一致的。

[href1]: https://leetcode.com/problems/combination-sum/