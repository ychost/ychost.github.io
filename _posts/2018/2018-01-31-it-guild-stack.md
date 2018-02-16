---
layout: post
title: 程序员代码面试指南 栈
categories: [刷题]
description:  程序员代码面试指南 栈 相关部分的题目
keywords: 面试,刷题,Java,Stack
tags: [刷题,Java,Stack]
excerpt: 程序员面试指南 栈 相关部分的题目
---

#### 反转栈 ☆☆
采用 递归 的方式逆序输出栈的数据，不能使用其它数据结构  

```java
/**
 * 《程序员代码面试指南》 仅使用递归的方式反转一个栈
 *
 * @author ychost
 * @date 2018-1-30
 */
@Data
public class StackReverseByRecursive {

    /**
     * 取出出栈底元素
     *
     * @param stack
     * @param <T>
     * @return
     */
    static <T> T pollBottom(Stack<T> stack) {
        var data = stack.pop();
        if (stack.isEmpty()) {
            return data;
        } else {
            //last 为 「栈底」元素
            var last = pollBottom(stack);
            //data 为 「栈底」之上的元素
            stack.push(data);
            return last;
        }
    }

    /**
     * 反转一个栈
     *
     * @param stack
     * @param <T>
     */
    static <T> void reverse(Stack<T> stack) {
        if (stack.isEmpty()) {
            return;
        }
        //将栈底元素一个一个取出来
        var data = pollBottom(stack);
        reverse(stack);
        //第一个放入的就是最后一次取出的「栈底」,即 「栈顶」元素
        //从而实现了反转
        stack.push(data);
    }
}
```

#### 最大子矩阵 ☆☆☆
给定一个只有 0 和 1 两种元素的矩阵，求全是 1 元素的矩形区域中的最大矩形区域的 1 的个数。  
如：
$$
\begin{Bmatrix}
	1 & 0 & 1 & 1 \\
	1 & 1 & 1 & 1 \\
	1 & 1 & 1 & 0 \\
\end{Bmatrix}
$$
其中，最大矩形区域有 6 个 1，所以结果为 6

__思路：__  
将题目稍作转换，以矩阵的每一行的索引作为横坐标，包括该行在内到第 1 行中连续 1 的个数作为纵坐标，则求出这样的直方图中的扩展的最大矩形区域的面积，
如：
[![matrix-histogram][img1]][img1]{:data-lightbox="big-submatrix"}

图中第二个元素所能扩展的最大矩形区域面积如上图所示，求出所有这样扩展的矩形区域面积然后取最大值，就能得到本题的解。   
具体算法如下：
1. 将矩阵的每一行为单位进行转换到如上所述的直方图数组令为 $$height$$，定义一个栈令为 $$stack$$。
1. 遍历 $$height$$中的元素（索引为 $$i$$），当$$height[i] <= height[stack.peek()]$$，则将$$stack$$顶部元素弹出求其扩展矩形区域的最大面积，否则$$stack.push(i)$$
1. 对于弹出元素$$j$$求其最大矩形区域面积公式如下：
\\[(i - k - 1)*height[j]\\]
> 其中：$$i$$为待压入的元素的索引，$$k$$为$$stack$$中与$$j$$的相邻元素，$$j$$为弹出元素  
> 特别地：$$j$$为栈底元素，则$$k = -1$$，$$j$$为$$height$$中的最后元素则$$i = height.length$$

对于最大矩形区域面积公式证明如下：
1. 由$$stack$$中元素的插入规律可知，弹出元素$$j$$向左只能扩展到$$k+1$$的位置，向右只能扩展到$$i$$的位置。
1. 可知区域面积的横坐标长度$$i-(k+1) = i-k-1$$，高度为$$height[j]$$
1. 所以面积为：
\\[(i - k - 1)*height[j]\\]
1. 对于两个特殊情况
    1. 当$$j$$为栈底元素的时候，此时无相邻元素，则认为向左不能进行扩展了，向右还是能扩展到$$i$$，所以面积为$$i*height[j]$$，可认为$$k=-1$$
    1. 当$$j==height.length -1$$，且直接压入了栈中，那么此时栈不为空，但是该栈还有元素没有弹出，所以直接将该栈元素全部弹出，可知栈底到栈顶元素依次递增
    那么，对于每个元素向左还是只能扩展到$$k+1$$，但是向右可以扩展所有，所以此时的面积为：$$(height.length - k -1)*height[j]$$，可认为：$$i=height.length$$

__实现：__

```java

/**
 * 输入：
 * 一个只有0,1两种元素组成的矩阵
 * 输出：
 * 一个只含有 1 的最大子矩阵的 1 的个数
 *
 * @author ychost
 * @date 2018-2-12
 */
public class MaxSubmatrix {

    /**
     * 解题算法
     *
     * @param matrix 只含有 1，0两种元素组成的矩阵
     * @return 只含有1的最大子矩阵中1的个数
     */
    static int getMaxSubmatrixArea(int[][] matrix) {
        //切割矩阵
        var heightArr = cutMatrix(matrix);
        var stack = new Stack<Integer>();
        var max = 0;
        for (var i = 0; i < heightArr.length; i++) {
            //获取每行切割高度扩展的最大矩形区域面积
            //只有当栈顶元素 < 当前元素 才进行压栈
            //否则弹出栈顶元素，并计算其扩展的最大矩形区域面积
            for (var j = 0; j < heightArr[i].length; j++) {
                var height = heightArr[i];
                while (!stack.isEmpty() && height[stack.peek()] >= height[j]) {
                    var size = popStackGetMaxRecArea(stack, height, j);
                    max = size > max ? size : max;
                }
                stack.push(j);
            }
            while (!stack.isEmpty()) {
                var size = popStackGetMaxRecArea(stack, heightArr[i], heightArr[0].length);
                max = size > max ? size : max;
            }
        }
        return max;
    }

    /**
     * 从栈中弹出元素，并获取该元素能够扩展的最大矩形区域的面积
     *
     * @param stack  存有「height 索引」的栈
     * @param height 矩阵切割的某行的高度
     * @param i      待压如栈顶的元素的索引
     * @return 扩展的最大矩形区域面积
     */
    static int popStackGetMaxRecArea(Stack<Integer> stack, int[] height, int i) {
        var j = stack.pop();
        var k = -1;
        if (!stack.isEmpty()) {
            k = stack.peek();
        }
        //弹出元素对应的面积
        return (i - k - 1) * height[j];
    }

    /**
     * 将矩阵进行切割，找出从第0行到切割行之间连续「1」的个数
     *
     * @param matrix 矩阵
     * @return 连续为「1」的个数为元素的数组
     */
    static int[][] cutMatrix(int[][] matrix) {
        var heightArr = new int[matrix.length][matrix[0].length];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (i == 0) {
                    heightArr[i][j] = matrix[i][j];
                } else {
                    heightArr[i][j] = matrix[i][j] == 0 ? 0 : heightArr[i - 1][j] + 1;
                }
            }
        }
        return heightArr;
    }
}
```


[img1]: /images/post/algorithm/matrix-histogram.png