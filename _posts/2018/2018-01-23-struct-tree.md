---
layout: post
title: 数据结构（一） 树
categories: [数据结构]
description: 树是一种用的比较多的一种数据结构，本文主要介绍了用 Java 实现二叉树的一些性质
keywords: 二叉树,Java,满树,平衡树,完全树
tags: [Java,Tree]
excerpt: "主要以 Java 的方式去探索二叉树（平衡树、满树、完全树）"
---
本文使用了 lombok 插件，使用了 ```@Data```,```@Accessors(chain=true)```,```var```等，这些注解可以直接生成```getter```,```setter```和链式调用等方法，详情见 [Project Lombok][href1]，关于二叉树的一些性质和定义请参考[http://www.cnblogs.com/skywang12345/p/3576328.html][href2]。


#### 数据结构
```java
@Data
@Accessors(chain = true)
public class BitTreeUtils<T> {
    private T data;
    private BitTree<T> left;
    private BitTree<T> right;
    private Boolean isVisited = false;
    private Integer level = 0;
}
```

#### 创建一颗二叉树
##### 完全二叉树
__定义：__
若设二叉树的深度为h，除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数，第 h 层所有的结点都连续集中在最左边，这就是完全二叉树。

```java
public class BitTree {
    public static <R> BitTree createCompleteTree(List<R> dataList){
        //用队列来存父节点
        Queue<BitTree<R>> queue = new LinkedList<>();
        int count =0;
        var root = new BitTree<R>().setData(dataList.get(count++)).setLevel(0);
        queue.add(root);
        while(count < dataList.size()){
            var node = queue.poll();
            //让每个 node 尽量都有 left 和 right 节点
            if(count < dataList.size()){
                var leftNode = new BitTree<R>().setData(dataList.get(count++)).setLevel(node.getLevel()+1);
                node.setLeft(leftNode);
                queue.add(leftNode);
            }
            if(count < dataList.size()){
                var rightNode = new BitTree<R>().setData(dataList.get(count++)).setLevel(node.getLevel()+1);
                node.setRight(rightNode);
                queue.add(rightNode);
            }
        }
        return root;
    }
}
```

##### 满二叉树
__定义：__
如果一棵二叉树的结点要么是叶子结点，要么它有两个孩子结点，这样的树就是满二叉树  
__性质：__
一个二叉树，如果每一个层的结点数都达到最大值，则这个二叉树就是满二叉树。也就是说，如果一个二叉树的层数为 \\(K\\)，且结点总数是\\(2^k -1\\) 则它就是满二叉树。 也就是说，满二叉树不存在度为1的结点。

```java
public class BitTreeUtils {
    /**
     * @param depth 树深度，从 1 开始
     */
    public static BitTree<Integer> createFullTree(int depth) {
        if(depth < 1){
            return null;
        }
        var total = Math.pow(2,depth) - 1;
        var count = 1;
        var root = new BitTree<Integer>().setData(count++);
        var queue = new LinkedList<BitTree<Integer>>();
        queue.add(root);
        while(count <= total) {
            var node = queue.poll();
            if(count <= total){
                var leftNode = new BitTree<Integer>().setData(count++).setLevel(node.getLevel()+1);
                node.setLeft(leftNode);
                queue.add(leftNode);
            }
            if(count <= total){
                var rightNode = new BitTree<Integer>().setData(count++).setLevel(node.getLevel()+1);
                node.setRight(rightNode);
                queue.add(rightNode);
            }
        }
        return root;
    }
}
```
##### 平衡二叉树
__定义：__
平衡二叉树比较复杂请参考 [http://blog.csdn.net/javazejian/article/details/53892797][href3]

#### 二叉树的遍历
##### 前序遍历
__顺序：__
根左右

```java
public class BitTreeUtils {
    public static void preOrderTraverse(BitTree root) {
        if(root == null){
            return;
        }
        //先遍历中节点
        root.setIsVisited(true);
        //再遍历左节点
        preOrderTraverse(root.getLeft());
        //最后遍历右节点
        preOrderTraverse(root.getRight());
    }
}
```

##### 中序遍历
__顺序：__
左根右

```java
public class BitTreeUtils{
    public static void inOrderTraverse(BitTree root){
        if(root == null){
            return;
        }
        //先遍历左节点
        inOrderTraverse(root.getLeft());
        //再遍历中节点
        root.setIsVisited(true);
        //最后遍历右节点
        inOrderTraverse(root.getRight());
    }
}
```

##### 后序遍历
__顺序：__
左右根

```java
public class BitreeUtils {
    public static void postOrderTraverse(BitTree root) {
        if(root == null){
            return;
        }
        //先遍历左节点
        postOrderTraverse(root.getLeft());
        //再遍历右节点
        postOrderTraverse(root.getRight());
        //最后遍历中节点
        root.setVisited(true);
    }
}
```

##### 分层遍历
从根节点开始，由上而下，从左至右，一层一层遍历

```java
public class BitTreeUtils{
    public static void levelTraverse(BitTree root){
        if(root == null){
            return;
        }
        var queue = new LinkedList<BitTree>();
        root.setVisited(true);
        queue.add(root);
        while(!queue.isEmpty()){
            var node = queue.poll();
            var leftNode = node.getLeft();
            var rightNode = node.getRight();
            if(leftNode != null){
                leftNode.setVisited(true);
                queue.add(leftNode);
            }
            if(rightNode != null){
                rightNode.setVisited(true);
                queue.add(rightNode)
            }
        }
    }

    /*
     * 按层遍历且输出层号
     */
    public static void travelWithLevelNum(BitTree root){
        if(root == null){
            return;
        }
        var queue = new LinkedList<BitTree>();
        queue.add(root);
        int levelNum = 0;
        while(!queue.isEmpty()){
            var count = queue.size();
            levelNum += 1;
            for(int i=0;i<count;i++){
                var node = queue.poll();
                node.setVisited(true);
                System.out.println("level num: "+ levelNum);
                if(node.getLeft() != null){
                    queue.add(node.getLeft());
                }
                if(node.getRight() != null){
                    queue.add(node.geteRight());
                }
            }
        }
    }
}

```

#### 二叉树性质
##### 获取树的深度
__定义__ 
树根下中所有分支结点层数的最大值，递归定义。（一般以根节点深度层数为0）

```java
public class BitTreeUtils{
   public static int getDepth(BitTree root){
       if(root == null){
           return 0;
       }
       //比较左子树和右子树的深度，取其最大值
       return Math.max(getDepth(root.getLeft()),getDepth(root.getRight())) + 1;
   } 
}
```

##### 判断平衡树
__定义：__
它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。

```java
public class BitTreeUtils{
    public static boolean checkBalance(BitTree root){
        if(BitTreeUtils.getDepth(root) == 0){
            return true;
        }
        var minus = getDepth(root.getLeft()) - getDepth(root.getRight());
        return minus >= -1 && minus <=1;
    }
}
```

[href1]: https://projectlombok.org/features/all
[href2]: http://www.cnblogs.com/skywang12345/p/3576328.html
[href3]: http://blog.csdn.net/javazejian/article/details/53892797