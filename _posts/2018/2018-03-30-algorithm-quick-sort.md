---
layout: post
title: 算法-快速排序
categories: [算法]
description: 快速排序由C. A. R. Hoare 在 1962 年提出。它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。
keywords: 算法, 快速排序, quicksort, java
tags: [快速排序, java]
excerpt: "快速排序由C. A. R. Hoare 在 1962 年提出。它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。"
---
1. 算法可视化：[连接][href1]
1. 时间复杂度：平均：$$o(nlogn)$$，最好$$o(nlogn)$$，最坏：$$o(n^2)$$
1. 空间复杂度：$$o(longn)$$
1. 是否稳定：不稳定
1. 本文图片来源：[啊哈雷][href2]

### 基本思想
1.  找一个「基准数」，将「基准数」摆在合适的位置，即「基准数」左边的数都小于它，右边的数都大于等于它。  
1. 通常为了方便，基准数选取为一个数。

```
比如：6 1 2 7 9 3 4 5 10 8 选「基准数」为 6 ，
经过一波操作后： 3 1 2 5 4 6 9 7 10 8 
很明显 6 已经归位了，然后将其余数字逐个归位即可
```
注：归位表示该数已经放在了在排序后的位置了，对于排序的结果中的某个数而言，其左边的数都是小于该数，右边的数都是大于等于该数，和这里的位置是对应的。

### 步骤
#### 基本操作
1. 定义两个哨兵 (i,j) 分别指向数组的最左和最右，j 向左移动，i 向右移动，基准数 mark 。 
1. j 先向左移动直到找到一数满足```array[j] < mark```。
1. i 向右移动直到找到一个数满足```array[i] > mark ```。
1. 交换 ```swap(array,i,j)```
1. 继续执行上述操作，操作的终止条件：```i==j```，移动过程中始终保持```i<j```。

注意：
* 这里一定要 j 先动，这样就保证了最后当 ```i==j```的那个元素小于或等于「基准数」这样才能让「基准数」与之交换。
* 对于等于基准数的值可以忽略，直接跳过不用交换。


#### 可视化过程
1. 定义初始数组：6 1 2 7 9 3 4 10 8，两个哨兵：i，j，基准数：6
   [![quick-sort-1][img1]][img1]{:data-lightbox="quick-sort"}

1. j 向左移动直到找到了 5 ，i 向右移动直到找到了 7，然后交换
   [![quick-sort-2][img2]][img2]{:data-lightbox="quick-sort"}

1. j 继续向左移动，然后到了 4，i 继续向右移动，然后到了 9，交换
   [![quick-sort-3][img3]][img3]{:data-lightbox="quick-sort"}

1. j 继续向左移动，i 继续向右移动，然后 i j 相遇了，将「基准数」与之交换
   [![quick-sort-4][img4]][img4]{:data-lightbox="quick-sort"}

1. 经过上述操作，6 已经归位了，然后 6 左边和右边的数递归操作即可

### 实现
```java
/**
 * 快速排序
 *
 * @author ychost
 * @date 2018-3-31
 */
public class QuickSort {
    public void sort(int[] array) {
        sortHelp(array, 0, array.length - 1);
    }

    void sortHelp(int[] array, int left, int right) {
        //终止条件
        if (left >= right) {
            return;
        }
        int j = right;
        int i = left;
        //基准数
        int mark = array[left];
        while (i != j) {
            //先移动右边哨兵
            while (array[j] >= mark && i < j) {
                --j;
            }
            //移动左边哨兵
            while (array[i] <= mark && i < j) {
                ++i;
            }
            //交换两个哨兵数据
            swap(array, i, j);
        }
        //基准数归位
        swap(array, left, i);
        //基准数左边排序
        sortHelp(array, left, i - 1);
        //基准数右边排序
        sortHelp(array, i + 1, right);
    }

    void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }

}
```


[img1]: /images/post/algorithm/quick-sort-1.png
[img2]: /images/post/algorithm/quick-sort-2.png
[img3]: /images/post/algorithm/quick-sort-3.png
[img4]: /images/post/algorithm/quick-sort-4.png

[href1]: https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html
[href2]: http://www.codeaha.com/ahalei/