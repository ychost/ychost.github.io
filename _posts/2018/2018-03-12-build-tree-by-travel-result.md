---
layout: post
title: 通过前序遍历、中序遍历构建一颗二叉树
categories: [数据结构]
description: 通过前序遍历、中序遍历实现树的序列化和反序列化。
keywords: 二叉树, 前序遍历, 中序遍历, 后序遍历
tags: [Java, 二叉树]
excerpt: 要确定一颗树可以通过前序遍历+中序遍历，也可以通过中序遍历+后续遍历的方式，本文是通过前序遍历+中序遍历的方式来确定并构建一颗二叉树
---
要确定一颗树可以通过前序遍历+中序遍历，也可以通过中序遍历+后续遍历的方式，本文是通过前序遍历+中序遍历的方式来确定并构建一颗二叉树。
关于这部分的算法请参考：[连接][href1]

### 序列化
首先将一颗二叉树序列化成前序遍历+中序遍历的结果，以字符串的形式保存。  
遍历的结果以「,」分开，且前序遍历与中续遍历之间通过「|」分开。  
比如：
> 1,2,3,4,5\|5,4,3,2,1

```java
    /**
     * 序列化，生成前序遍历，中序遍历的字符串
     *
     * @param root 二叉树的根节点
     * @return 序列化的结果
     */
    static String serialize(BinTreeNode root) {
        StringBuilder builder = new StringBuilder();
        setPreOrderInBuilder(root, builder);
        builder.delete(builder.length() - 1, builder.length());
        builder.append("|");
        setInOrderInBuilder(root, builder);
        builder.delete(builder.length() - 1, builder.length());
        return builder.toString();
    }

    /**
     * 获取先序遍历的结果以,隔开
     *
     * @param node
     * @param builder
     */
    static void setPreOrderInBuilder(BinTreeNode node, StringBuilder builder) {
        if (node == null) {
            return;
        }
        builder.append(node.getData().toString() + ",");
        setPreOrderInBuilder(node.getLeft(), builder);
        setPreOrderInBuilder(node.getRight(), builder);
    }


    /**
     * 获取二叉树中序遍历的结果，以,隔开
     *
     * @param node
     * @param builder
     */
    static void setInOrderInBuilder(BinTreeNode node, StringBuilder builder) {
        if (node == null) {
            return;
        }
        setInOrderInBuilder(node.getLeft(), builder);
        builder.append(node.getData().toString() + ",");
        setInOrderInBuilder(node.getRight(), builder);
    }

    /**
     * 反序列化二叉树，根据前序遍历+中序遍历可以唯一确定一棵二叉树
     *
     * @param preOrderStr 前序遍历的结果
     * @param inOrderStr  中序遍历结果
     * @return 生成的二叉树
     */
    static BinTreeNode<String> deserialize(String preOrderStr, String inOrderStr) {
        var preOrderArray = preOrderStr.split(",");
        var inOrderArray = inOrderStr.split(",");
        var root = new BinTreeNode<String>();
        buildTree(root, preOrderArray, inOrderArray);
        return root;
    }
```
### 反序列化
通过刚刚序列化的结果，反序列化构建并生成一棵二叉树。

```java
    /**
     * 反序列化二叉树，根据前序遍历+中序遍历可以唯一确定一棵二叉树
     *
     * @param preOrderStr 前序遍历的结果
     * @param inOrderStr  中序遍历结果
     * @return 生成的二叉树
     */
    static BinTreeNode<String> deserialize(String preOrderStr, String inOrderStr) {
        var preOrderArray = preOrderStr.split(",");
        var inOrderArray = inOrderStr.split(",");
        var root = new BinTreeNode<String>();
        buildTree(root, preOrderArray, inOrderArray);
        return root;
    }

    /**
     * 通过前序+中序遍历的结果构建一颗二叉树
     *
     * @param node          最终构建二叉树的根节点
     * @param preOrderArray 前序遍历结果
     * @param inOrderArray  中序遍历结果
     */
    static void buildTree(BinTreeNode node, String[] preOrderArray, String[] inOrderArray) {
        //根节点必是前序遍历的第一个点
        var data = preOrderArray[0];
        //找到根节点在中序遍历中的位置
        var index = -1;
        while (!inOrderArray[++index].equals(data)) ;
        //中序遍历左边的点为根节点的左子树，右边的点为右子树
        String[] leftInChild = subArray(inOrderArray, 0, index);
        String[] rightInChild = subArray(inOrderArray, index + 1);
        //取出左右子树在前序遍历中的数据
        String[] leftPreChild = subArray(preOrderArray, 1, leftInChild.length);
        String[] rightPreChild = subArray(preOrderArray, 1 + leftInChild.length);
        //构建当前节点
        node.setData(data);
        //构建左子树
        if (leftInChild.length > 0) {
            node.setLeft(new BinTreeNode());
            buildTree(node.getLeft(), leftPreChild, leftInChild);
        }
        //构建右子树
        if (rightInChild.length > 0) {
            node.setRight(new BinTreeNode());
            buildTree(node.getRight(), rightPreChild, rightInChild);
        }
    }

    /**
     * 取出数组的一部分，类似于 SubString
     *
     * @param strArray 待分割数组
     * @param start    取出的起始索引
     * @param count    取出元素的个数
     * @return [start, start+count) 之间的数据
     */
    static String[] subArray(String[] strArray, int start, int count) {
        var subArray = new String[count];
        int index = 0;
        while (index < count) {
            subArray[index] = strArray[start];
            start += 1;
            index += 1;
        }
        return subArray;
    }

    /**
     * 取出数组 [start,end) 之间的所有数据
     *
     * @param strArray 带分割的数组
     * @param start    取出的起始索引
     * @return [start, end) 之间所有数据构成的数组
     */
    static String[] subArray(String[] strArray, int start) {
        var count = strArray.length - start;
        return subArray(strArray, start, count);
    }
```

[href1]: /2018/03/01/interview-qa/#algorithm