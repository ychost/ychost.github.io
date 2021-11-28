---
layout: post
title: 算法-四则运算
categories: [算法]
description: 四则运算要考虑计算的优先级比如「*」，「/」的优先级高于「+」，「-」，还要考虑括号等等，当做出了一个简易的四则运算法则之后再去处理其它的问题比如表达式解析等等都是很轻松的
keywords: 算法, 四则运算
tags: [java, 四则运算]
excerpt: 四则运算要考虑计算的优先级比如「*」，「/」的优先级高于「+」，「-」，还要考虑括号等等，当做出了一个简易的四则运算法则之后再去处理其它的问题比如表达式解析等等都是很轻松的
---

### 背景
> 为了简化，所有的计算都是针对于整数的

1. [不含括号的四则运算，支持多个空格](https://leetcode.com/problems/basic-calculator-ii/description/)
   ```
    Input: " 3+5 / 2 "
    Output: 5
   ```
1. [带括号的加减运算，支持多个空格](https://leetcode.com/problems/basic-calculator/description/)
   ```
    Input: "(1+ (4+5+2)-3)+(6+8)"
    Output: 23
   ```
1. [逆波兰式解析](https://leetcode.com/problems/evaluate-reverse-polish-notation/description/)
   ```
    Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
    Output: 22
    Explanation: 
        ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
        = ((10 * (6 / (12 * -11))) + 17) + 5
        = ((10 * (6 / -132)) + 17) + 5
        = ((10 * 0) + 17) + 5
        = (0 + 17) + 5
        = 17 + 5
        = 22
   ```
1. [带括号的四则运算](https://www.nowcoder.com/questionTerminal/9999764a61484d819056f807d2a91f1e?source=relative)
   ```
    Input: 3+2*{1+2*[-4/(8-6)+7]}
    Output: 25
   ```

### 解析

#### 不含括号的四则运算

1. 不含括号那么就只有一级运算和二级运算，先计算二级运算放入栈
1. 栈中的数据全是一级运算所以直接累加即可得到结果

```java
        public int calc(String expr){
            Stack<Integer> stack = new Stack<>();
            Integer num = null;
            char op = '+';
            for(int i=0;i<expr.length();i++){
                // 过滤掉空格
            if(expr.charAt(i) == ' '){
                    continue;
            }
            // 解析出数字
            if(Character.isDigit(expr.charAt(i))){
                num = expr.charAt(i) - '0';
                while(i+1<expr.length() && Character.isDigit(expr.charAt(i+1))){
                    num = num * 10 + expr.charAt(i+1) - '0';
                    i+=1;
                }
            }
            if(num != null) {
                switch (op) {
                    case '+':
                        stack.push(num);
                        break;
                    case '-':
                        stack.push(-num);
                        break;
                        // 对于二级运算则先运算再放入栈中
                    case '*':
                        num = stack.pop() * num;
                        stack.push(num);
                        break;
                    case '/':
                        num = stack.pop() / num;
                        stack.push(num);
                        break;

                }
                num = null;
                }
                if(i<expr.length() && !Character.isDigit(expr.charAt(i)) 
                    && expr.charAt(i) != ' '){
                    op = expr.charAt(i);
                }
            }
            int res = 0;
            // 栈中只剩下一级运算的数字，所以直接累加即可
            while(!stack.isEmpty()){
                res += stack.pop();
            }
            return res;
        }
```

#### 带括号的加减运算
1. 只含有加减和括号，当遇到「(」的时候就暂存结果，当遇到「)」的时候就弹出上次计算的结果及运算符号然后进行计算 

```java
    public int calc(String expr){
        Stack<Integer> stack = new Stack<>();
        int res = 0,sign=1,num = 0;
        for(int i=0;i<expr.length();i++){
            // 解析数字
            if(Character.isDigit(expr.charAt(i))) {
                num = expr.charAt(i) - '0';
                while (i + 1 < expr.length() && Character.isDigit(expr.charAt(i + 1))) {
                    num = num * 10 + expr.charAt(i + 1) - '0';
                    i += 1;
                }
                // 中间计算
                res += num * sign;
                // 确定符号
            }else if(expr.charAt(i) == '+'){
                sign = 1;
            }else if(expr.charAt(i) == '-'){
                sign = -1;
                // 暂存结果
            }else if(expr.charAt(i) == '('){
                stack.push(res);
                stack.push(sign);
                sign = 1;
                res = 0;
                // 弹出结果
            }else if(expr.charAt(i) == ')'){
                // res * sign * pre
               res= res * stack.pop() + stack.pop();
            }

        }
        return res;
    }
```

1. 另一种解法，用递归去处理括号，然后括号里面的就是只有普通的加减运算

```java
 public int calc(String expr) {
        if(expr == null || expr.length() == 0){
            return 0;
        }
        Integer num = null;
        int res = 0;
        char op = '+';
        for(int i=0;i<expr.length();i++){
            if(expr.charAt(i) == ' '){
                continue;
            }
            // 解析数字
            if(Character.isDigit(expr.charAt(i))){
                num = expr.charAt(i) - '0';
                while(i+1<expr.length() && Character.isDigit(expr.charAt(i+1))){
                    num = num * 10 + expr.charAt(i+1) - '0';
                    i+=1;
                }
                // 递归处理括号
            }else if(expr.charAt(i) == '('){
                int count = 0,j = i;
                // 找到匹配括号的索引
                for(;i<expr.length();i++){
                    if(expr.charAt(i) == '('){
                        count += 1;
                    }else if(expr.charAt(i) == ')'){
                        count -= 1;
                    }
                    if(count == 0){
                        break;
                    }
                }
                if(j+1<i){
                    // 括号内部字符串
                    num = calculate(expr.substring(j+1,i));
                }
            }
            // 遇到一个数字计算一次
            if(num != null){
                if(op == '-'){
                    num = -num;
                }
                res += num;
                num = null;
            }
            // 赋值操作符
            if(i<expr.length() && !Character.isDigit(expr.charAt(i))){
                op = expr.charAt(i);
            }
        }
        return res;
    }
```

#### 逆波兰表达式
1. 逆波兰表达式和普通的不带括号的四则运算方式有一样且更简单
1. 当遇到「+」、「-」、「*」、「/」的时候就能直接将栈顶的两个数字进行计算即可

```java
    public int calc(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        Integer num = null;
        Character op= null;
        for (String token : tokens) {
            if(Character.isDigit(token.charAt(0))){
               num = Integer.valueOf(token);
            }else if(token.length()>1 && token.charAt(0) == '-'){
               num = Integer.valueOf(token);
            }else{
               op = token.charAt(0);
            }
            if(op != null){
               int p2 = stack.pop();
               int p1 = stack.pop();
               switch (op){
                   case  '+':
                       num = p1 + p2;
                       break;
                   case '-':
                       num = p1 - p2;
                       break;
                   case '*':
                       num = p1 * p2;
                       break;
                   case '/':
                       num = p1 / p2;
                       break;
               }
               stack.push(num);
            }else{
                stack.push(num);
            }
            num = null;
            op = null;
        }
        return stack.pop();
    }
```

#### 带括号的四则运算
1. 该方法和不带括号的四则运算类似，对每个括号都递归处理，那么子问题就和不带括号的四则运算一样了

```java
    int calc(String expr){
        // 去除中括号，大括号
        expr = expr.replace("{","(").
                replace("[","{").
                replace("}",")").
                replace("]",")");
        int res = 0;
        Integer num = null;
        char op = '+';
        Stack<Integer> stack = new Stack<>();
        for(int i=0;i<expr.length();i++) {
            // 找出数字
            if (Character.isDigit(expr.charAt(i))) {
                num = expr.charAt(i) - '0';
                while (i + 1 < expr.length() && Character.isDigit(expr.charAt(i + 1))) {
                    num = num * 10 + expr.charAt(i + 1) - '0';
                    i += 1;
                }
                // 递归处理括号
            } else if (expr.charAt(i) == '(') {
                int j = i, count = 0;
                for (; i < expr.length(); i++) {
                    if (expr.charAt(i) == '(') {
                        count += 1;
                    } else if (expr.charAt(i) == ')') {
                        count -= 1;
                    }
                    // 找到匹配的(...)
                    if (count == 0) {
                        break;
                    }
                }
                // 处理子问题
                if(j+1<i-1) {
                    num = calc(expr.substring(j + 1, i ));
                }
            }
            // 每遇到一个数字进行计算
            if(num != null) {
                fillStack(stack,num,op);
                num = null;
            }
            // 赋值运算符
            if(i<expr.length() && !Character.isDigit(expr.charAt(i))){
                op = expr.charAt(i);
            }
        }
        // 以及运算符累加
        while(!stack.isEmpty()){
            res += stack.pop();
        }
        return res;
    }

    void fillStack(Stack<Integer> stack,int num,char op){
        switch (op){
            case '+':
                break;
            case '-':
                num = -num;
                break;
            case '*':
                num = stack.pop() * num;
                break;
            case '/':
                num = stack.pop() / num;
                break;
        }
        stack.push(num);
    }
```