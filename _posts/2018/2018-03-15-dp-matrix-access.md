---
layout: post
title: 动态规划[3]-矩阵取数问题
categories: [刷题]
description: 一个N*N矩阵中有不同的正整数，经过这个格子，就能获得相应价值的奖励，从左上走到右下，只能向下向右走，求能够获得的最大价值。
keywords: 动态规划, 矩阵取数, Java
tags: [动态规划, 矩阵取数]
excerpt: 一个N*N矩阵中有不同的正整数，经过这个格子，就能获得相应价值的奖励，从左上走到右下，只能向下向右走，求能够获得的最大价值。
---
### 题目
一个矩阵中有不同的正整数，经过这个格子，就能获得相应价值的奖励，从左上走到右下，只能向下向右走，求能够获得的最大价值。
比如：

```
3 * 3的方格。
1 3 3 
2 1 3 
2 2 1
能够获得的最大价值为：11，路径为：1->3->3->3->1
```

### 思路
该题和金字塔取数问题一样。
1. 状态描述：```F(i,j)``` 表示第 i 行的最大取数值在第 j 列，且值为 ```F(i,j)```
1. 状态转移：

   ```
     F(i,j) = Max{F(i-1,j),F(i,j-1)} + A(i,j)，可知 F(0,0)=A(0,0)
     A(i,j) 为矩阵中的某个元素
     F(i-1,j) 表示从上向下走
     F(i,j-1) 表示从左往右走
   ```

### 实现

```java
/**
 * 矩阵取数问题
 *
 * @author ychost
 * @date 2018-3-15
 */
public class MatrixMax {
    /**
     * 获取矩阵取数和的最大值
     * 矩阵取数只能右下，从(0,0) 开始
     *
     * @param matrix 代取数的矩阵
     * @return 取数和的最大值
     */
    static int getMatrixMax(int[][] matrix) {
        int[][] dp = new int[matrix.length][matrix[0].length];
        dp[0][0] = matrix[0][0];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                //第一行只能往右走
                if (i == 0 && j > 0) {
                    dp[i][j] = dp[i][j - 1] + matrix[i][j];
                    //第一列只能往下走
                } else if (i > 0 && j == 0) {
                    dp[i][j] = dp[i - 1][j] + matrix[i][j];
                    //普通情况
                } else if (i > 0 && j > 0) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
                }
            }
        }
        int max = dp[dp.length - 1][0];
        int lastIndex = 0;
        for (int i = 1; i < dp[dp.length - 1].length; i++) {
            if (max < dp[dp.length - 1][i]) {
                max = dp[dp.length - 1][i];
                lastIndex = i;
            }
        }
        print(dp, matrix, lastIndex);
        System.out.println();
        return max;
    }

    /**
     * 打印路径
     *
     * @param dp
     * @param matrix
     * @param lastIndex
     */
    static void print(int[][] dp, int[][] matrix, int lastIndex) {
        int i = dp.length - 1;
        int j = lastIndex;
        Stack<Integer> stack = new Stack<>();
        stack.push(matrix[i][j]);
        //根据关系移动步伐
        while (i > 0 || j > 0) {
            if (i == 0) {
                --j;
            } else if (j == 0) {
                --i;
            } else if (dp[i][j] == dp[i - 1][j] + matrix[i][j]) {
                --i;
            } else if (dp[i][j] == dp[i][j - 1] + matrix[i][j]) {
                --j;
            } else {
                throw new RuntimeException("dp 有误");
            }
            stack.push(matrix[i][j]);
        }

        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + ",");
        }

    }
}
```
