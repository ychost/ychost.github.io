---
layout: post
title: 动态规划[8]-最大子段和
categories: [刷题]
description:  N 个整数组成的序列 a[1],a[2],a[3],…,a[n]，求该序列如 a[i]+a[i+1]+…+a[j] 的连续子段和的最大值。 
keywords: 动态规划, 最大子段和
tags: [动态规划, 最大子段和]
excerpt: N 个整数组成的序列 a[1],a[2],a[3],…,a[n]，求该序列如 a[i]+a[i+1]+…+a[j] 的连续子段和的最大值。 
---

### 问题
 N 个整数组成的序列 a[1],a[2],a[3],…,a[n]，求该序列如 a[i]+a[i+1]+…+a[j] 的连续子段和的最大值。 

```
例如：-2,11,-4,13,-5,-2 和最大的子段为：11,-4,13。和为 20。
```

### 思路
1. 定义 ```dp[i][j]``` 表示子串 i..j 的和
1. 求出 ```dp``` 中的最大值即可

### 实现

```java
/**
 * 最大子串和
 *
 * @author ychost
 * @date 2018-3-17
 */
public class SubSeqMax {
    /**
     * dp[i][j] 表示子串 a[i]..a[j] 的和
     *
     * @param seq 原始数列
     * @return 最大子串和
     */
    static Integer getSumMax(int[] seq) {
        int count = seq.length;
        int[][] dp = new int[count][count];
        int sum = seq[0];
        dp[0][0] = seq[0];
        Integer max = null;
        for (int j = 1; j < count; j++) {
            //sum 会一直累加到 0..j 的和
            sum += seq[j];
            int subSum = sum;
            for (int i = 0; i <= j; i++) {
                dp[i][j] = subSum;
                //取最大值
                if (max == null) {
                    max = dp[i][j];
                } else if (max < dp[i][j]) {
                    max = dp[i][j];
                }
                //subSum 会从 0..j 变成 1..j 变成 2..j ... 的和
                subSum -= seq[i];
            }
        }
        print(dp, seq, max);
        return max;
    }

    /**
     * 打印最大和的子串，只取子串长度最小的
     *
     * @param dp  求和子串状态
     * @param seq 原始数列
     * @param max 最大的子串和
     */
    static void print(int[][] dp, int[] seq, int max) {
        int sum = max;
        int start = 0;
        int end = dp.length - 1;
        for (int i = 0; i < dp.length; i++) {
            for (int j = 0; j < dp[i].length; j++) {
                //只去子串长度最小的一个
                if (dp[i][j] == sum && (j - i) < (end - start)) {
                    start = i;
                    end = j;
                }
            }
        }

        System.out.print("{");
        for (int i = start; i <= end; i++) {
            if (i != end) {
                System.out.print(seq[i] + ",");
            } else {
                System.out.print(seq[i]);
            }
        }
        System.out.println("}");
    }

}
```

#### 测试数据
```java
@Test
public void getSumMax() {
    int[] seq = {-2, -1, 1, 13, 5, 2, -11,20};
    Integer max = SubSeqMax.getSumMax(seq);
    System.out.println(max);
}

//output
//{1,13,5,2,-11,20}
//30
```

### 解法 2
1. 遍历数组然后不断累加求取累加过程中的最大值即可
1. 如果累加过程出现了 <0 的情况，那么就暂时中止累加，并将当前值赋予累加临时变量即可
> 通过如上累加方式取得的最大值，必定是子数列取得的最大和  
> 因为当出现了累加和 小于 0 那么 当前值 > (累加和+当前值)

```java
/**
    * 时间复杂度 o(N)
    *
    * @param nums
    * @return
    */
public int maxSubArray2(int[] nums) {
    int sum = Integer.MIN_VALUE;
    int temp = 0;
    for (int i = 0; i < nums.length; i++) {
        temp = temp < 0 ? nums[i] : temp + nums[i];
        sum = Math.max(temp, sum);
    }
    return sum;
}
```