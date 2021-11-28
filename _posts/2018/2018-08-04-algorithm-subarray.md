---
layout: post
title: 算法-子数组系列
categories: [算法]
description: 这是一个在 Leetcode 上面的一些子数组方面的题，最长递增子数组，子数组最大和，子数组和满足一定条件等等
keywords: 算法, 子数组
tags: [Java, 子数组]
excerpt: 这是一个在 Leetcode 上面的一些子数组方面的题，最长递增子数组，子数组最大和，子数组和满足一定条件等等
---

### 背景
该算法的背景来自于 leetcode 的 [Subsequence] 系列。

---
1. 给定一个未排序的数组，求数组的最长递增子序列的长度
   ```
    Input: [10,9,2,5,3,7,101,18]
    Output: 4 
    Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
   ```
1. 给定一个未排序的数组，求是否存在一个递增的子序列，该子序列的长度为 3
   ```
    Input: [1,2,3,4,5]
    Output: true
   ```
1. 给定一个数组，一个整数 k，求出有多少个子序列满足序列和为 k
   ```
    Input:nums = [1,1,1], k = 2
    Output: 2
   ```
1. 给定一个非负整数组合一个整数 k，求是否存在连续子序列和等于 n*k
   ```
    Input: [23, 2, 4, 6, 7],  k=6
    Output: True
    Explanation: Because [2, 4] is a continuous subarray of size 2 and sums up to 6.
   ```
1. 给定一个非负整数组和一个整数 k，求是连续子序列的和大于等于 k 的最小长度
   ```
    Input: s = 7, nums = [2,3,1,2,4,3]
    Output: 2
    Explanation: the subarray [4,3] has the minimal length under the problem constraint.
   ```
1. 给定一个整数组(可能含有负数)和一个整数 k，求连续子序列的和大于等于 k 的最小长度
   ```
    Input: A = [2,-1,2], K = 3
    Output: 3
   ```
1. 给定数组 A,B，找出 A,B 中重复出现的最长子序列
   ```
    A: [1,2,3,2,1]
    B: [3,2,1,4,7]
    Output: 3
    Explanation: 
    The repeated subarray with maximum length is [3, 2, 1].
   ```
1. 找出数组 A 中连续数列的最长长度，要求时间复杂度$$o(N)$$
   ```
    Input: [100, 4, 200, 1, 3, 2]
    Output: 4
    Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
   ```
   

### 算法
#### 最长递增子序列
原题链接 [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)
1. 一种是求数组A和对A排序后的数组B，两者的最长公共子序列
1. 另一种是 LIS 算法
这里只给出 LIS 算法，两者的详细介绍请参考 [动态规划[7]-最长递增子数列][href2]
   ```java
    public int lengthOfLIS(int[] nums) {
        if(nums == null || nums.length ==0){
            return 0;
        }
        // array 中的元素都不相等
        // array[3] = 5，表示长度为 3 的子序列的最后一个最小元素值为 5
        int[] array = new int[nums.length];
        array[0]=nums[0];
        int len = 1;
        for (int num : nums) {
            if (num > array[len - 1]) {
                array[len] = num;
                len += 1;
            } else {
                // 找到第一个 >= nums[i] 的索引
                int idx = binSearch(array, 0, len - 1, num);
                if (idx >= 0 && idx < len) {
                    array[idx] = num;
                }
            }
        }
        return 0;
    }

    int binSearch(int[] array,int low,int high,int target){
        while(low<=high){
            int mid = low+(high-low)/2;
            if(array[mid] == target){
                return mid;
            }else if(array[mid]>target){
                high-=1;
            }else{
                low+=1;
            }
        }
        if(array[low]>target){
            return low;
        }else{
            return low+1;
        }

    }
   ```

#### 长度为 3 的递增子序列
原题链接 [Increasing Triplet Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)  
1. 该题比最长递增子序列更简单，所以算法复杂度要求 $$o(n)$$
1. 只需要遍历数组，然后找到里面的最小值 s1，倒数第二小值 s2，倒数第三小值 s3 即可
   ```java
   public boolean increasingTriplet(int[] nums) {
          if(nums == null || nums.length<3){
            return false;
           }
         int s1=Integer.MAX_VALUE;
         int s2 = s1;
         for(int n : nums){
             if(n<=s1) s1 = n;
             else if(n<=s2) s2=n;
             else return true;
         }
         return false;
    }
   ```


#### 和为 k 的连续子序列
原题链接 [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/description/)
1. ```sum[i+1..j] = sum[0..j] - sum[0..i]```
1. 遍历 sum 数组，找到 sum[j] - k 是否存在，这就变成了一个 two sum 的问题
   ```java
      public int subarraySum(int[] nums, int k) {
         if(nums==null || nums.length ==0){
            return 0;
        }
        int[] sum = new int[nums.length];
        Map<Integer,Integer> map = new HashMap<>();
        int cnt = 0;
        for (int i = 0; i < nums.length; i++) {
            int pre = i == 0 ? 0 : sum[i-1];
            sum[i] = pre + nums[i];
            if(sum[i]==k){
                cnt+=1;
            }
            int key = sum[i]-k;
            if(map.containsKey(key)){
               cnt+=map.get(key);
            }
            map.put(sum[i],map.getOrDefault(sum[i],0)+1);
        }
        return cnt;
    }
   ```

#### 和为 n*k 的连续子序列
原题链接 [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/description/)
```
1. (a+b)%p = (a%p + b%p)% p
2. 当 k != 0, sums[0..j] - sums[0..i] = n*k ==> (sums[0..j] - sums[0..i]) % k = 0 
        ==>sums[0..j] % k  = sums[0..i] % k
3. 当 k =  0, sums[0..j] - sums[0..i] = n*k ==>  sums[0..j] = sums[0..i]  
```
   ```java
      public boolean checkSubarraySum(int[] nums, int k) {
        if(nums == null || nums.length == 0){
            return false;
        }
        int[] sums = new int[nums.length];
        Map<Integer,Integer> map = new HashMap<>();
        // 1. 当 sums[i] % k = 0 的时候 sums[i] 即为所求
        // 2. 当 k = 0 的时候，sums[i] = 0 即为所求
        // 3. 题目要求序列至少为 2 个，所以这里默认为 -1
        map.put(0,-1);
        for (int i = 0; i < nums.length; i++) {
            int pre = i ==0 ? 0 : sums[i-1];
            sums[i] = pre + nums[i];
            int key = -sums[i];
            if(k!=0) {
                sums[i] %= k;
                key = sums[i];
            }
            if(map.containsKey(key)){
                // 题目要求序列个数至少为 2
               if(i-map.get(sums[i])>1){
                   return true;
               }
            }else{
                // 只保留最小索引
                map.put(sums[i],i);
            }
        }
        return false;
    }
   ```

#### 和为 k 最短连续正整数子序列
原题链接 [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/description/)
1. 由于序列为正整数，所以 sums 为一个递增数组
1. 只要保证某一段连续和大于等于 k，那么再往后面叠加和也会大于等于 s，要求最短只要删除掉前面的元素保证和 >=s 即可 
   ```java
    public int minSubArrayLen(int s, int[] nums) {
        if(nums == null || nums.length == 0){
            return 0;
        }
        int cnt = Integer.MAX_VALUE;
        int sum = 0;
        for (int i = 0,j=0; i < nums.length; i++) {
           sum += nums[i];
           while(sum-nums[j]>=s){
               sum-=nums[j];
               j+=1;
           }
           if(sum>=s){
               cnt = Math.min(cnt,i-j+1);
           }
        }
       return cnt == Integer.MAX_VALUE ? 0 : cnt;
    }
   ```
当然，还有另一种方法，求出所有的 sums 数组，然后用二分法去找 sums[j] - sums[i] >= s 的最小 j 求出最小的 j-i 即可

#### 和为 k 的连续子序列最短长度
原题链接 [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/)
1. 注意该题和上题的区别就是上一个题的数组元素为正整数，而该题的数组元素可能含有负数或者0
1. 先求出 sums 数组，然后用一个双端队列维护一个递增的 sums，找出里面满足条件的最小 i-j
   ```java
        public int shortestSubarray(int[] A, int K)  {
        if(A == null || A.length ==0){
            return -1;
        }
        Deque<Integer> deque = new ArrayDeque<>();
        // 这里使用 length+1 主要为了计算 sums[i] - 0
        int[] sums = new int[A.length+1];
        int cnt = Integer.MAX_VALUE;
        for (int i = 0; i < A.length; i++) {
            sums[i+1] = sums[i]+A[i];
        }
        for (int i = 0; i <= A.length; i++) {
            while(!deque.isEmpty() && sums[i]-sums[deque.getFirst()]>=K){
               cnt = Math.min(cnt,i-deque.pollFirst());
            }
            while (!deque.isEmpty() && sums[i] < sums[deque.getLast()]){
                deque.pollLast();
            }
            deque.addLast(i);
        }
        return cnt == Integer.MAX_VALUE? -1 : cnt;
    }
   ```
#### 最长公共连续子序列
原题链接 [Maximum Length of Repeated Subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray/description/)

```
1. 该题和最长公共子串一样用动态规划
2. dp[i][j] = dp[i-1][j-1] + dp[j-1]   A[i-1]=B[j-1]
   len = Math.max(len,dp[i][j])
```
```java
    public int findLength(int[] A, int[] B) {
        if(A == null || B == null || A.length == 0 || B.length == 0){
            return 0;
        }
        int[][] dp = new int[A.length+1][B.length+1];
        int maxLen = 0;
        for (int i = 1; i <= A.length; i++) {
            for (int j = 1; j <= B.length; j++) {
                if (A[i - 1] == B[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    maxLen = Math.max(dp[i][j], maxLen);
                }else{
                    dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
                }
            }
        }
        return maxLen;
    }
```

#### 最长连续子数列
原题连接 [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/description/)
1. 本题要求时间复杂度必须为$$o(N)$$，所以不能使用排序
1. 只能考虑用空间换时间，所以用一个 map 来保存每个数字的连续情况，然后得到一个最大的连续值即可
   ```java
    public int longestConsecutive(int[] nums) {
        Map<Integer,Integer> map = new HashMap<>();
        int res = 0;  
        for(int num:nums){
            if(map.containsKey(num)){
                continue;
            }
            // 因为每个值只遍历了一次，所以 left、right 没有连续
            // 左边的连续长度
            int left  = map.getOrDefault(num-1,0);
            // 右边的连续长度
            int right = map.getOrDefault(num+1,0);
            // 当前值得连续长度
            int len   = left + right + 1;
            res = Math.max(res,len);    
            // 更新连续长度
            map.put(num,len);
            map.put(num-left,len);
            map.put(num+right,len);
        }
        return res;
    }
   ```


[href1]: http://blog.sudoyc.com/2018/04/08/algorithm-combination/
[href2]: /2018/03/16/dp-long-inc-sub-seq/