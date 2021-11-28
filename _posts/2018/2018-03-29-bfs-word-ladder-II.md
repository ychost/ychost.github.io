---
layout: post
title: 广度优先[3]-Word Ladder II
categories: [刷题]
description: "Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

    1. Only one letter can be changed at a time
    2. Each transformed word must exist in the word list. Note that beginWord is not a transformed word."
keywords: LeetCode, Word Ladder II
tags: [LeetCode, BFS, Java]
excerpt: "Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

    1. Only one letter can be changed at a time
    1. Each transformed word must exist in the word list. Note that beginWord is not a transformed word."
---

### 题目
Gven two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
For example,

Given:

```
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
```
Return

```
  [
    ["hit","hot","dot","dog","cog"],
    ["hit","hot","lot","log","cog"]
  ]
```

Note:
Return an empty list if there is no such transformation sequence.
   1. All words have the same length.
   1. All words contain only lowercase alphabetic characters.
   1. You may assume no duplicates in the word list.
   1. You may assume beginWord and endWord are non-empty and are not the same.

### 题意
1. 给定两个单词```beginWord```和```endWord```以及一个字典
1. 求```beginWord```变化到```endWord```的所有 __最短__ 变化路径：```List<List<String>>```
1. 每次变化都只能改变单词中的一位，且改变后的单词必须存在与字典里面

### 思路
这个题在 LeetCode 上面的难度为 Hard，求解起来十分麻烦，这里既用到了 BFS 也用到了 DFS，方法来自大神 [Cheng_Zhang][href1]
1. 用 BFS 求解出最短的变化数
1. 用 DFS 求解出具有该变化数的所有变化路径

### 实现

```java
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        //字典去重
        Set<String> dict = new HashSet<>(wordList);
        //字典中每个单词与 beginWord 的距离
        Map<String, Integer> distance = new HashMap<>();
        //字符只相差一位的相邻单词
        Map<String, List<String>> neighbors = new HashMap<>();
        //返回结果
        List<List<String>> res = new LinkedList<>();
        //结果包裹项
        List<String> solution = new LinkedList<>();
        dict.add(beginWord);
        //广度优先填充，distance、neighbors
        bfs(dict, distance, neighbors, beginWord, endWord);
        //深度优先求解 res
        dfs(distance, neighbors, beginWord, endWord, solution, res);
        return res;
    }

    /**
     * 广度优先查找出所有字典字符串离 beginWord 的距离、邻节点
     *
     * @param dict
     * @param distance
     * @param neighbors
     * @param beginWord
     * @param endWord
     */
    void bfs(Set<String> dict, Map<String, Integer> distance,
             Map<String, List<String>> neighbors,
              String beginWord, String endWord) {
        //初始化距离
        for (String w : dict) {
            neighbors.put(w, new LinkedList<>());
        }
        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        distance.put(beginWord, 0);
        while (!queue.isEmpty()) {
            String cur = queue.poll();
            //遍历邻节点
            List<String> curNeighbors = getNeighbors(cur, dict);
            for (String ngh : curNeighbors) {
                neighbors.get(cur).add(ngh);
                //赋值距离
                if (!distance.containsKey(ngh)) {
                    distance.put(ngh, distance.get(cur) + 1);
                    queue.add(ngh);
                }
            }
        }
    }

    /**
     * 求解出 res
     *
     * @param distance
     * @param neighbors
     * @param cur
     * @param enWord
     * @param solution
     * @param res
     */
    void dfs(Map<String, Integer> distance,
             Map<String, List<String>> neighbors,
             String cur, String enWord,
             List<String> solution, List<List<String>> res) {
        solution.add(cur);
        if (enWord.equals(cur)) {
            res.add(new ArrayList<>(solution));
        } else {
            for (String next : neighbors.get(cur)) {
                if (distance.get(next) == distance.get(cur) + 1) {
                    dfs(distance, neighbors, next, enWord, solution, res);
                }
            }
        }
        solution.remove(solution.size() - 1);
    }


    /**
     * 获取所有的与之相差一位的邻节点
     *
     * @param node 待比较字符串
     * @param dict 字符串字典
     * @return 字典中与比较字符串只有一位不同的数据
     */
    private List<String> getNeighbors(String node, Set<String> dict) {
        List<String> res = new LinkedList<>();
        char chs[] = node.toCharArray();
        for (char ch = 'a'; ch <= 'z'; ch++) {
            for (int i = 0; i < chs.length; i++) {
                if (chs[i] == ch) continue;
                char tmp = chs[i];
                chs[i] = ch;
                if (dict.contains(String.valueOf(chs))) {
                    res.add(String.valueOf(chs));
                }
                chs[i] = tmp;
            }
        }
        return res;
    }
```

[href1]: https://leetcode.com/problems/word-ladder-ii/discuss/40475/My-concise-JAVA-solution-based-on-BFS-and-DFS