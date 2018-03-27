---
layout: post
title: 广度优先[1]-Course Schedule
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
        List<Set<Integer>> list = new ArrayList<>(numCourses);
        //点与之所指向的点集合
        for (int i = 0; i < numCourses; i++) {
            list.add(new  HashSet<>());
        }
        //每个点的入度
        int[] preNums = new int[numCourses];
        for (int i = 0; i < prerequisites.length; i++) {
            int pre = prerequisites[i][1];
            int post = prerequisites[i][0];
            //过滤掉重复的边
            if(list.get(pre).add(post)){
                 preNums[post] += 1;
            }                     
        }
        Queue<Integer> queue = new LinkedList<>();
        //将入度为 0 的节点放入队列
        for(int i =0;i<preNums.length;i++){
            if(preNums[i] == 0){
                queue.offer(i);
            }
        }
        int count = numCourses;
        while(!queue.isEmpty()){
            Integer index = queue.poll();
            Set<Integer> set = list.get(index);
            //删除该点为起点的所有边
            //即：将指向的节点的入度 -1
            for(Integer v:set){
                if(--preNums[v] == 0){
                    queue.offer(v);
                }
            }
            --count;
        }
        //是否所有点的入度都为 0
        return  count == 0;
    }
```

### 进阶
输出拓扑排序，即满足无环要求的节点顺序数组

> 注：直接将入度为 0 的数据依次添加到数组中即可，如果最后所有的数据都添加进来了则会生成一个满足条件的序列，如果未添加完全则返回空数组。

```java
  public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<Set<Integer>> list = new ArrayList<>(numCourses);
        for (int i = 0; i < numCourses; i++) {
            list.add(new HashSet<>());
        }
        int[] preNums = new int[numCourses];
        for (int i = 0; i < prerequisites.length; i++) {
            int post = prerequisites[i][0];
            int pre = prerequisites[i][1];
            if (list.get(pre).add(post)) {
                preNums[post] += 1;
            }
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < preNums.length; i++) {
            if (preNums[i] == 0) {
                queue.add(i);
            }
        }
        int[] array = new int[numCourses];
        int count = 0;
        while (!queue.isEmpty()) {
            int pre = queue.poll();
            array[count++] = pre;
            Set<Integer> set = list.get(pre);
            for (Integer p : set) {
                if (--preNums[p] == 0) {
                    queue.add(p);
                }
            }
        }
        return count == numCourses ? array : new int[0];
    }
```