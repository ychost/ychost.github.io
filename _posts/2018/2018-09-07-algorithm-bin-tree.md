---
layout: post
title: 算法-二叉树
categories: [算法]
description: 树的逆序，BST转GreaterTree，判断同一颗树，判断是否为子树，Merge 两颗树，树的直径，树的序列化/反序列化等等...
keywords: 算法, 二叉树
tags: [Java, 二叉树]
excerpt: 树的逆序，BST转GreaterTree，判断同一颗树，判断是否为子树，Merge 两颗树，树的直径，树的序列化/反序列化等等...
---

### 背景
这是一个关于二叉树的一些算法题目，主要来源于 LeetCode

1. 判断同一颗树，[100. Same Tree](https://leetcode.com/problems/same-tree/description/)
   ```
    Input:    1         1
             / \       / \
            2   3     2   3

           [1,2,3],   [1,2,3]

    Output: true
   ```
1. 判断是否为子树，[572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/description/)
   ```
   Given tree s:

          3
         / \
        4   5
       / \
      1   2
    Given tree t:
       4 
      / \
     1   2
    Return true, because t has the same structure and node values with a subtree of s.
   ```

1. 树的直径，树的两个节点的最大距离，[543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/description/)
   ```
          1
         / \
        2   3
       / \     
      4   5  

    Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].
    Note: The length of path between two nodes is represented 
          by the number of edges between them.
   ```

1. 树的路径和，找出所有路径和为给定值得总量 [437. Path Sum III](https://leetcode.com/problems/path-sum-iii/description/)

   ```
   root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

          10
         /  \
        5   -3
       / \    \
      3   2   11
     / \   \
    3  -2   1
    Return 3. The paths that sum to 8 are:
    1.  5 -> 3
    2.  5 -> 2 -> 1
    3. -3 -> 11
   ```  

