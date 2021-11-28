---
layout: post
title: 动态规划[9]-正整数分组
categories: [刷题]
description: 将一堆正整数分为 2 组，要求 2 组的和相差最小 
keywords: 动态规划,正整数分组
tags: [动态规划,正整数分组]
excerpt: 将一堆正整数分为 2 组，要求 2 组的和相差最小
---

### 问题
将一堆正整数分为 2 组，要求 2 组的和相差最小。 
```
例如：1 2 3 4 5，将 1 2 4 分为 1 组，3 5 分为 1 组，两组和相差 1，是所有方案中相差最少的。
```
### 思路
1. 将题目适当修改下：
   将一堆正整数分 2 组，要求其中 1 组的和最接近 数组和/2

1. 状态定义：

```
    V(i,j) 表示当和为 j 的时候的前 i 个数的最接近 j 的和
    a(i) 表示第 i 个数的取值
```

1. 状态转移：

$$
V(i,j) = \begin{cases}
0　& i=0 或 j=0  \\
min \begin{cases}
    abs(j-a(i))  \\
    abs(j-V(i-1,j))\\
\end{cases}
&  a(i) \geq j \\
min \begin{cases}
    abs(j - V(i-1,j)) \\
    abs(j - V(i-1,j-a(i))) \\
\end{cases}
& a(i) < j
\end{cases}
$$

### 实现

```java

/**
 * 正整数数组分组问题
 *
 * @author ychost
 * @date 2018-3-17
 */
public class IntArraySplit {
    /**
     * 将正整数分成两组求其分组差值中的最小值
     * 可以思考成求数组中的取数，使得其和最接近 数组和/2
     * 那么问题的思索方式就和凑单的思考方式一致了
     *
     * @param array 待分组数组
     * @return 分组差的最小值
     */
    static int getSubMax(int[] array) {
        int count = array.length;
        int avg = (int) (Arrays.stream(array).sum() / 2 + 0.5);
        int[][] dp = new int[count + 1][avg + 1];
        for (int j = 1; j <= avg; j++) {
            for (int i = 1; i <= count; i++) {
                int before = dp[i - 1][j];
                int beforeSub = Math.abs(avg - before);
                int data = array[i - 1];
                //由于所有数是整数，所以如果包含 data 那么只能取 data 一个数
                //否者就不包含 data 两者做比较
                if (data >= j) {
                    int dataSub = Math.abs(avg - data);
                    dp[i][j] = beforeSub < dataSub ? before : data;
                } else {
                    //比较放入 data 和 不放 data 谁更接近 avg
                    int after = dp[i - 1][j - data] + data;
                    int afterSub = Math.abs(avg - after);
                    dp[i][j] = beforeSub < afterSub ? before : after;
                }
            }
        }
        print(dp, array, avg);
        return dp[count][avg];
    }

    /**
     * 打印取数的结果
     *
     * @param dp    取数状态
     * @param array 原始数组
     * @param avg   原始数组和/2
     */
    static void print(int[][] dp, int[] array, int avg) {
        int j = avg;
        int i = array.length;
        //存第一组
        Map<Integer, Integer> map = new TreeMap<>();
        //存第二组
        List<Integer> list = new ArrayList<>();
        //按照 dp 的构造方式遍历出来即可
        while (i > 0 && j > 0) {
            int data = array[i - 1];
            int before = dp[i - 1][j];
            int beforeSub = Math.abs(avg - before);
            if (data >= j) {
                int dataSub = Math.abs(avg - data);
                if (beforeSub > dataSub) {
                    if (!map.containsKey(data)) {
                        map.put(data, 0);
                    }
                    map.put(data, map.get(data) + 1);
                }
                --i;
            } else {
                int after = dp[i - 1][j - data] + data;
                int afterSub = Math.abs(avg - after);
                if (beforeSub > afterSub) {
                    if (!map.containsKey(data)) {
                        map.put(data, 0);
                    }
                    map.put(data, map.get(data) + 1);

                    j -= data;
                }
                --i;
            }
        }
        //过滤出第二组
        for (int k = 0; k < array.length; k++) {
            int data = array[k];
            if (!map.containsKey(data)) {
                list.add(data);
            } else {
                if (map.get(data) == 0) {
                    list.add(data);
                } else {
                    map.put(data, map.get(data) - 1);
                }
            }
        }
        //打印
        StringBuilder builder = new StringBuilder(array.length * 2);
        builder.append("{");
        map.forEach((k, v) ->
                builder.append(k).append(",")
        );
        builder.append("}\n{");
        list.forEach(k -> builder.append(k).append(","));
        builder.append("}");
        System.out.println(builder);
    }
}
```
#### 测试数据
```java

@Test
public void getSubMax() {
    int[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    System.out.println(IntArraySplit.getSubMax(array));
}
//output
//{1,2,3,4,5,6,}
//{7,8,9,}
//23
```