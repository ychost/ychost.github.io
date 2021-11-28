---
layout: post
title: 算法-希尔排序
categories: [算法]
description: "希尔排序(Shell's Sort)是插入排序的一种又称“缩小增量排序”（Diminishing Increment Sort），是直接插入排序算法的一种更高效的改进版本。希尔排序是非稳定排序算法。该方法因D.L.Shell于1959年提出而得名。"
keywords: 希尔排序, Java
tags: [希尔排序, Java]
excerpt: "希尔排序(Shell's Sort)是插入排序的一种又称“缩小增量排序”（Diminishing Increment Sort），是直接插入排序算法的一种更高效的改进版本。希尔排序是非稳定排序算法。该方法因D.L.Shell于1959年提出而得名。"
---

1. 算法可视化：[连接][href1]
1. 时间复杂度，平均：$$O(n^{1.5})$$，最好：$$O(n)$$，最坏：$$O(n^2)$$
1. 空间复杂度，$$O(1)$$
1. 是否稳定：不稳定
1. 图片来源：[https://www.cnblogs.com/chengxiao/p/6104371.html][href2]

## 算法思想
1. 希尔排序是把记录按下标的一定增量分组，对每组采用插入排序算法
1. 增量每次递减一半，当增量为 1 的时候整个数组恰好为一组，算法终止
1. 默认增量采用 array.length/2

## 算法过程
[![shell-sort][img1]][img1]{:data-lightbox="sort"}


## 实现
```java
    public void sort(int[] array) {
        for (int gap = array.length / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < array.length; i++) {
                int j = i;
                while (j - gap >= 0 && array[j] < array[j - gap]) {
                    swap(array, j, j - gap);
                    j -= gap;
                }
            }
        }
    }

    public void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
```

[img1]: /images/post/algorithm/shell-sort-1.png

[href1]: https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html
[href2]: https://www.cnblogs.com/chengxiao/p/6104371.html