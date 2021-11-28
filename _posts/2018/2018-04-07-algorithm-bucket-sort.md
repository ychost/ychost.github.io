---
layout: post
title: 算法-桶排序
categories: [算法]
description: "桶排序 (Bucket sort)或所谓的箱排序，是一个排序算法，工作的原理是将数组分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）。"
keywords: 桶排序, Java
tags: [桶排序, Java]
excerpt: "桶排序 (Bucket sort)或所谓的箱排序，是一个排序算法，工作的原理是将数组分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）。"
---


1. 算法可视化：[连接][href1]
1. 时间复杂度，$$O(n+C)$$，其中$$C=n \times (logn - logm)$$
1. 空间复杂度，$$O(n+m)$$
1. 是否稳定：稳定

## 算法思想
桶排序是一种十分高效稳定的算法，但是其使用场景比较受限。  
__场景__   
1. 待排序列的值处于一个可枚举的范围内
1. 待排序列所在的枚举范围不应太大

__算法__  
1. 根据映射函数将元素放入特定的桶中
1. 对每个分别桶进行排序

[![bucket-sort][img1]][img1]{:data-lightbox="sort"}

## 实现
```java
    /**
     * @param array       待排序序列
     * @param min         <= 最小值
     * @param max         >= 最大值
     * @param bucketCount 桶的数量
     */
    void sort(int[] array, int min, int max, int bucketCount) {
        //最后一个桶号为 bucketCount 所以这里要 + 1
        //比如 元素为 max 的桶
        List<Integer>[] buckets = new List[bucketCount + 1];
        //每个桶的容量
        int cap = (max - min) / bucketCount;
        for (int i = 0; i < array.length; i++) {
            //当前元素到桶号的索引
            int index = (array[i] - min) / cap;
            if (buckets[index] == null) {
                buckets[index] = new LinkedList<>();
            }
            buckets[index].add(array[i]);
        }
        for (int i = 0; i < buckets.length; i++) {
            if (buckets[i] != null) {
                //每个桶分别排序
                Collections.sort(buckets[i]);
            }
        }

        int index = 0;
        for (int i = 0; i < buckets.length; i++) {
            if (buckets[i] != null) {
                Iterator<Integer> iter = buckets[i].iterator();
                while (iter.hasNext()) {
                    array[index++] = iter.next();
                }
            }
        }
```

[img1]: /images/post/algorithm/bucket-sort.jpg

[href1]: https://www.cs.usfca.edu/~galles/visualization/BucketSort.html