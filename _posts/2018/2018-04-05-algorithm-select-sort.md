---
layout: post
title: 算法-选择排序
categories: [算法]
description: "选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。"
keywords: 选择排序, Java
tags: [选择排序, Java]
excerpt: "选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。"
---
1. 算法可视化：[连接][href1]
1. 时间复杂度，平均：$$O(n^2)$$，最好：$$O(n^2)$$，最坏：$$O(n^2)$$
1. 空间复杂度，$$O(1)$$
1. 是否稳定：不稳定

## 算法思路
选择排序是一种十分直接的算法，
1. 选出第 1 小的数放入第 1 个位置
1. 选出第 2 小的数放入第 2 个位置
1. 选出第 3 小的数放入第 3 个位置...


## 实现
```java
/**
 * 选择排序
 *
 * @author ychost
 * @date 2018-4-5
 */
public class SelectSort {
    void sort(int[] array) {
        for (int i = 0; i < array.length; i++) {
            for (int j = i + 1; j < array.length; j++) {
                if (array[j] < array[i]) {
                    swap(array, i, j);
                }
            }
        }

    }


    void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }

}
```

[href1]: https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html
