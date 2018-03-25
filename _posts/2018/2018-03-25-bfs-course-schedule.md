---
layout: post
title: 广度优先-Course Schedule
categories: [刷题]
description: There are a total of n courses you have to take, labeled from 0 to n - 1. Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair [0,1] Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?
keywords: LeetCode, Course Schedule
tags: [LeetCode, BFS, Graph]
excerpt: There are a total of n courses you have to take, labeled from 0 to n - 1. Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair [0,1] Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?
---

### 题目
There are a total of n courses you have to take, labeled from 0 to n - 1.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

For example:

> 2, [[1,0]]  

There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

> 2, [[1,0],[0,1]]  

There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

Note
   1. The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
   1. You may assume that there are no duplicate edges in the input prerequisites.

给定一个有向图图的边表示矩阵，即 [1,0] 表示 0 到 1 有一条有向边，求图中是否存在环。  
> 注意：给定的矩阵可能存在重复边，即出现两个 [1,0] 

### 思路
1. 将每个节点的入度存进数组
1. 每次遍历取出第一个入度为 0 的节点，然后它指向的所有节点的边
1. 重复以上动作，如果每个节点的入度都为 0，则表示图中不存在环，否者图中存在环

### 实现
```java
 public boolean canFinish(int numCourses, int[][] prerequisites) {  
        //索引为节点号，值为该节点指向的所有节点
        //用 Set 为了过滤掉重复边
        List<Set<Integer>> list = new ArrayList<>(numCourses);
        for (int i = 0; i < numCourses; i++) {
            list.add(new HashSet<>());
        }
        int[] preNums = new int[numCourses];
        for (int i = 0; i < prerequisites.length; i++) {
            //前驱节点
            int pre = prerequisites[i][1];
            //后驱节点
            int post = prerequisites[i][0];
            if (list.get(pre).add(post)) {
                //统计每个节点的入度
                preNums[post] += 1;
            }
        }
        for (int i = 0; i < numCourses; i++) {
            int j = 0;
            //找到第一个入度为 0 的节点
            for (; j < numCourses; j++) {
                if (preNums[j] == 0) {
                    break;
                }
            }
            //遍历完所有节点，没有发现入度为 0 的节点
            if (j == numCourses) {
                return false;
            }
            //j 节点置位，防止下次重复遍历
            preNums[j] = -1;
            //将 j 节点的指向边删除
            //即减小与之相关的所有节点的入度
            Set<Integer> set = list.get(j);
            for (Integer v : set) {
                preNums[v] -= 1;
            }
        }
        return true;
    }
```

