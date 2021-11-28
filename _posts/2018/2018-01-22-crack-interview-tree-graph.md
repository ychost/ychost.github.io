---
layout: post
title: 程序员面试宝典 第5版 树与图
categories: [刷题]
description:  程序员面试宝典 第5版本 树与图习题解答，主要是 Java 部分的解答
keywords: 面试,刷题,Java
tags: [刷题,Java,Tree]
excerpt: "程序员面试宝典 第5版本 树与图列习题解答，主要是 Java 部分的解答"
---
##### 数据结构
```java
class BinTree {
    public Object data;
    public BinTree left;
    public BinTree right;
}
```

##### 第 1 题
 现一个函数检查一颗二叉树是否平衡  
```java
public class TreeAndGraph{
    /**
    * 第 4.1 题，检查一颗二叉树是否平衡
    */
    public static boolean isAVL(BinTree root) {
        if (root == null) {
            return true;
        }
        int hightDiff = getTreeHight(root.left) - getTreeHight(root.right);
        if(hightDiff > 1 || hightDiff < -1){
            return false;
        }
        return isAVL(root.left) && isAVL(root.right);
    }

    /**
        * 获取树的深度
        */
    public static int getTreeHight(BinTree node) {
        if (node == null)
            return 0;
        return Math.max(getTreeHight(node.left), getTreeHight(node.right)) + 1;
    }
}
```