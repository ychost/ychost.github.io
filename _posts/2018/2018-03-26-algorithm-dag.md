---
layout: post
title: 算法-拓扑排序
categories: [算法]
description: 有向无环图（Directed Acyclic Graph, DAG）是有向图的一种，字面意思的理解就是图中没有环。常常被用来表示事件之间的驱动依赖关系，管理任务之间的调度。拓扑排序是对DAG的顶点进行排序，使得对每一条有向边(u, v)，均有u（在排序记录中）比v先出现。亦可理解为对某点v而言，只有当v的所有源点均出现了，v才能出现。
keywords: 算法
tags: [拓扑排序, 算法]
excerpt: 有向无环图（Directed Acyclic Graph, DAG）是有向图的一种，字面意思的理解就是图中没有环。常常被用来表示事件之间的驱动依赖关系，管理任务之间的调度。拓扑排序是对DAG的顶点进行排序，使得对每一条有向边(u, v)，均有u（在排序记录中）比v先出现。亦可理解为对某点v而言，只有当v的所有源点均出现了，v才能出现。 
---

算法可视化 [连接][href3]

## 拓扑排序
### 定义
有向无环图（Directed Acyclic Graph, DAG）是有向图的一种，字面意思的理解就是图中没有环。常常被用来表示事件之间的驱动依赖关系，管理任务之间的调度。拓扑排序是对DAG的顶点进行排序，使得对每一条有向边(u, v)，均有u（在排序记录中）比v先出现。亦可理解为对某点v而言，只有当v的所有源点均出现了，v才能出现。

下图给出有向无环图的拓扑排序：
   [![dag-true][img1]][img1]{:data-lightbox="dag"}

下图给出的顶点排序不是拓扑排序，因为顶点```D```的邻接点```E```比其先出现：
   [![dag-false][img2]][img2]{:data-lightbox="dag"}

### 求解步骤
拓扑排序的实现算法有两种：入度表、DFS，其时间复杂度均为 o(V+E)

#### 入度表（BFS）

1. 找出图中 0 入度的顶点；
1. 依次在图中删除这些顶点，删除后再找出0入度的顶点；
1. 然后再删除……再找出……
1. 直至删除所有顶点，即完成拓扑排序
1. 为了保存0入度的顶点，我们采用数据结构栈（亦可用队列）。

#### DFS


### 例题
* [广度优先[1]-Course Schedule][href1]

### 参考文献
* [【图论】有向无环图的拓扑排序][href2]

[img1]: /images/post/algorithm/dag-true.png
[img2]: /images/post/algorithm/dag-false.png

[href1]: /2018/03/25/bfs-course-schedule/
[href2]: https://www.cnblogs.com/en-heng/p/5085690.html
[href3]: https://www.cs.usfca.edu/~galles/visualization/TopoSortIndegree.html