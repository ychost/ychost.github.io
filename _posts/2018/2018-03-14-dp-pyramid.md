---
layout: post
title: 动态规划[2]-数塔取数问题
categories: [刷题]
description: 一有数字组成的等边金字塔，从塔顶开始依次向下取数，求从塔顶到塔底所有取数中的最大和。  
keywords: 动态规划, 金字塔, Java
tags: [动态规划, 金字塔]
excerpt: 一有数字组成的等边金字塔，从塔顶开始依次向下取数，求从塔顶到塔底所有取数中的最大和。  
---

### 问题
一有数字组成的等边金字塔，从塔顶开始依次向下取数，求从塔顶到塔底所有取数中的最大和。  
   > 注：取数只能取下一层相邻的数
比如：

```java
   1
  7 4
 3 4 2
5 8 9 7
```
如果取了 4 就只能取下面的 8 或者 9，最大取数为 21 取数路径为：
   > 1,7,4,9

### 思路
1. 状态描述，将题目抽象成递归的描述问题即：  
   设 $$F_{i,j}$$ 表示 $$A_{i,j}$$ 为底层到 $$i$$ 行的最大取数值，则求 $$F_{n,m}$$ $$n$$ 为最后一行，$$m$$ 最后一行取最大数的索引
1. 状态转移，将第 $$i$$ 和第 $$i+1$$ 的状态进行关联
\\[F_{i,j} = Max\\{F_{i-1,j-1},F_{i-1,j}\\} + A_{i,j}\\]

### 解法
```java
/**
 * 一个高度为 N 数组成的等边金字塔，求从塔顶到塔底走过的数字之和的最大值
 *
 * @author ychost
 * @date 2018-3-14
 */
public class PyramidMax {

    /**
     * 由动态规划解走过数字的最大和
     * 状态定义：F(i,j) 第 i 行，第 j 列的最大取数和，求第 n 行的 F(n,m) 的最大值
     * 状态转移：F(i,j) = max{F(i-1,j-1),F(i-1,j)} + A(i,j)   A(i,j) 表示第 i 行第 j 列的值
     * 每次只能取下一行相邻的两个数的其中一个
     *
     * @param pyramid 等边金字塔数组
     *                比如：
     *                5
     *               4 8
     *              3 7 1
     *             1 5 2 8
     * @return 从塔顶到塔底的最大取数和
     */
    static int resolve(int[][] pyramid) {
        int rows = pyramid.length;
        //为了方便 dp 取值为方阵
        int[][] dp = new int[rows][rows];
        //防止最大值为负数的时候 dp 默认值 0 比真实取值大
        Arrays.fill(dp[rows - 1], Integer.MIN_VALUE);
        //第 i 行 只有 i+1 个数，i 从 0 开始
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < i + 1; j++) {
                //第一行
                if (i == 0) {
                    dp[i][j] = pyramid[i][j];
                    //左边第一列
                } else if (j == 0 && i > 0) {
                    dp[i][j] = dp[i - 1][j] + pyramid[i][j];
                    //中间列
                } else if (j > 0 && i > 0 && j != i) {
                    dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + pyramid[i][j];
                    //右边第一列
                } else if (j == i && i > 0) {
                    dp[i][j] = dp[i - 1][j - 1] + pyramid[i][j];
                }
            }
        }
        //找出最后一行的最大取值
        int max = dp[rows - 1][0];
        int lastIndex = 0;
        for (int i = 0; i < dp[rows - 1].length; i++) {
            if (max < dp[rows - 1][i]) {
                max = dp[rows - 1][i];
                lastIndex = i;
            }
        }
        printPath(pyramid, lastIndex);
        return max;
    }

    /**
     * 打印取数路径
     *
     * @param pyramid   金字塔等边数组
     * @param lastIndex 最后取数的索引值
     */
    static void printPath(int[][] pyramid, int lastIndex) {
        Stack<Integer> pathStack = new Stack<>();
        int row = pyramid[pyramid.length - 1].length - 1;
        while (row >= 0) {
            //左边界，上一层还是取左边界
            if (lastIndex == 0) {
                //右边界，上一层只能取右边界
            } else if (lastIndex == pyramid[row].length) {
                lastIndex = lastIndex - 1;
                //对于中间数据，只能取相邻的最大值
                //即使第一次传进来的时候还是 lastIndex = lastIndex，所以 没有 Bug
            } else {
                lastIndex = pyramid[row][lastIndex - 1] > pyramid[row][lastIndex] ? lastIndex - 1 : lastIndex;
            }
            pathStack.push(pyramid[row][lastIndex]);
            row -= 1;
        }
        while (!pathStack.isEmpty()) {
            System.out.print(pathStack.pop() + ",");
        }
        System.out.println();
    }

}
```
   
