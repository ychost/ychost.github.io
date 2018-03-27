---
layout: post
title: 动态规划[6]-多重背包问题
categories: [刷题]
description: 有 N 种物品和一个容量为 V 的背包。第 i 种物品最多有 n[i] 件可用，每件价值是 p[i]，重量是 w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
keywords: 动态规划,多重背包问题
tags: [动态规划, 多重背包问题]
excerpt: 有 N 种物品和一个容量为 V 的背包。第 i 种物品最多有 n[i] 件可用，每件价值是 p[i]，重量是 w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
---
<style>
.MathJax {
    font-size: 0.7em !important;
}
</style>

### 问题
有 N 种物品和一个容量为 V 的背包。第 i 种物品最多有 n[i] 件可用，每件价值是 p[i]，重量是 w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
> 注：该问题与完全背包一样，只是数量限制的区别，一个限量，一个不限量

### 思路
1. 状态定义：
   ```
    v(i,j) 表示容量为 j，物品个数为 i 的最大价值
    k[i], p[i], w[i] 分别表示每件物品的数量、价值、重量
   ```
1. 状态转移：  
$$
V(i,j) = \begin{cases}
0　& i=0 或 j=0  \\
V(i-1,j) &  j < w(i)  \\
 max \begin{cases}
    V(i-1,j-w(i) \times k(i)) + p(i) \times k(i)  \\
    V(i-1,j)  \\
\end{cases}
& j \geq w(i) \times k(i) 与 k(i) \leq n(i)
\end{cases}
$$

### 实现
```java
/**
 * 多重背包问题
 *
 * @author ychost
 * @date 2018-3-16
 */
public class KnapsackMultiple {
    /**
     * 与完全背包相比较就是每种物品的数量是有限的且是指定的数量
     *
     * @param weights  物品的重量
     * @param prices   物品的价值
     * @param numbers  物品的数量
     * @param capacity 背包容量
     * @return 背包所装物品的最大价值
     */
    static int getMaxPrice(int[] weights, int[] prices, int[] numbers, int capacity) {
        int count = weights.length;
        int[][] dp = new int[count + 1][capacity + 1];
        for (int i = 1; i <= count; i++) {
            int w = weights[i - 1];
            int p = prices[i - 1];
            int n = numbers[i - 1];
            for (int j = 1; j <= capacity; j++) {
                //只有这里的循环终止条件比完全背包多了一个数量限制
                for (int k = 0; k * w <= j && k <= n; k++) {
                    //一般为 k=0 的时候，物品重量超过容量
                    if (j < w) {
                        dp[i][j] = dp[i - 1][j];
                        //比较放下物品和不放物品的价值谁大
                    } else {
                        int before = dp[i - 1][j];
                        int after = dp[i - 1][j - k * w] + p * k;
                        dp[i][j] = before > after ? before : after;
                    }
                }
            }
        }
        print(dp, weights, prices, numbers, capacity);
        return dp[count][capacity];
    }

    /**
     * 打印每个物品的数量取值，从第1个物品到最后一个依次打印
     *
     * @param dp
     * @param weights
     * @param prices
     * @param numbers
     * @param capacity
     */
    static void print(int[][] dp, int weights[], int[] prices, int numbers[], int capacity) {
        int j = capacity;
        int i = weights.length;
        Stack<String> stack = new Stack<>();
        boolean isError;
        while (i > 0 || j > 0) {
            isError = true;
            int w = weights[i - 1];
            int p = prices[i - 1];
            int n = numbers[i - 1];
            if (i > 0 && j > 0) {
                for (int k = 0; k * w <= capacity && k <= n; k++) {
                    if (dp[i][j] == dp[i - 1][j]) {
                        stack.push(String.valueOf(0));
                        --i;
                        isError = false;
                        break;
                    } else if (dp[i][j] == dp[i - 1][j - w * k] + k * p) {
                        stack.push(String.valueOf(k));
                        j -= w * k;
                        --i;
                        isError = false;
                        break;
                    }
                }
                if (isError) {
                    throw new RuntimeException("dp 数据有误");
                }
            } else if (j == 0) {
                stack.push(String.valueOf(0));
                --i;
            } else if (i == 0) {
                break;
            }
        }
        Collections.reverse(stack);
        String str = "{" + String.join(",", stack) + "}";
        System.out.println(str);
    }
}
```
#### 测试数据
```java

public class KnapsackMultipleTest {

    @Test
    public void getMaxPrice() {
        int[] weights = {3, 4, 5, 6, 7};
        int[] prices = {5, 6, 9, 10, 11};
        int[] numbers = {1, 5, 1, 5, 5};
        int capacity = 13;
        System.out.println(KnapsackMultiple.getMaxPrice(weights,prices,numbers,capacity));
    }
}
//output
//{0,2,1,0,0}
//21
```
