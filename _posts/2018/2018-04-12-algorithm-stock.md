---
layout: post
title: 算法-股票问题
categories: [算法]
description: "给定一个数组表示当天的股票价格，通过确定买卖的方式获取利益最大。"
keywords: 股票, Java
tags: [股票, Java]
excerpt: "
给定一个数组表示当天的股票价格，通过确定买卖的方式获取利益最大。
"
---

## 背景
[Best Time to Buy and Sell Stock I][href1]  
[Best Time to Buy and Sell Stock II][href2]  
[Best Time to Buy and Sell Stock III][href3]  
[Best Time to Buy and Sell Stock IV][href4]  

给定一个数组```prices```表示第```i```天的股票价格为```prices[i]```，求经过```k```次交易后的最大利润
1. 每次必须将手中的股票全部抛出后才能进行下一次交易
1. 交易：买--卖 或者 买
   > 即一次买卖算一次交易，或者只买不卖也算一次

## 算法
### 状态定义
股票的相关算法应用动态规划或者贪心算法来解决，因为贪心算法不好证明所以这里用动态规划，按题意当天手中只能持有 1 股或者 0 股。

1. 一天的状态只能「买」、「卖」、「休息」。
1. ```h1[i][j]```第 i 天，交易了 j 次，i 天之后还持有 1 股的时候的最大利润，i 从 1 开始，j 从 1 开始。
1. ```h0[i][j]```第 i 天，交易了 j 次，i 天之后还持有 0 股的时候的最大利润，i 从 1 开始，j 从 1 开始。


### 状态转移
```h1[i+1][j] = max(h1[i][j],h0[i][j-1] - prices[i])```    

```h0[i+1][j] = max(h0[i][j],h1[i][j] + prices[i])```

1. ```h1[i+1][j] = h1[i][j]```表示第```i+1```天「休息」，之后手中还留有 1 股。 
1. ```h1[i+1][j] = h0[i][j-1] - prices[i]```表示第```i+1```天「买」 1 股，之后手中还留有 1 股。
1. ```h0[i+1][j] = h0[i][j]```表示第```i+1```「休息」，之后手中还留有 0 股。
1. ```h0[i+1][j] = h1[i][j] + prices[i]```表示第```i+1```天「卖」 1 股，之后手中还留有 0 股。

最后返回的结果为```h0[prices.length][k]```发生```k```次交易手中还剩 0 股的情况。

注意为什么为```h0[i][j-1] - prices[i]```、```h1[i][j] + prices[i]```中一个为```j-1```一个为```j```？  
因为一次买卖算一次交易，单独的一次买也算一次交易。```h0[i][j-1] - prices[i]```表示重新发起一次买的操作，会增加一次交易，```h1[i][j] + prices[i]```只是将手中股票卖出，并不会发起新的交易。

### 初始化
```h1[i][j] = Integer.MIN_VALUE```  
动态规划是一个自下而上的计算过程，因为转移公式中有```h1[i][j] + prices[i]```所以当没有发生交易的时候不可能凭空手中持有 1 股，所以这时候肯定不能选```h1[i][j] + prices[i]```，将```h1[i][j]```初始化成最小值。

```h0[i][j] = 0```
在没有发生交易的时候，手中持有 0 股，利润为 0。


## 实现
```java
public int maxProfit(int[] prices,int k){
    int[][] h0 = new int[prices.length+1][k+1];
    int[][] h1 = new int[prices.length+1][k+1];
    for(int i=0;i<h1.length;i++){
        Arrays.fill(h1[i],Integer.MIN_VALUE);
    }
    for(int i=0;i<prices.length;i++){
        for(int j=1;j<=k;j++){
            h1[i+1][j] = Math.max(h1[i][j],h0[i][j-1] - prices[i]);
            h0[i+1][j] = Math.max(h0[i][j],h1[i][j] + prices[i]);
        }
    }
    return h0[prices.length][k];
}
```

### 优化
1. 这里所有的```i+1```的状态都是来自于```i```所以从```h0[i][j]```变成```h0[j]```自己保存自己上一个状态即可，就没必要记录下天数，所以可以做如下优化

   * ```h1[j+1] = max(h1[j],h0[j-1] - prices[i])```
   * ```h0[j+1] = max(h0[j],h1[j] + prices[i])```

```java
public int maxProfit(int[] prices,int k){
    int[] h0 = new int[k +1];
    int[] h1 = new int[k +1];
    Arrays.fill(h1,Integer.MIN_VALUE);
    for(int i=0;i<prices.length;i++){
        for(int j=1;j<=k;j++){
            h1[j] = Math.max(h1[j],h0[j-1] - prices[i]);
            h0[j] = Math.max(h0[j],h1[j] + prices[i]);
        }
    }
    return h0[k];
}
```

1. 如果当```k```很大的时候，这里势必会超过空间限制，```prices```中最多发生```prices.length / 2```次交易，所以多余的交易没有意义
```java
public int maxProfit(int[] prices,int k){
    if(k > prices.length >>> 1){
        int max = 0;
        for(int i=1;i<prices.length;i++){
            if(prices[i] - prices[i-1] > 0){
                max += prices[i] - prices[i-1];
            }
        }
        return max;
    }
    int[] h0 = new int[k +1];
    int[] h1 = new int[k +1];
    Arrays.fill(h1,Integer.MIN_VALUE);
    for(int i=0;i<prices.length;i++){
        for(int j=1;j<=k;j++){
            h1[j] = Math.max(h1[j],h0[j-1] - prices[i]);
            h0[j] = Math.max(h0[j],h1[j] + prices[i]);
        }
    }
    return h0[k];
}
```

## 进阶
如果每笔交易需要固定的手续费 [Best Time to Buy and Sell Stock with Transaction Fee][href5] 

算法和上述一致，只是```h1[i][j] + prices[i]``` 变成 ```h1[i][j] + prices[i] - fee```

```java
public int maxProfit(int[] prices,int fee){
    int[] h1 = new int[prices.length +1];
    int[] h0 = new int[prices.length +1];
    h1[0] = -prices[0];
    for(int i=0;i<prices.length;i++){
        h1[i+1] = Math.max(h1[i],h0[i] - prices[i]);
        h0[i+1] = Math.max(h0[i],h1[i] + prices[i] - fee );
    }
    return h0[prices.length]; 
}
```

注：这里只设置了```h1[0] = -prices[0]``` 而不是 ```Integer.MIN_VALUE```因为防止```h1[i] + prices[i] - fee``` 出问题。

     


[href1]: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
[href2]: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
[href3]: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/
[href4]: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
[href5]: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/