---
layout: post
title: 程序员代码面试指南 栈
categories: [刷题]
description:  程序员代码面试指南 栈 相关部分的题目
keywords: 面试,刷题,Java,Stack
tags: [刷题,Java,Stack]
excerpt: 程序员面试指南 栈 相关部分的题目
---

#### 逆序 输出栈的数据
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