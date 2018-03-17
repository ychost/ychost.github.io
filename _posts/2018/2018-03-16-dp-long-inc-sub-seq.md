---
layout: post
title: 动态规划[7]-最长递增子数列
categories: [算法]
description: 给出长度为 N 的数组，找出这个数组的最长递增子序列 (递增子序列是指，子序列的元素是递增的）  
keywords: 动态规划, 最长递增子数列
tags: [动态规划, 最长递增子数列]
excerpt: 给出长度为 N 的数组，找出这个数组的最长递增子序列 (递增子序列是指，子序列的元素是递增的）  
---

### 问题
给出长度为 N 的数组，找出这个数组的最长递增子序列 (递增子序列是指，子序列的元素是递增的）  

```
例如：给定一个长度为6的数组A{5， 6， 7， 1， 2， 8}，
则其最长的单调递增子序列为{5，6，7，8}，
长度为4。
```

### 思路
1. 可以将问题进行转换，设原始数组为 seq 将其排序后的数组为 sort，求 seq 与 sort 的最长公共子数组的最大长度。
1. 状态方程：
```
    V(i,j) 表示长度为 i 的 seq 与长度为 j 的 sort 的最长公共子数组的最大长度
    可知，V(0,j) =  0，V(i,0) =0
```
1. 状态转移：
$$
V(i,j) = \begin{cases}
0　& i=0 或 j=0  \\
V(i-1,j-1) +1 & seq[i-1] == sort[j-1] \\
 max \begin{cases}
  V(i-1,j)  \\
    V(i,j-1)  \\
\end{cases}
&  seq[i-1] != sort[j-1]
\end{cases}
$$

### 实现

```java
/**
 * 最长递增子数列问题
 *
 * @author ychost
 * @date 2018-3-16
 */
public class LongIncSubSeq {
    /**
     * 获取数列的最大递增子序列
     * 采用的最长子数列匹配算法，即将原始数列与排序排序后的数列进行最长匹配
     *
     * @param seq 原始数列
     * @return dp[len][j] 原始长度为 j 的最大子数列长度
     */
    static List<Integer>getLongestSubSeq(Integer[] seq) {
        Integer[][] dp = getMaxLenDp(seq);
        int i = seq.length;
        int j = seq.length;
        ArrayList<Integer> list = new ArrayList<>();
        while (i > 0 && j > 0) {
            //匹配到一位
            if (dp[i][j] == dp[i - 1][j - 1] + 1) {
                list.add(seq[i - 1]);
                --i;
                --j;
            } else if (dp[i][j].equals(dp[i - 1][j])) {
                --i;
            } else if (dp[i][j].equals(dp[i][j - 1])) {
                --j;
            } else {
                throw new RuntimeException("dp 数据有误");
            }
        }
        Collections.reverse(list);
        return list;
    }

    /***
     * 获取状态数组 dp[][]
     * @param seq 原始数列
     * @return 状态数组
     */
    static Integer[][] getMaxLenDp(Integer[] seq) {
        List<Integer> sort = Arrays.asList(Arrays.copyOf(seq, seq.length));
        Collections.sort(sort);
        Integer[][] dp = new Integer[seq.length + 1][sort.size() + 1];
        //Integer 默认的是 null，所以这里要填充默认值 0
        for (int i = 0; i < dp.length; i++) {
            Arrays.fill(dp[i], 0);
        }
        for (int i = 1; i <= seq.length; i++) {
            for (int j = 1; j <= sort.size(); j++) {
                //有相同匹配
                if (seq[i - 1].equals(sort.get(j - 1))) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp;
    }
}
```

#### 测试数据
```java

@Test
public void getMaxLen() {
    Integer[] seq = {5, 1, 6, 8, 2, 4, 5, 10};
    List<Integer> list = LongIncSubSeq.getLongestSubSeq(seq);
    System.out.print("{");
    for (int k = 0; k < list.size(); k++) {
        if (k != list.size() - 1) {
            System.out.print(list.get(k) + ",");
        } else {
            System.out.println(list.get(k) + "}");
        }
    }
}
//output
//{1,2,4,5,10}
```
