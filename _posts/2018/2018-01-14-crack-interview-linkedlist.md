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

##### 第 4 题
以给定值 x 为基准将链表分为两部分，小于 x 的在前，大于等于 x 的在后  
> 对于链表的划分操作可以建立临时链表保存划分的部分

```java
public class LinkedList {
    /**
     * 第 2.4 题，将链表分成两部分，小于 x 的和不小于 x 的，小于 x 的部分排在前面
     * 构建三条链表：1.小于 x 的部分，2.等于 x 的部分，3. 大于 x 的部分，将三个链表连接起来即可
     */
    public static OneWayNode sortNode(OneWayNode header, OneWayNode xNode) {
        OneWayNode beforeStart = null;
        OneWayNode afterStart = null;
        OneWayNode beforeEnd = null;
        OneWayNode afterEnd = null;
        OneWayNode equalsStart = null;
        OneWayNode equalsEnd = null;
        OneWayNode pointer = header;
        while (pointer != null) {
            if (isSmaller(pointer, xNode)) {
                if (beforeStart == null) {
                    beforeStart = pointer;
                } else {
                    beforeEnd.next = pointer;
                }
                beforeEnd = pointer;
            } else if (isBigger(pointer, xNode)) {
                if (afterStart == null) {
                    afterStart = pointer;
                } else {
                    afterEnd.next = pointer;
                }
                afterEnd = pointer;
            } else if (isEquals(pointer, xNode)) {
                if (equalsStart == null) {
                    equalsStart = pointer;
                } else {
                    equalsEnd.next = pointer;
                }
                equalsEnd = pointer;
            }
            pointer = pointer.next;
        }
        OneWayNode start = header;
        if (afterStart != null) {
            afterEnd.next = null;
            start = afterStart;
        }
        if (equalsStart != null) {
            equalsEnd.next = null;
            equalsEnd.next = afterStart;
            start = equalsStart;
        }
        if (beforeStart != null) {
            beforeEnd.next = null;
            beforeEnd.next = equalsStart;
            start = beforeStart;
        }
        return start;
    }

   /**
     * x 节点值小于 y 节点值
     */
    public static Boolean isSmaller(OneWayNode x, OneWayNode y) {
        int val = x.data.toString().compareTo(y.data.toString());
        return val < 0;
    }

    public static Boolean isEquals(OneWayNode x, OneWayNode y) {
        int val = x.data.toString().compareTo(y.data.toString());
        return val == 0;
    }

    public static Boolean isBigger(OneWayNode x, OneWayNode y) {
        int val = x.data.toString().compareTo(y.data.toString());
        return val > 0;
    }
}
```

##### 第 5 题 √
1->2->3 代表数字 321 求这样含义的两个链表之和的链表  
> 思考，如果用 3->2->1 代表 321 又该如何处理

```java
public class LinkedList {
        /**
     * 第 2.5 题，1->2->3 表示数：321 求这样的两个链表相加的 和 的链表
     */
    public static OneWayNode addTwoIntNode(OneWayNode node1, OneWayNode node2) {
        if(node1 == null || node2 == null){
            return null;
        }
        int carray = 0;
        OneWayNode pointer = null;
        OneWayNode header = null;
        while (node1 != null && node2 != null) {
            Integer val1 = (Integer) node1.data;
            Integer val2 = (Integer) node2.data;
            Integer sum = val1 + val2 + carray;
            Integer ones = sum % 10;
            carray = sum / 10;
            OneWayNode sumNode = new OneWayNode(ones);
            if (pointer == null) {
                pointer = sumNode;
                header = sumNode;
            } else {
                pointer.next = sumNode;
            }
            pointer = sumNode;
            node1 = node1.next;
            node2 = node2.next;
        }
        if (carray > 0) {
            OneWayNode carryNode = new OneWayNode(carray);
            pointer.next = carryNode;
        }

        return header;

    }
}
```