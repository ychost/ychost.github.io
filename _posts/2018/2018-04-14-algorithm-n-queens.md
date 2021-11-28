---
layout: post
title: 算法-N 皇后问题
categories: [算法]
description: "八皇后问题，是一个古老而著名的问题，是回溯算法的典型案例。该问题是国际西洋棋棋手马克斯·贝瑟尔于1848年提出：在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。 高斯认为有76种方案。1854年在柏林的象棋杂志上不同的作者发表了40种不同的解，后来有人用图论的方法解出92种结果。计算机发明后，有多种计算机语言可以解决此问题。"
keywords: 股票, Java
tags: [股票, Java]
excerpt: " 八皇后问题，是一个古老而著名的问题，是回溯算法的典型案例。该问题是国际西洋棋棋手马克斯·贝瑟尔于1848年提出：在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。 高斯认为有76种方案。1854年在柏林的象棋杂志上不同的作者发表了40种不同的解，后来有人用图论的方法解出92种结果。计算机发明后，有多种计算机语言可以解决此问题。"
---

## 背景
八皇后问题，是一个古老而著名的问题，是回溯算法的典型案例。该问题是国际西洋棋棋手马克斯·贝瑟尔于1848年提出：在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。 高斯认为有76种方案。1854年在柏林的象棋杂志上不同的作者发表了40种不同的解，后来有人用图论的方法解出92种结果。计算机发明后，有多种计算机语言可以解决此问题。  

这里以 8 * 8 的格子为例，在一个 8 * 8 的棋盘中要摆放 8 个棋子，要求 8 个棋子中的任何两个棋子不能在同一行、同一列、同一对角线，求一共有到多少种摆放的方式。

[![n-queens][img1]][img1]{:data-lightbox="queens"}

那么对于「N 皇后问题」就是在一个 N * N 的棋盘中摆放 N 个棋子，要求任意两个棋子不在同一行，不在同一列，不在同一对角线，求有多少种摆放的方式。

## 算法思想
1. 先将 N 个棋子分别摆在 N 列，这样可以保证不在同一列。
1. 对于每个棋子而言，它们只能在 N 行当中选择一行，且互斥。
1. 用一个数组，里面的索引表示列号，索引对应的值表示行号，当然索引对应的值不能有重复。
1. 其实就求 [1..N] 的所有全排列，然后筛选出符合条件的排列即可。

### 求 N 的全排列
求出元素 [0..N-1] 的所有排列，全排列算法和组合算法类似，只是组合算法只能从前往后取，但是排列算法每步可以随便取
```java
List<List<Integer>> findNAllPmu(int n){
    List<List<Integer>> result = new ArrayList<>();
    permutations(result,new ArrayList<>(),n);
    return result;
}

public void permutations(List<List<Integer>> result,List<Integer> values,int n){
    if(values.size() == n){
        result.add(new ArrayList<>(values));
    }else{
        for(int i=0;i<n;i++){
            if(values.contains(i)){
                continue;
            }
            values.add(i);
            permutations(result,values,n);
            values.remove(values.size() -1);
        }
    }
}

```
### 判断某一排列是否满足条件
根据算法的描述，它们已经处于不同行不同列了，所以只需要判断有没有两个棋子在同一对角线。

```java
public boolean canPlace(List<Integer> list){
    for(int i=0;i<list.size();i++){
        for(int j=i+1;j<list.size();j++){
            if(Math.abs(list.get(i) - list.get(j)) == j -i){
                return false;
            }
        }
    }
    return true;
}
```

## 实现
```java
    public int resolve(int n) {
        if (n <= 0) {
            return 0;
        }
        List<List<Integer>> result = new ArrayList<>();
        findAllSolutions(result, new ArrayList<>(), n);
        return result.size();
    }

   void findAllSolutions(List<List<Integer>> result, List<Integer> values, int n) {
        if (values.size() == n && canPlace(values)) {
            result.add(new ArrayList<>(values));
        } else {
            for (int i = 0; i < n; i++) {
                if (values.contains(i) || !canPlace(values)) {
                    continue;
                }
                values.add(i);
                findAllSolutions(result, values, n);
                values.remove(values.size() - 1);
            }
        }
    }

   public boolean canPlace(List<Integer> list) {
        for (int i = 0; i < list.size(); i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (Math.abs(list.get(i) - list.get(j)) == Math.abs(j - i)) {
                    return false;
                }
            }
        }
        return true;
    }
 
```

## 总结
1. 该方法简单直观，但是效率低要对比所有的排列，N 的全排列一共有 N! 种。
1. 可以考虑剪枝、多线程等方面对其进行优化。

[img1]: /images/post/algorithm/n-queens.jpg
