---
layout: post
title: 程序员代码面试指南 链表
categories: [刷题]
description:  程序员代码面试指南 链表 相关部分的题目
keywords: 面试,刷题,Java, LinkedList
tags: [刷题,Java,LinkedList]
excerpt: 程序员面试指南 链表 相关部分的题目
---

#### 环形单链表的约瑟夫问题 ☆☆☆
从头节点开始报数 1 ，下一个节点报数 2...，当报数为 m 的时候删除该节点，然后下一个节点继续报数 1...，求最后存活下来的节点  
输入：一个环形单向链表的头结点 head 和报数的值 m  
输出：最后存活下来的节点，且这个节点自己组成环形单链表，其它节点都删除 
要求：如果链表的节点数为 $$N$$，要求时间复杂度为 $$o(N)$$

__思路：__  
在不考虑时间复杂度的情况可以进行暴力求解，即循环遍历环型链表然后将报数为 m 的节点删除，最后只剩下一个节点的时候即为所求的存活的节点  
当考虑到时间复杂度 $$o(N)$$ 的时候就不能用不断遍历求值的方式了，必须一步到位计算出存活节点的编号，即给定链表长度 size 、报数值 m 的时候就能直接求出最后存活节点的编号 n   
* 找到报数值 $$M$$ 和节点编号 $$N$$ 的关系（头结点编号为 1，下一个节点为 2 ...，链表的长度为 $$L$$，不考虑删除节点）  

|M  |N  |
|:-:|:-:|
|1  |1  |
|2  |2  |
|.. |.. |
|L  |L  |
|L+1|1  |
|L+2|2  |
|.. |.. |

<br/>
不难看出 $$M$$, $$N$$, $$L$$ 之间的关系  
\\[N = (M-1) \% L + 1 \\]

* 在删除节点的情况下，找到长度为 $$L$$ 的时候存活节点与长度为 $$L-1$$ 的存活节点之间的关系（令删除的节点为 $$s$$）

|L  |L-1|
|:-:|:-:|
|.. |.. |
|s-2|L-2|
|s-1|L-1|
|s  | 已经被删除了  |
|s+1|1  |
|s+2|2  |
|.. |.. |

<br/>
不难看出，在长度为 $$L$$ 的报数 $$f(L)$$，与 $$L-1$$的报数 $$f(L-1)$$ 之间的关系
\\[f(L)= (f(L-1)+ s -1) \% L + 1\\]
令报数到 $$x$$ 的被删掉，则被删的节点编号为：
\\[s = (x -1) \% L + 1\\]
可得：  
\\[f(L) = (f(L-1) + (x - 1)\% L) \%L +1\\]
可知，上面的关系式为一个递推的关系式，特别地，如果 $$L == 1$$，那么存活的节点也为 $$1$$
在 $$o(N)$$ 的时间内直接获得存活节点的代码如下
````java
    /**
     * 使用递归的方式直接获取约瑟夫问题中存活的节点编号
     *
     * @param size 单向链的长度
     * @param num  报数
     * @return 唯一存活的节点编号
     */
    static int getAliveNum(int size, int num) {
        if (size == 1) {
            return 1;
        }
        //长度为 size 与 (size-1) 存活节点编号的关系
        return (getAliveNum(size - 1, num) + (num - 1) % size) % size + 1;
    }
````
附完整代码：

```java
/**
 * 环形单链表的约瑟夫问题
 *
 * @author ychost
 * @date 2018-2-24
 */
public class LinkedListJosephus {
    /**
     * 获取存活下来的节点
     *
     * @param header 链表头部指针
     * @param num    报数值
     * @return 没有报到该数，即存活下来的节点
     */
    static OneWayNode getAliveNode(OneWayNode header, int num) {
        var pointer = header;
        //形成环状
        //如果 header 所在链表已是环状则找到 header 的 previous
        while (pointer.getNext() != null && pointer.getNext() != header) {
            pointer = pointer.getNext();
        }
        pointer.setNext(header);
        //尾指针
        OneWayNode previous = pointer;
        //头指针
        pointer = header;
        int i = 0;
        while (pointer != pointer.getNext()) {
            //删除报数到 num 的节点
            if (++i % num == 0) {
                previous.setNext(pointer.getNext());
            }
            previous = pointer;
            pointer = pointer.getNext();
        }
        return pointer;
    }


    /**
     * 另一种高效的方法，在 o(N) 的时间内完成
     *
     * @param header
     * @param num
     * @return
     */
    static OneWayNode getAliveNode2(OneWayNode header, int num) {
        var pointer = header;
        //获取链表的长度
        var size = 1;
        while (pointer.getNext() != null && pointer.getNext() != header) {
            size++;
            pointer = pointer.getNext();
        }
        pointer = header;
        var aliveNum = getAliveNum(size, num);
        while (--aliveNum != 0) {
            pointer = pointer.getNext();
        }
        pointer.setNext(pointer);
        return pointer;
    }

    /**
     * 使用递归的方式直接获取约瑟夫问题中存活的节点编号
     *
     * @param size 单向链的长度
     * @param num  报数
     * @return 唯一存活的节点编号
     */
    static int getAliveNum(int size, int num) {
        if (size == 1) {
            return 1;
        }
        //长度为 size 与 (size-1) 存活节点编号的关系
        return (getAliveNum(size - 1, num) + (num - 1) % size) % size + 1;
    }
}
```