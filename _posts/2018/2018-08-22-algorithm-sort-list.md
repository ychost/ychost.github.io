---
layout: post
title: 算法-链表排序
categories: [算法]
description: 链表较之于数组排序，最大的痛点就是没法做到随机取值，所以传统的排序手段必须要经过改良后才能针对于链表使用，这里将针对链表采用了改良的归并排序使其时间复杂度为 O(nlogn)。
keywords: 算法, 链表排序
tags: [java, 链表排序]
excerpt: 链表较之于数组排序，最大的痛点就是没法做到随机取值，所以传统的排序手段必须要经过改良后才能针对于链表使用，这里将针对链表采用了改良的归并排序使其时间复杂度为 O(nlogn)。
---

### 背景
给定一个乱序的链表，要求将链表进行排序后然后返回头结点，要求时间复杂度为 $$O(nlogn)$$，[LeetCode 原题链接][href1]
```
Input: 4->2->1->3
Output: 1->2->3->4
```

### 算法
1. 题目要求排序的时间复杂度是$$O(nlogn)$$，很容易联想到归并、快排、堆排序，这里用归并
1. 归并的核心思想是将排序集合递归地分成两部分，然后对已经有序的两部分进行合并操作 
1. 数组分成两部分很简单，链表要分成两部分可以采用 fast/slow 算法找到中间节点

### 实现
```java
    public ListNode sortList(ListNode head){
        if(head == null ||head.next == null){
            return head;
        }
        ListNode fast=head,slow=head,pre=null;
        while(fast!=null && fast.next!=null){
            fast = fast.next.next;
            pre = slow;
            slow = slow.next;
        }
        // head --->pre--->slow--->fast
        pre.next = null;
        // 分治前半部分 head ---> pre
        ListNode l1 = sortList(head);
        // 分治后半部分 slow ---> fast
        ListNode l2 = sortList(slow);
        // 将两个有序链表 l1,l2 归并
        return merge(l1,l2);
    }

    ListNode merge(ListNode l1,ListNode l2){
        ListNode head = null,p = null;
        while(l1!=null && l2 != null){
            ListNode node;
            if(l1.val<l2.val){
                node=l1;
                l1=l1.next;
            }else{
                node = l2;
                l2 = l2.next;
            }
            if(p == null){
                head = node;
            }else{
                p.next = node;
            }
            p=node;
        }
        if(l1 != null){
            p.next = l1;
        }
        if(l2 != null){
            p.next = l2;
        }
        return head;
    }
```

[href1]: https://leetcode.com/problems/sort-list/description/