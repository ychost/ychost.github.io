---
layout: post
title: 算法-广度优先
categories: [算法]
description:  广度优先遍历是连通图的一种遍历策略。因为它的思想是从一个顶点V0开始，辐射状地优先遍历其周围较广的区域，故得名。
keywords: 算法, 广度优先, BFS
tags: [算法, 广度优先, BFS]
excerpt: 广度优先遍历是连通图的一种遍历策略。因为它的思想是从一个顶点V0开始，辐射状地优先遍历其周围较广的区域，故得名。
---

算法可视化 [连接][href1]

## 广度优先
广度优先遍历是连通图的一种遍历策略。因为它的思想是从一个顶点V0开始，辐射状地优先遍历其周围较广的区域，故得名。

广度优先一般解决图论、矩阵等求通过与周围点的不断比较从而得出最优解的一个过程。比如：走迷宫、求最优路径、扫雷标记等等

其基本思路如下：  
1. 建立一个```queue```（LinKedList 或者 PriorityQueue）和一个标记数组（或者是 Map）
1. 将搜索的起始点放入队列
1. 遍历```queue```，将 ```header``` 出队，然后遍历```header```的周围节点（未被访问过的节点）符合条件的节点放入队尾巴
1. 在```queue```遍历的过程中匹配当前节点是否满足答案所需，如满足则返回答案，不满足继续遍历


### 分层遍历二叉树
给定一个二叉树，返回一个```Map<Integer,List<Integer>>```，其中 key 为层号（root 层为 0，往下依次 +1）,value 为该层从左到右的节点组成的链表
```java
class TreeNode{
    public int data;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int data,TreeNode left,TreeNode right){
        this.left = left;
        this.right = right;
        this.data = data;
    }
}

public Map<Integer, List<Integer>> travelTreeByLevel(TreeNode root) {
    Map<Integer, List<Integer>> map = new HashMap<>();
    if (root == null) {
        return map;
    }
    //建立一个遍历队列
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    int level = 0;
    //遍历队列
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> list = new LinkedList<>();
        //遍历队列的每一层
        for (int i = 0; i < size; i++) {
            TreeNode cur = queue.poll();
            //符合条件的加入队列，等待下一层遍历
            if (cur.left != null) {
                queue.offer(cur.left);
            }
            //先是添加左节点，再添加右节点
            if (cur.right != null) {
                queue.offer(cur.right);
            }
            list.add(cur.data);
        }
        map.put(level, list);
        level += 1;
    }
    return map;
}
```
### 例题
<div class="example" search="广度优先">

[href1]: https://www.cs.usfca.edu/~galles/visualization/BFS.html