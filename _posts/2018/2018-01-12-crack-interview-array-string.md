---
layout: post
title: 程序员面试宝典 第5版 数组与字符串
subtitle: 面试宝典
categories: [刷题]
description: 程序员面试宝典 第5版本 数组与字符串习题解答，主要是 Java 部分的解答
keywords: 刷题, Java
tags: [刷题,Java]
---

 程序员面试宝典 第5版本 数组与字符串习题解答笔记

##### 第 1 题 √
实现一个算法确定一个字符串的所有字符是否完全不同，假使不允许是有额外的数据结构又该如何处理？

``` java
public class ArrayAndString {
    /**
     * 第 1.1 题，检测字符串中所有字符是否都不相同解法1
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
     * 第 1.1 题，检测字符串中所有字符是否都不相同解法2 
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
     * 第 1.1 题，检测字符串中所有字符是否都不相同解法3 
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

##### 第 2 题 √
给定两个字符串，请编写程序，确定其中一个字符串重新排列后能否变成另一个字符串

```java
public class ArrayAndString {
    /**
     * 第 1.3 题，两个字符串能否通过排列变成一样
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

##### 第 3 题
编写一个方法，将字符串空格替换为“20%”，用字符数组实现假定数组有足够的长度
> 处理字符串常见的方式是从字符串尾部开始编辑，因为字符数组有额外的缓冲而不用担心覆盖之前的数据

```java
public class ArrayAndString {
    /**
     * 第 1.4 题，替换一个字符串中的空格，用字符数组实现，假定数组有足够的长度
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

##### 第 4 题 √
利用字符串重复出现的次数，编写一个方法基本实现压缩字符串的功能，比如字符串 abbbbcc 会变成 a1b4c2 。若 “压缩” 后的字符串的长度没有变短则返回原来的字符串

```java
public class ArrayAndString {
    /**
     * 第 1.5 题
     * 压缩字符串方法2，直接用 StringBuilder 进行构造提升效率
     */
    public static String compressStr(String str) {
        if (str == null || str.length() == 0) {
            return str;
        }
        StringBuilder builder = new StringBuilder();
        int count = 0;
        char lastCh = str.charAt(0);
        for (int i = 0; i < str.length(); i++) {
            if (lastCh == str.charAt(i)) {
                count++;
            } else {
                builder.append(str.charAt(i));
                builder.append(count);
                count = 1;
            }
            lastCh = str.charAt(i);
        }
        builder.append(lastCh);
        builder.append(count);
        if (builder.length() >= str.length()) {
            return str;
        }
        return builder.toString();
    }
}
```

##### 第 5 题
给定一幅由 NxN 矩阵表示的图像，其中每个像素的大小为 4 个字节，编写一个方法，将图像旋转 90° 且不占用额外内存空间

> 由外向内，一层一层进行旋转

```java
public class ArrayAndStrig { 
        /**
     * 第 1.6 题，将一个 NxN 的矩阵旋转 90° 且不占用额外的空间
     * 思想：由外向内，一层一层旋转，旋转算法为 
     * tmp:=top, top := left, left := bottom, bottom := right, right := tmp;
     */
    public static void ratoteMatrix90(int[][] matrix, int n) {
        for (int layer = 0; layer < n / 2; layer++) {
            for (int i = layer; i < n - layer - 1; i++) {
                //索引由大道小
                int decrease = n - i - 1;
                //最后一个索引
                int lastIndex = n - layer - 1;
                //索引由小到大
                int increase = i;
                int top = matrix[layer][i];
                //左到上
                matrix[layer][increase] = matrix[decrease][layer];
                //下到左
                matrix[decrease][layer] = matrix[lastIndex][decrease];
                //右到下
                matrix[lastIndex][decrease] = matrix[increase][lastIndex];
                //上到右
                matrix[increase][lastIndex] = top;
            }
        }
    }
}
```
##### 第 6 题 √
编写一个算法，若 MxN 矩阵中某元素为 0 ，则将其所在的行列清零
> 注意陷阱，清零了某行、列之后如果再遍历「被清零」的元素执行清零操作则会导致 Bug

```java
public class ArrayAndString {
    /**
     * 第 1.7 题，矩阵中某个元素为 0 则将该元素所在行列均的元素均置为 0 
     */
    public static void clearMatrixZero(int[][] matrix) {
        //某行是否被清零
        boolean[] rowIsClear = new boolean[matrix.length];
        //某列是否被清零
        boolean[] colIsClear = new boolean[matrix[0].length];

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                if (rowIsClear[i] || colIsClear[j]) {
                    continue;
                }
                if (matrix[i][j] == 0) {
                    //置位
                    rowIsClear[i] = true;
                    colIsClear[j] = true;
                    //清零k列
                    for (int k = 0; k < matrix.length; k++) {
                        matrix[k][j] = 0;
                    }
                    //清零k行
                    for (int k = 0; k < matrix[0].length; k++) {
                        matrix[i][k] = 0;
                    }
                }
            }
        }
    }
}
```
##### 第 7 题 √
给定两个字符串 s1 和 s2，判定 s2 可由 s1 旋转，而来且给定一个函数 isSubString 可判定一个字符串是另一个字符串的子串  
再只能调用一次的 isSubString 的情况下解决该问题

```java
public class ArrayAndString {
    /**
     * 判定 sonStr 是否为 elder 的子串
     */
    public static boolean isSubString(String elder, String sonStr) {
        if (elder == null || sonStr == null || sonStr.length() > elder.length()) {
            return false;
        }
        int sonIndex = 0;
        for (int i = 0; i < elder.length(); i++) {
            if (elder.charAt(i) != sonStr.charAt(sonIndex)) {
                sonIndex = 0;
                continue;
            } else {
                sonIndex += 1;
                if (sonIndex == sonStr.length()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 第 1.8 题给定两个字符串 s1,s2 判定 s2 是否为 s1 旋转而来，最多只能调用 「一次」 isSubString 或者类似的方法
     * 可将字符串考虑成两部分 I和II，只要找到旋转后的I和II再分别做比较即可
     */
    public static boolean isRotateStr(String str1, String str2) {
        if (str1 == null || str2 == null || str1.length() != str2.length()) {
            return false;
        }
        for (int i = 0; i < str1.length(); i++) {
            if (str1.charAt(0) == str2.charAt(i)) {
                for (int k = i; k < str1.length(); k++) {
                    //比较旋转部分 I
                    if (str1.charAt(k - i) != str2.charAt(k)) {
                        continue;
                    }
                }
                //比较旋转部分 II
                for (int l = str1.length() - i; l < str1.length(); l++) {
                    if (str1.charAt(l) != str2.charAt(str2.length() - l - 1)) {
                        continue;
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * 第 1.8 题解法2，如果 s2 可由 s1 旋转而来，那么必然 s2 为 s1+s1 的子串, 反之亦然
     */
    public static boolean isRotateStr2(String str1, String str2) {
        String s1s1 = str1 + str1;
        return isSubString(s1s1, str2);
    }
}
```

##### 总结
关于字符串的操作一般有两种，一种是直接操作字符串另一种是操作字符数组，思路如下：
   1. 操作字符数组可以将字符数组扩充，然后反向重写数据，这样不能担心重写数据的时候覆盖原来的数据
   1. 字符串操作主要注意 [String、StringBuffer、StringBuilder][href1] 的合理使用
   1. 注意问清楚问题，比如字符串是否为 a-z 或者 Ascii 或者 Unicode 集合，这样就可以选取合理的保存空间大小提升空间效率
      1. a-z 可以考虑使用一个 int 数据来保存所有可能出现的字符 ( a-z 只有 26 个而一个 int 为 32 位)
      1. Ascii 可以考虑定义一个长度为 128 的数组来保存所有可能出现的字符
      1. Unicode 可以考虑定义一个长度为 65536 的数组来保存所有可能出现的字符
      1. 一般情况用 ArrayList 或者 HashMap 来进行操作


   [href1]: /2018/01/13/java-string-buffer-builder/