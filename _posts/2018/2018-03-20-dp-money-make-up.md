---
layout: post
title: 动态规划[11]-钱币拼凑
categories: [刷题]
description: 给你六种面额 1、5、10、20、50、100 元的纸币，假设每种币值的数量都足够多，编写程序求组成N元（N为0~10000的非负整数）的不同组合的个数。  
keywords: 动态规划, 钱币拼凑, 美团
tags: [动态规划, 美团]
excerpt: 给你六种面额 1、5、10、20、50、100 元的纸币，假设每种币值的数量都足够多，编写程序求组成N元（N为0~10000的非负整数）的不同组合的个数。 
---

### 题目
给你六种面额 1、5、10、20、50、100 元的纸币，假设每种币值的数量都足够多，编写程序求组成N元（N为0~10000的非负整数）的不同组合的个数。 

### 思路
1. 状态描述：

```
dp[j] 表示拼凑 j 元的不同组合数
``` 

1. 状态转移：

```
dp[j] = dp[j] + dp[j-m], m 为当前的面额，其中 m <= j
dp[0]=1
```

### 实现
```java
public class Main{
    public static void main(String[] args){
         Scanner  scanner = new Scanner(System.in);
         while(scanner.hasNextInt()){
             long result = getCombination(scanner.nextInt());
             System.out.println(result);
         }
    }
    static long getCombination(int n){
         int[] cashes = new int[]{1,5,10,20,50,100};
         int count = cashes.length;
         long[] dp = new long[n+1];
         dp[0]=1;
            for(int i=0;i<count;i++){
               for(int j=cashes[i];j<=n;j++){
                   //在未使用 cashes[i] 的时候的组合数
                   //加上使用了 cashes[i] 的组合数
                   dp[j] = dp[j]+dp[j-cashes[i]];
            }
        }
        return dp[n];
    }
}
```