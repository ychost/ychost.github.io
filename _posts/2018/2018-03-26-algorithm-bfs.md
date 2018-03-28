---
layout: post
title: 算法-广度优先
categories: [算法]
description:  
keywords: 算法, 广度优先, BFS
tags: [算法, 广度优先, BFS]
excerpt: 
---

## 广度优先

### 伪代码
```
procedure DFS-iterative(G,v):
      let S be a stack
      S.push(v)
      while S is not empty
            v ← S.pop() 
            if v is not labeled as discovered:
                label v as discovered
                for all edges from v to w in G.adjacentEdges(v) do
                    S.push(w)
```
### 打印二叉树
### 最短路径