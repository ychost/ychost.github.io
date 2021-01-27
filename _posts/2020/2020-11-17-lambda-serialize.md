---
layout: post
title: Java Lambda 序列化
categories: [后端]
description: 序列化是一种常见的数据传输机制，但是 Lambda 序列化可以将 Java 的一个方法进行传输，从而实现动态脚本等功能
keywords: Java, 序列化, Lambda, Serialize
tags: [Java, 序列化, Lambda]
excerpt: 序列化是一种常见的数据传输机制，但是 Lambda 序列化可以将 Java 的一个方法进行传输，从而实现动态脚本等功能
readMins: 30
---

Lambda 是 Java8 引进的一项新的能力，日常主要是结合 stream 一起使用，Lambda 也是可以像普通的对象一样进行序列化/反序列化的，就可以像普通对象一样先序列化成字节码然后进行存储或者传输，待需要的时候再将字节码进行反序列化，这样就实现了将一个方法进行了本地存储和传输，通过该方式可以进一步实现类似 Groovy 动态脚本一样的功能

## 序列化
Lambda 的序列化和普通对象的序列化一样，主要使用```ObjectOutputStream/ObjectInputStream``` 
> 该方法就是普通的序列化方法，主要调用了 ```ObjectOutputStream``` 进行序列化输出

```java
/**
 * 序列化普通的 serializable
 *
 * @param serializable lambda 接口
 * @return 序列化数组
 * @throws IOException
*/
@SneakThrows
public static <T extends Serializable> byte[] serialize(@Nonnull T serializable){
    ByteArrayOutputStream outStream = new ByteArrayOutputStream();
    ObjectOutputStream oos = new ObjectOutputStream(outStream);
    oos.writeObject(serializable);
    return outStream.toByteArray();
}
```

## 反序列化
> 反序列化主要调用了 ```ObjectInputStream``` 进行反序列化解析

```java
/**
 * 反序列化普通的 serializable
 *
 * @param inBytes 序列化的数组
 * @return serializable 接口 lambda
 * @throws IOException
 * @throws ClassNotFoundException
 */
@SuppressWarnings("ALL")
@SneakThrows
public static <T> T deserialize(@Nonnull byte[] inBytes){
    ByteArrayInputStream inStream = new ByteArrayInputStream(inBytes);
    ObjectInputStream ois = new ObjectInputStream(inStream);
    T obj = (T)ois.readObject();
    return obj;
}
```

## 使用样例
```java
@Test
@SneakThrows
public void serializeLambdaTest(){
    // 这里调用了序列化
    byte[] bytes = LambdaUtil.serialize(
        (Function<String, String> & Serializable)name -> "hello: " + name
    );
    // 这里调用了反序列化
    Function<String, String> func = LambdaUtil.deserialize(bytes);
    Assert.assertEquals("hello: apple", func.apply("apple"));
}
```
> 可见，这里将自定义的 Function 先是序列化成了字节码，然后再将字节码进行了反序列化，同时进行了 ```apply``` 调用
> ```(Function<String, String> & Serializable)``` 这是 Java8 引入的新[语法][href1]


## SerializedLambda
Lambda 的展示形式主要有两种，第一种为 Lambda 表达式，第二种为方法引用，如下
```java
@Test
public void compareTest(){
    List<Integer> numbers = Lists.newArrayList(1,3,2,1,4);
    // Lambda 表达式
    numbers.sort((a,b)->a.compareTo(b))
    // 方法引用
    numbers.sort(Integer::compareTo)
  
}
```
那么这两种 Lambda 有什么区别呢，如果不涉及到捕获 Lambda 所处的 ```Method/Class``` 等信息没有太大区别，但是当需要通过 ```SerializedLambda``` 去捕获相关信息就会有较大的区别了，`SerializedLambda` 是 Java8 提供的一个新的类，凡是继承了```Serializable```的函数式接口的实例都可以获取一个属于它的```SerializedLambda```实例，提供如下的功能：

1. 引用方法的 Method 信息（方法名，签名）
1. Lambda 的 FunctionInterface 信息（方法名，签名）
1. 引用方法的所在的 Class 
1. Lambda 里面捕获的变量信息

如何得到 ```SerializedLambda``` 呢？主要调用了 ```writeReplace``` 方法实现，如下
```java
/**
 * 获取序列化的 lambda 信息
 * <example>
 * SerializedLambda[
 *   capturingClass=class com.dingtalk.zeus.validator.constraint.SimpleValidAdapterTest,
 *   functionalInterfaceMethod=com/dingtalk/zeus/interfaces/LambdaSerialize.get:(Ljava/lang/Object;)
 *   Ljava/lang/Object;,
 *   implementation=invokeStatic com/dingtalk/zeus/validator/constraint/AtMethods.appCode:(Ljava/lang/String;)
 *   Ljava/lang/Void;,
 *   instantiatedMethodType=(Ljava/lang/String;)Ljava/lang/Void;,
 *   numCaptured=0
 * ]
 * </example>
 *
 * @return 序列化的 lambda 对象
 * @throws Exception invoke 异常
*/
public static SerializedLambda getSerializedLambda(
    @NonNull Class<? extends Serializable> funInterfaceCls,
    @NonNull Serializable serializable
) throws Exception {
    Method write = funInterfaceCls.getDeclaredMethod("writeReplace");
    write.setAccessible(true);
    return (SerializedLambda)write.invoke(serializable);
}
```
这里获取的 ```SerializedLambda``` 对象的所有属性都是 ```String``` 类型的，需要再通过反射获取的真实的 ```Method``` 和 ```Class``` 信息。
获取了 ```SerializedLambda``` 并得到了 ```Method``` 和 ```Class``` 之后有什么用途呢？其主要用途如下：
1. 获取 ```getter/setter``` 对应的属性名字
> 比如，在 ```tk.mybatis``` 里面可以直接通过 ```obj::getColumn``` 直接就能映射到数据库的 ```column``` 字段
1. 快速获取 ```Method``` 信息
```java
    // 传统获取 method
    MethodUtils.getMatchingMethod(BaseMockTest.class,"init",String.class)
    // 基于 SerializedLambda 获取，LambdaUtil 是自己封装的，解析 SerializedLambda 的 Method 信息
    LambdaUtil.getMethod(BaseMockTest::init)
    // 传统方式依赖方法名和签名，如果方法重构了会有影响，
    // 第二种方式使用起来更简单，同时方法重构会自动跟着重构
```

## 总结
Java Lambda 的序列化/反序列化和普通对象的使用方法一致，Java8 引入了 ```SerializedLambda``` 对象，该对象主要是应用在方法引用的 Lambda 上面，通过它可以快速获取引用方法的信息，主要包括引用方法的 ```Method```，```Class```，```CaptureVars``` 等信息，通过序列化/反序列化可以很方便地将一个 Java Lambda 进行传输，可以使用类似动态脚本的能力。

[href1]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.16