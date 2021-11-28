---
layout: post
title: 算法-二分查找
categories: [算法]
description: 二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。 
keywords: 算法, 二分查找
tags: [Java, 二分查找]
excerpt: 二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。 
---

## 背景
1. [Find Minimum in Rotated Sorted Array][href1]
1. [Find Minimum in Rotated Sorted Array II][href4]
1. [Search in Rotated Sorted Array][href2]
1. [Search in Rotated Sorted Array II][href3]

## Find Minimum in Rotated Sorted Array
给定一个升序数组<font color="red">（无重复元素）</font>，然后将其按照某位进行旋转，如```[0,1,2,3,4]```变成```[3,4,0,1,2]```，找到旋转后的数组的最小值。  
如：  
```
Input: [3,4,5,1,2] 
Output: 1

Input: [4,5,6,7,0,1,2]
Output: 0
```

注： 算法的平均复杂度控制在$$O(logn)$$

### 思路
1. 数组分成两个分别递增的部分，分别为左序列，右序列。比如，```[3,4,0,1,2]```分成```[3,4]```,```[0,1,2]```两个部分
1. 中间值 < 右边值，中间值处于右边序列，此时最小值应在中间值的或中间值的左边。
1. 中间值 > 右边值，中间值处于左边序列，此时最小值应在中间值的右边。毕竟有中间值 > 右边值，那么中间值绝不是最小值  


### 实现
```java
public int findMin(int[] nums){
    int left = 0, right = nums.length -1;
    while(left < right){
        //这里不使用 (left + right) / 2 是为了防止 left + right 造成 int 溢出
        int mid = left + (right - left) / 2;
        if(nums[mid] < nums[right] ){
            right = mid;
        }else{
            left = mid + 1;
        }
    }
    //此时 left == right
    return nums[left];
}
```

## Find Minimum in Rotated Sorted Array II
和上题一样，只是数组中<font color="red">含有重复元素</font>，比如：```[3,4,5,1,2,2,3,3]```

### 思路
1. 该题无法直接通过「中间值」和「右边值」的比较来确定所处位置，因为会出现「中间值」==「右边值」，此时只要忽略掉重复值即可
1. 中间值 < 右边值，最小值在中间值或者中间值的左边
1. 中间值 = 右边值，右边值向左平移一位
1. 中间值 > 右边值，最小值在中间值的右边


### 实现
```java
public int findMin(int[] nums){
    int left = 0,right = nums.length -1;
    while(left < right){
        int mid = left + (right - left) / 2;
        if(nums[mid] < nums[right]){
            right = mid;
        }else if(nums[mid] == nums[right]){
            --right;
        }else{
            left = mid + 1;
        }
    }
    return nums[left];
}
```


##  Search in Rotated Sorted Array
一个旋转升序数组<font color="red">（无重复元素）</font>，在数组中找到和给定的```target```相等的元素的坐标，如果没有则返回 -1
比如：  
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### 思路
1. 该题和第一题一样，只是从查找最小值变成了查找给定值，同样通过「中间值」和「右边值」进行对比找到```target```的范围，然后不断二分查找
1. 中间值 = target，直接返回
1. 中间值 < 右边值，此时中间值处于右侧序列
    1. target > 中间值 && target <= 右边值，则更新查找区间为 (中间值，右边值)
    1. 否则更新查找区间为 (左边值，中间值)
1. 中间值 > 右边值，此时中间值处于左侧序列
    1. target < 中间值 && target >= 左边值，则更新查找区间为 (左边值，中间值)
    1. 否则，更新查找区间为 (中间值，右边值)

```java
public int search(int[] nums, int target) {
    if(nums == null || nums.length == 0){
        return -1;
    }
    int left = 0,right = nums.length - 1;
    //注意这里是 <=
    while(left <= right){
        int mid = left + (right - left) / 2;
        if(nums[mid] == target){
            return mid;
            //从右边查找
        }else if(nums[mid] < nums[right]){
            if(target > nums[mid] && target <= nums[right]){
                left = mid + 1;
            }else{
                right = mid -1;
            }
            //从左边查找
        }else{
            if(target < nums[mid] && target >= nums[left]){
                right = mid -1;
            }else{
                left = mid + 1;
            }
        }

    }
    return -1;
}
```

##  Search in Rotated Sorted Array II
该题和上题一样，只是数组元素<font color="red">存在重复</font>，比如```[3,3,4,5,1,2,2,3,3]```如果存在 target 则返回 true，否则返回 false。

### 思路
1. 解法和上面也一样，只是多了当 中间值 = 右边值 的平移操作

### 解法
```java
 public boolean search(int[] nums, int target) {
     if(nums == null || nums.length == 0){
         return false;
     }
     int left = 0,right = nums.length -1;
     while(left <= right){
         int mid = left + (right - left) / 2;
         if(nums[mid] == target){
             return true;
             //从右边查找
         }else if(nums[mid] < nums[right]){
            if(target > nums[mid] && target <= nums[right]){
                left = mid + 1;
            }else{
                right = mid -1;
            }
            //从左边查找
         }else if(nums[mid] > nums[right]){
            if(target < nums[mid] && target >= nums[left]){
                right = mid -1;
            }else{
                left = mid +1;
            }
            //平移
         }else {
             --right;
         }
     }
     return false;
 }
```

## 总结
1. 二分法只能在有序的区间进行查找
1. 有时候总体区间无序，但是可以变成单个有序的子区间，可以在分别的子区间进行二分查找，一般也是通过二分法划分子区间
1. 注意 ```left = mid```，```left = mid + 1```如果先判断结果比如```if(target == nums[mid])```那么此时为```left = mid + 1```因为 mid 已经被判断过了，如果没有该判断则为```left = mid```
1. 注意```while(left < right)```与```while(left <= right)```，具体情况，具体分析，调试下就好了



[href1]: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
[href2]: https://leetcode.com/problems/search-in-rotated-sorted-array/description/
[href3]: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/
[href4]: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/