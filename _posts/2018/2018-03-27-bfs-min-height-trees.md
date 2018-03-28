---
layout: post
title: 广度优先[2]-Minimum Height Trees
categories: [刷题]
description: For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.
keywords: BFS, Minimum Height Trees
tags: [BFS, Tree]
excerpt: For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.
---

### 题目

For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.

Format
The graph contains n nodes which are labeled from 0 to n - 1. You will be given the number n and a list of undirected edges (each edge is a pair of labels).

You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

__Example 1:__  
```
Given n = 4, edges = [[1, 0], [1, 2], [1, 3]]

        0
        |
        1
       / \
      2   3
```  
return [1]  


__Example 2:__

```
Given n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]

     0  1  2
      \ | /
        3
        |
        4
        |
        5

```
return [3, 4]



Note:

 (1) According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.”

 (2) The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

 给定一个无向图（树结构），找出树的最小高度的根节点
 > 高度指的是根节点到叶节点的最长边数


### 思路

这题拿到的第一感觉用 BFS 找到每个节点作为根节点的高度，然后取出里面最小高度对应的节点即可，但是这样做的时间复杂度太高不能被 AC。参考了讨论区大神 [dietpepsi][href1] 提供的方法后才得到一个比较优的方法，该方法其实就是剥洋葱，每次剥掉叶节点，直到最后剩下的一个或者两个节点就为最小数的根节点。

1. 找到树的叶节点，将其放入一个 leaves 里面
1. 依次将这些叶节点剥掉，即删除与之关联的边
1. 如果薄掉后与之关联的节点也变成的叶节点，则将其放入一个名为 newLeaves 中
1. 将 leaves 里面节点剥完之后 leaves = newLeaves，重复上述操作，直到最后剩下的节点数为 1 个或者 2 个，即为所求

### 实现
```java
public List<Integer> findMinHeightTrees(int n, int[][] edges) {
    if (n == 1) return Collections.singletonList(0);
    
    List<List<Integer>> list = new ArrayList<>(n);
    for(int i=0;i<n;i++){
        list.add(new LinkedList<>());
    }
    for(int i=0;i<edges.length;i++){
        list.get(edges[i][0]).add(edges[i][1]);
        list.get(edges[i][1]).add(edges[i][0]);
    }
    List<Integer> leaves = new LinkedList<>();
    for(int i=0;i<list.size();i++){
        if(list.get(i).size() == 1){
            leaves.add(i);
        }
    }
    while(n>2){
        //剥掉后更新 n 的值
        n -= leaves.size();
        List<Integer> newLeaves = new LinkedList<>();
        for(Integer node:leaves){
            //将与之关联的 con 节点的关系中删除该节点
            //该节点的关系中没必要删 con，因为该节点已经被剥掉了，不会重复遍历了
            int con = list.get(node).get(0);
            list.get(con).remove(Integer.valueOf(node));
            if(list.get(con).size() == 1){
                newLeaves.add(con);
            }
        }       
        leaves = newLeaves;
    }
    return leaves;  
}   
```



[href1]: https://leetcode.com/problems/minimum-height-trees/discuss/76055/Share-some-thoughts
