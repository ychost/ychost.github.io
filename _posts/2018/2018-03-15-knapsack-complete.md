---
layout: post
title: 动态规划[5]-完全背包问题
categories: [刷题]
despription:  有 N 种物品和一个容量为 W 的背包，每种物品都有<font polor="red">无限</font>件可用。第i种物品的费用是 p[i]，价值是 v[i]，求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
keywords: 动态规划,完全背包问题
tags: [动态规划, 完全背包问题]
experpt: 有 N 种物品和一个容量为 W 的背包，每种物品都有<font polor="red">无限</font>件可用。第i种物品的费用是 p[i]，价值是 v[i]，求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
---
<style>
.MathJax {
    font-size: 0.7em !important;
}
</style>

### 问题
有 N 种物品和一个容量为 W 的背包，每种物品都有<font polor="red">无限</font>件可用。第i种物品的费用是 p[i]，价值是 v[i]，求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
> 注：每种物品都无限量

### 思路
1. 该题与01背包问题的唯一区别就是物品的数量不限
1. 状态定义：
   ```
        V(i,j) 表示当容量为 j 的时候所装的前 i 件物品的最大价值
        w(i) 表示第 i 件物品的 重量
        p(i) 表示第 i 件物品的 价值
        k(i) 表示第 i 件物品的 数量
   ```
1. 状态转移：
$$
V(i,j) = \begin{cases}
0 & i=0 或者 j=0  \\
V(i-1,j) &  j < w(i)  \\
 max \begin{cases}
    V(i-1,j-w(i) \times k(i)) + p(i) \times k(i)  \\
    V(i-1,j)
\end{cases}
& j \geq w(i) \times k(i)
\end{cases}
$$
### 实现

```java
/**
 * 完全背包问题
 *
 * @author ychost
 * @date 2018-3-15
 */
public class KnapsackComplete {
    /***
     * 完全背包问题解法
     * @param weights 各个物品的重量
     * @param prices 对应的价值
     * @param capacity 包裹的容量
     * @return 包裹装的物品的最大价值
     */
    static int getMaxPrice(int[] weights, int[] prices, int capacity) {
        int[][] dp = new int[weights.length + 1][capacity + 1];
        int count = weights.length;
        for (int i = 1; i <= count; i++) {
            for (int j = 1; j <= capacity; j++) {
                for (int k = 0; k * weights[i - 1] <= j; k++) {
                    //不能放下
                    if (j < weights[i - 1]) {
                        dp[i][j] = dp[i - 1][j];
                    } else {
                        int p = prices[i - 1];
                        int w = weights[i - 1];
                        //状态转移方程
                        int before = dp[i - 1][j];
                        int after = dp[i - 1][j - k * w] + k * p;
                        dp[i][j] = before > after ? before : after;
                    }
                }
            }
        }
        print(dp, weights, prices, capacity);
        return dp[count][capacity];
    }

    /**
     * 打印
     *
     * @param dp      完全背包问题的状态集合
     * @param weights 各个物品的重量
     * @param prices  各个物品的价值
     */
    static void print(int[][] dp, int[] weights, int[] prices, int capacity) {
        int i = weights.length;
        int j = capacity;
        boolean isError;
        Stack<Integer> stack = new Stack<>();
        while (i > 0 || j > 0) {
            if (i > 0 && j > 0) {
                isError = true;
                int w = weights[i - 1];
                int p = prices[i - 1];
                //价值和之前的一样，说明 i 没有被放进背包
                if (dp[i][j] == dp[i - 1][j]) {
                    stack.push(0);
                    --i;
                    continue;
                }
                for (int k = 0; w * k <= j; k++) {
                    //找到 i 放的个数
                    if (dp[i][j] == dp[i - 1][j - w * k] + k * p) {
                        stack.push(k);
                        --i;
                        j -= w * k;
                        isError = false;
                        break;
                    }
                }
                if (isError) {
                    throw new RuntimeException("dp 有误");
                }
            } else if (j == 0) {
                stack.push(0);
                --i;
            } else {
                break;
            }
        }
        System.out.print("{ ");
        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + ",");
        }
        System.out.println("}");
    }
}
```

#### 测试数据

```java
int[] weights = {3, 4, 5, 6, 7};
int[] prices = {5, 6, 9, 10, 11};
int capacity = 13;
System.out.println(KnapsackComplete.getMaxPrice(weights, prices, capacity));
//output
//{ 1,0,2,0,0,}
//23
```
