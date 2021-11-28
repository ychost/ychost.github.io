---
layout: post
title: 程序员面试宝典 第5版 栈和队列
categories: [刷题]
description:  程序员面试宝典 第5版本 栈和队列习题解答，主要是 Java 部分的解答
keywords: 面试,刷题,Java
tags: [刷题,Java,Stack,Queue]
excerpt: "程序员面试宝典 第5版本 栈和队列习题解答，主要是 Java 部分的解答"
---

##### 第 1 题 √  
用一个数组实现三个栈  
> 用 ```ArrayStackNode.identity``` 来约束属于几号队列，这样可以用一个数组实现 N 个队列了，而且支持扩容操作

```java
/**
 * 第 3.1 题
 */
class ArrayStack {
    ArrayStackNode[] nodes;
    int count;
    int capacity;

    public ArrayStack(int capacity) {
        nodes = new ArrayStackNode[capacity];
        this.capacity = capacity;
    }

    public void push(Object data, int identity) {
        //容量满了则进行二倍扩容
        if (count == capacity) {
            capacity *= 2;
            ArrayStackNode[] copyNodes = new ArrayStackNode[capacity];
            for (int i = 0; i < nodes.length; i++) {
                copyNodes[i] = nodes[i];
            }
            nodes = copyNodes;
        }
        nodes[count++] = new ArrayStackNode(data, identity);
    }

    public Object pop(int identity) {
        int last = count - 1;
        int i = last;
        while (i >= 0 && nodes[i].identity != identity) {
            --i;
        }
        if (i < 0) {
            return null;
        }
        Object data = nodes[i].data;
        //弹出数据后进行移位操作
        for (int k = i; k < last; k++) {
            nodes[k] = nodes[k + 1];
        }
        count -= 1;
        return data;
    }

    public Object peek(innt identity) {
        int last = count - 1;
        while (i >= 0 && nodes[i].identity != identity) {
            --i;
        }
        if (i < 0) {
            return null;
        }
        return nodes[i].data;
    }

    public void printPop(int identity) {
        Object data = pop(identity);
        while (data != null) {
            System.out.print(data.toString() + "->");
            data = pop(identity);
        }
        System.out.println();
    }
}

class ArrayStackNode {
    Object data;
    //标识属于几号栈
    int identity;

    public ArrayStackNode(Object data, int identity) {
        this.data = data;
        this.identity = identity;
    }
}
```

##### 第 2 题 √
实现一个栈，它的 ```pop```,```min```,```push```,```peek```方法 都必须在 \\(O(1)\\) 的时间内  
> 可以让每个节点保存该节点到最底层节点的最小值  
> 还可以采用另一种方式，用一个单独的栈来存```min```的值，这样可以减小空间的使用

```java
/**
 * 第 3.2 题，实现一个栈，它的 pop,min,push 都必须在 O(1) 的时间内
 */
class O1Stack {
    Comparable data;
    public O1Stack nextNode;
    //临时保存最小值
    //每放入一个节点该值可能会变
    public O1Stack minNode;
    public O1Stack topNode;

    public O1Stack() {
    }

    public O1Stack(Comparable data) {
        this.data = data;
    }

    public void push(Comparable data) {
        O1Stack node = new O1Stack(data);
        //放入第一个个节点
        if (topNode == null) {
            topNode = node;
            minNode = node;
            node.minNode = minNode;
            return;
        }
        node.nextNode = topNode;
        //保存node->bottom的最小值到node.min
        if (node.data.compareTo(minNode.data) < 0) {
            minNode = node;
        }
        node.minNode = minNode;
        topNode = node;
    }

    public Object pop() {
        O1Stack node = topNode;
        topNode = topNode.nextNode;
        return node.data;
    }

    public Object min() {
        return topNode.minNode.data;
    }

    public Object peek() {
        return topNode.data;
    }

}
```

##### 第 3 题 √
实现一个 ```SetOfStacks``` 的数据结构，该结构由多个栈组成，调用 ```pop```,```push```,```peek```与普通栈无差异，且支持```popAt(int index)```弹出指定序号栈的元素 
> 用一个数组来模拟栈，然后用链表来完成多个栈之间的关系  
> 当然，可以采取另一种方案，用数组来维护栈之间的关系


```java
/**
 * 第 3.3 题，一个栈的容量有限，当容量超出的时候用另一个栈来装，但是 pop,push,peek 等方法调用不变
 * 用数组来模拟一个栈，然后各个栈通过链表连接
 */
class SetOfStacks {
    Object[] stackData;
    //指向栈中最后一位元素的下一位
    int dataEnd;
    SetOfStacks nextStack;

    public SetOfStacks() {

    }

    public SetOfStacks(int capacity) {
        stackData = new Object[capacity];
    }

    public void push(Object data) {
        SetOfStacks tailStack = getTailStack();
        //首次插入
        if (tailStack == null) {
            tailStack = new SetOfStacks(stackData.length);
            this.nextStack = tailStack;
        }
        //tailStack 满载了
        if (tailStack.dataEnd >= stackData.length) {
            SetOfStacks stack = new SetOfStacks(stackData.length);
            tailStack.nextStack = stack;
            tailStack = stack;
        }
        tailStack.stackData[tailStack.dataEnd++] = data;
    }

    public Object pop() {
        SetOfStacks tailStack = getTailStack();
        return tailStack.stackData[--tailStack.dataEnd];
    }

    /**
     * 弹出指定序号栈中的元素，注意：栈的序号会随着 pop 动态变化，当然可以考虑给每个节点添加一个固定的 index
     * @index 从 0 开始
     */
    public Object popAt(int index) {
        int i = 0;
        SetOfStacks pointer = nextStack;
        while (pointer != null && i != index) {
            pointer = pointer.nextStack;
            i++;
        }
        Object retData = null;
        if (i == index && pointer != null) {
            retData = pointer.stackData[--pointer.dataEnd];
            //移除该栈
            if (pointer.dataEnd <= 0) {
                SetOfStacks r = this;
                while (r.nextStack != pointer) {
                    r = r.nextStack;
                }
                if (r.nextStack != null) {
                    if (pointer.nextStack != null) {
                        r.nextStack = pointer.nextStack;
                    } else {
                        r.nextStack = null;
                    }
                } else {
                    nextStack = null;
                }
            }
        }
        return retData;
    }

    public Object peek() {
        SetOfStacks tailStack = getTailStack();
        return tailStack.stackData[tailStack.dataEnd - 1];
    }

    public SetOfStacks getTailStack() {
        SetOfStacks pointer = nextStack;
        while (pointer != null && pointer.nextStack != null) {
            //栈空了，舍弃
            if (pointer.nextStack.dataEnd <= 0) {
                break;
            }
            pointer = pointer.nextStack;
        }
        //移除多余的连接
        if (pointer != null) {
            pointer.nextStack = null;
        }
        return pointer;
    }

}
```

##### 第 4 题 √
汉诺塔问题：有 A、B、C 三根柱子，其中 A 柱子上面有从小叠到大的 n 个圆盘，现要求将 A 柱子上的圆盘移到 C 柱子上去，期间只有一个原则：一次只能移到一个盘子且大盘子不能在小盘子上面，求移动的步骤和移动的次数  
> 该题网上讲解很多，这里就直接贴出代码了

```java
/**
 * 第 3.4 题 经典的汉诺塔问题
 */
class HannuoStack {
    public Stack<String> APillar;
    public Stack<String> BPillar;
    public Stack<String> CPillar;
    int size;

    public HannuoStack(int size) {
        this.size = size;
        APillar = new Stack<>();
        BPillar = new Stack<>();
        CPillar = new Stack<>();

        for (int i = size; i >= 1; i--) {
            APillar.push(String.valueOf(i));
        }
    }

    public void move(Stack<String> fromStack, Stack<String> toStack) {
        String from = "A";
        String to = "A";
        if (fromStack == BPillar) {
            from = "B";
        } else if (fromStack == CPillar) {
            from = "C";
        }
        if (toStack == BPillar) {
            to = "B";
        } else if (toStack == CPillar) {
            to = "C";
        }
        String disk = fromStack.pop();
        toStack.push(disk);
        System.out.println("将 " + disk + " 盘从" + from + " 移动到 " + to);
    }

    public void solve() {
        resolve(size, APillar, BPillar, CPillar);
    }

    public void resolve(int n, Stack<String> aPillar, Stack<String> bPillar, Stack<String> cPillar) {
        //在只有一个盘子的情况下直接从 A → C
        if (n == 1) {
            move(aPillar, cPillar);
        } else {
            //递归，把A塔上编号1~n-1的圆盘移到B上，以C为辅助塔
            resolve(n - 1, aPillar, cPillar, bPillar);
            //把A塔上编号为n的圆盘移到C上
            move(aPillar, cPillar);
            //递归，把B塔上编号1~n-1的圆盘移到C上，以A为辅助塔
            resolve(n - 1, bPillar, aPillar, cPillar);
        }
    }

    public void printCPillar() {
        while (!CPillar.isEmpty()) {
            System.out.println(CPillar.pop());
            System.out.println("↓");
        }

    }

}
```

##### 第 5 题 √
用两个栈实现一个队列  
> 一个栈用来存数据，另一个栈用来临时倾倒数据  
> 注： ```stackA.push(stackB.pop()).pop() == queueB.dequeue()```   

```java
/**
 * 第 3.5 题，用两个栈实现一个队列
 * 一个栈用来装数据，另一个栈用来临时倒数据
 */
class MyQueue {
    Stack<Object> stackA;
    Stack<Object> stackB;

    public MyQueue() {
        stackA = new Stack<>();
        stackB = new Stack<>();
    }

    public void enqueue(Object data) {
        stackA.push(data);
    }

    public boolean isEmpty() {
        return stackA.isEmpty();
    }

    public Object dequeue() {
        //stackB 的出栈顺序就是stackA 的出队顺序
        while (!stackA.isEmpty()) {
            stackB.push(stackA.pop());
        }
        //stackA 的第一个元素出栈
        Object data = stackB.pop();
        //再将出队之后的元素放回 stackA
        while (!stackB.isEmpty()) {
            stackA.push(stackB.pop());
        }
        return data;
    }
}
```

##### 第 6 题
实现对栈按升序排列（最大的元素在栈顶），至多只能使用一个额外的栈来保存数据，不能使用数组等其他数据结构  
> 1. stack 是待排序的队列，stackSorted 是已排序的队列  
> 1. 从 stack 中取出一个元素 tmp，在 stackSorted 中找到 tmp 的位置，即 stack.peek() <= tmp 的位置
> 1. 取位置的时候又会将 tmp 之上的元素全部倾倒到 stack 中
> 1. 迭代 stack 则会将倾倒出来的元素又放回了 stackSorted 中的 tmp 之上
> 1. 上诉就完成了 tmp 插入到 stackSorted 中的合适位置

```java
/**
  * 第 3.6 题，对一个栈按升序排列（最大元素在栈顶），至多只能使用一个栈来保存临时数据
  */
public static Stack<Comparable> sortStack(Stack<Comparable> stack) {
    Stack<Comparable> stackSorted = new Stack<>();
    while (!stack.isEmpty()) {
        Comparable tmp = stack.pop();
        while (!stackSorted.isEmpty() && stackSorted.peek().compareTo(tmp) > 0) {
            stack.push(stackSorted.pop());
        }
        stackSorted.push(tmp);
    }
    return stackSorted;
}
```

