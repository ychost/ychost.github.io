---
layout: post
title: 程序员面试宝典 第5版 链表
categories: [程序员面试宝典,Java]
description: 程序员面试宝典 第5版本 链表习题解答，主要是 Java 部分的解答
keywords: 面试, Java
tags: [面试,Java]
---

程序员面试宝典 第5版本 链表习题解答笔记

##### 数据结构
```java
/**
 * 单向链表
 */
class OneWayNode {
    Object data;
    OneWayNode next;

    public OneWayNode(Object data) {
        this.data = data;
    }
}
```

#####  第 1 题 √
在不使用额外空间的情况下移除未排序链表中的重复节点
> 在不使用额外空间只能用时间换空间，即循环两层，外层为待比较的节点，内层为比较节点后节点的遍历


```java
public class LinkedList { 
    /**
     * 第 2.1 题，在不使用额外空间的情况下删除未排序链表的重复节点
     */
    public static void makeOnWayNodesUnique(OneWayNode header) {
        if (header == null)
            return;
        OneWayNode std = header;
        while (std != null) {
            OneWayNode runner = std;
            while (runner.next != null) {
                //找到重复节点并删除掉
                if (runner.next.data.equals(std.data)) {
                    runner.next = runner.next.next;
                } else {
                    runner = runner.next;
                }
            }
            std = std.next;
        }
    }
}
```

##### 第 2 题 √
找出单向表中的倒数第 K 个节点
> 可以先求出表的长度，然后在顺序找 Length - K 的点

```java
public class LinkedList {
    /**
     * 第 2.2 题，找出单向列表中的倒数第 K 个节点
     */
    public static OneWayNode findKLastNode(OneWayNode header, int k) {
        if (header == null) {
            return null;
        }
        int length = 0;
        OneWayNode cur = header;
        while (cur != null) {
            length += 1;
            cur = cur.next;
        }
        int lst = length - k;
        int count = 0;
        if (lst < 0) {
            return null;
        }
        cur = header;
        while (count != lst) {
            cur = cur.next;
            count += 1;
        }
        return cur;
    }
}
```

##### 第 3 题 √
删除单向表中的某个节点，假定只能访问该节点
> 该方法不能删除尾节点

```java
public class LinkedList {
    /**
     * 第 2.3 题，删除某个节点，假定只能访问该节点
     * 不能删除 Tail 节点
     */
    public static boolean deleteNode(OneWayNode delNode) {
        if (delNode == null || delNode.next == null) {
            return false;
        }
        OneWayNode next = delNode.next;
        delNode.data = next.data;
        delNode.next = next.next;
        return true;
    }
}
```
