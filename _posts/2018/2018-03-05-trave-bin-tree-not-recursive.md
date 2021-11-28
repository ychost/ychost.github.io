---
layout: post
title: 使用非递归的方式遍历二叉树
categories: [数据结构]
description: 二叉树的遍历是了解二叉树的基本算法，传统的遍历都是基于递归的形式，该形式实现简单且容易理解。递归都是基于函数栈来实现的，所以任何递归都能转换成非递归的形式即自己手动维护栈的方式来实现同样的算法。
keywords: 二叉树, 非递归, 遍历
tags: [二叉树, 非递归, 遍历]
excerpt: 二叉树的遍历是了解二叉树的基本算法，传统的遍历都是基于递归的形式，该形式实现简单且容易理解。递归都是基于函数栈来实现的，所以任何递归都能转换成非递归的形式即自己手动维护栈的方式来实现同样的算法。
---
### 前序遍历
前序遍历相对比较简单，将先弹出父节点，然后放入右节点，再放入左节点即可
```java
/**
 * 非递归先序遍历二叉树
 *
 * @param root 二叉树根节点
 */
static void preOrderTravelByStack(BinTreeNode root, Consumer<BinTreeNode> action) {
    var stack = new Stack<BinTreeNode>();
    if (root != null) {
        stack.push(root);
        while (!stack.isEmpty()) {
            var node = stack.pop();
            if (action != null) {
                action.accept(node);
            }
            if (node.getRight() != null) {
                stack.push(node.getRight());
            }
            if (node.getLeft() != null) {
                stack.push(node.getLeft());
            }
        }
    }
    System.out.println();
}
```
### 中序遍历
中序遍历的实现思路就是模仿递归的形式，先遍历最左边的节点，然后打印，然后弹出来遍历右边的节点，然后又不断遍历左边的节点
```java
/**
 * 非递归中序遍历二叉树
 *
 * @param root 二叉树根节点
*/
static void inOrderTravelByStack(BinTreeNode root, Consumer<BinTreeNode> action) {
    var stack = new Stack<BinTreeNode>();
    var head = root;
    while (!stack.isEmpty() || head != null) {
        if (head != null) {
            stack.push(head);
            head = head.getLeft();
        } else {
            head = stack.pop();
            action.accept(head);
            head = head.getRight();
        }
    }
}
```
### 后续遍历
后续遍历相对比较复杂，这里采用两个栈 s1, s2 来实现
1. 将 head 压入 s1
1. 从 s1 弹出节点 cur, 将 cur 的 left 和 right 压入 s1, 将 cur 压入 s2
1. 不断重复上面的过程，直到 cur 为空
1. 从 s2 弹出的顺序就是后续遍历的顺序
```java
 /**
  * 非递归后续遍历二叉树
  *
  * @param root   二叉树的根节点
  * @param action 遍历算法的指针
  */
static void postOrderTravelByStack(BinTreeNode root, Consumer<BinTreeNode> action) {
    var stack1 = new Stack<BinTreeNode>();
    var stack2 = new Stack<BinTreeNode>();
    var head = root;
    stack1.push(head);
    while (!stack1.isEmpty()) {
        head = stack1.pop();
        if (head.getLeft() != null) {
            stack1.push(head.getLeft());
        }
        if (head.getRight() != null) {
            stack1.push(head.getRight());
        }
        stack2.push(head);
    }

    while (!stack2.isEmpty()) {
        action.accept(stack2.pop());
    }
}
```
