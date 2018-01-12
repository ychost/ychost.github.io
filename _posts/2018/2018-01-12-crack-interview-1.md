---
layout: post
title: 程序员面试宝典 第5版 数组与字符串
categories: [程序员面试宝典,Java]
description: 程序员面试宝典 第5版本 数组与字符串习题解答，主要是 Java 部分的解答
keywords: 面试, Java
tags: [面试,Java]
---
##### 第1题
实现一个算法确定一个字符串的所有字符是否完全不同，假使不允许是有额外的数据结构又该如何处理？

``` java
public class ArrayAndString{
           /**
     * 第1题，检测字符串中所有字符是否都不相同解法1
     */
    public static boolean isStringUnique1(String str) {
        if (str == null) {
            return true;
        }
        for (int i = 0; i < str.length(); i++) {
            for (int j = i + 1; j < str.length(); j++) {
                if (str.charAt(i) == str.charAt(j)) {
                    return false;
                }
            }
        }
        return true;
    }

    /*
     * 第1题，检测字符串中所有字符是否都不相同解法2 
     * 假定@str为Unicode
     * 注：Unicode含有65536个字符
     */
    public static boolean isStringUnique2(String str) {
        if (str == null || str.length() > 65536) {
            return true;
        }
        boolean[] containChars = new boolean[65536];
        for (int i = 0; i < str.length(); i++) {
            int index = str.charAt(i);
            if (containChars[index]) {
                return false;
            }
            containChars[index] = true;
        }
        return true;
    }

    /**
     * 第1题，检测字符串中所有字符是否都不相同解法3 
     * 假定@str只为a-z，相当于用一个int (32位)来保存a-z(26个)
     * 注：str只可能取26个字母
     */
    public static boolean isStringUnique3(String str) {
        if (str == null || str.length() > 26) {
            return true;
        }
        int checker = 0;
        for (int i = 0; i < str.length(); i++) {
            int val = str.charAt(i) - 'a';
            //检查某一位是否重复，重复则认为字符串有相同字符
            if ((checker & 1 << val) > 0) {
                return false;
            }
            checker |= 1 << val;
        }
        return true;
    }
}
```

##### 第3题
给定两个字符串，请编写程序，确定其中一个字符串重新排列后能否变成另一个字符串

```java
public class ArrayAndString{
    /**
     * 第3题，两个字符串能否通过排列变成一样
     * 还有一种解法思路，对两个字符串进行排序，排序后如果完全相等这认为可以转化，但是这样效率比较低
     */
    public static boolean twoStrCanBePerSame(String str1, String str2) {
        if (str1 == null || str2 == null || str1.length() != str2.length()) {
            return false;
        }
        HashMap<Integer, Integer> str1Map = new HashMap<>();
        HashMap<Integer, Integer> str2Map = new HashMap<>();
        for (int i = 0; i < str1.length(); i++) {
            Integer key = Integer.valueOf((int) str1.charAt(i));
            Integer val = str1Map.get(key);
            if (val == null) {
                val = 0;
            }
            ++val;
            str1Map.put(key, val);
        }
        for (int j = 0; j < str2.length(); j++) {
            Integer key = Integer.valueOf((int) str2.charAt(j));
            Integer val = str2Map.get(key);
            if (val == null) {
                val = 0;
            }
            ++val;
            str2Map.put(key, val);
        }

        Iterator it = str1Map.keySet().iterator();
        while (it.hasNext()) {
            Integer key = (Integer) it.next();
            if(!str1Map.get(key).equals(str2Map.get(key))){
                return false;
            }
        }
        return true;
    }
}
```

##### 第4题
编写一个方法，将字符串空格替换为“20%”，用字符数组实现假定数组有足够的长度
> 处理字符串常见的方式是从字符串尾部开始编辑，因为字符数组有额外的缓冲而不用担心覆盖之前的数据

```java
public class ArrayAndString{
    /**
     * 第4题，替换一个字符串中的空格，用字符数组实现，假定数组有足够的长度
     * 这里@repStr可用任意含非空格字符串代替，包括 %20
     */
    public static void replaceSpace(char[] strs, int count, String repStr) {
        //找出一共多少空格
        int spaceCount = 0;
        for (int i = 0; i < count; i++) {
            if (strs[i] == ' ') {
                spaceCount += 1;
            }
        }
        //计算新的长度，从后往前进行写数据
        int newLen = count + (repStr.length() - 1) * spaceCount;
        for (int i = count - 1; i >= 0; i--) {
            //替换
            if (' ' == strs[i]) {
                for (int j = 0; j < repStr.length(); j++) {
                    strs[newLen - j - 1] = repStr.charAt(repStr.length() - j - 1);
                }
                newLen -= repStr.length();
            } else {
                strs[newLen - 1] = strs[i];
                newLen -= 1;
            }
        }
    }
}
```