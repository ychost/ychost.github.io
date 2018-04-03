---
layout: post
title: 算法-冒泡排序
categories: [算法]
description: "冒泡排序（Bubble Sort），是一种计算机科学领域的较简单的排序算法。
它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
这个算法的名字由来是因为越大的元素会经由交换慢慢「浮」到数列的顶端，故名「冒泡排序」。"
keywords: 冒泡排序, Java
tags: [冒泡排序, Java]
excerpt: "冒泡排序（Bubble Sort），是一种计算机科学领域的较简单的排序算法。
它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
这个算法的名字由来是因为越大的元素会经由交换慢慢「浮」到数列的顶端，故名「冒泡排序」。"
---

1. 算法可视化：[连接][href1]
1. 时间复杂度，平均：$$O(n^2)$$，最好：$$O(n)$$，最坏：$$O(n^2)$$。
1. 空间复杂度：$$O(1)$$
1. 稳定性：稳定
1. 图片来源：[啊哈磊][href2]

## 算法思想
每次比较相邻元素，如果它们的顺序错误则将它们交换过来。  
该算法的思想非常简单，每次都能将一个最大或者最小的泡泡冒到最上面。

比如，我们需要将 12 35 99 18 76 这 5 个数从大到小排序。  
1. 12 与 35 比较，发现 12 < 35 交换后为：35 12 99 18 76。
1. 12 与 99 比较，发现 12 < 99 交换后为：35 99 12 18 76。
1. 按上述顺序进行下去，则可以使得最小元素归位：35 99 18 76 12。
1. 一次可以归位一个元素，再进行 4 次 上述操作，则 5 个数都能归位
[![bubble-sort][img1]][img1]{:data-lightbox="sort"}

## 实现
```java
/**
 * 冒泡排序
 *
 * @author ychost
 * @date 2018-4-2
 */
public class BubbleSort {
    public static void sort(int[] array) {
        for (int i = 0; i < array.length; i++) {
            //这里 array.length - 1 - i 
            //每次进入循环的时候后面的 i 个元素都归位了
            for (int j = 0; j < array.length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                }
            }
        }
    }

    static void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}
```

[img1]: /images/post/algorithm/bubble-sort.png

[href1]: https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html
[href2]: http://www.codeaha.com/ahalei/