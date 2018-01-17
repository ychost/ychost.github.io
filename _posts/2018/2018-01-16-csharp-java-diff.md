---
layout: post
title: C# 与 Java 对比
categories: [后端,推荐]
description: C# 与 Java 同属于 OOP 语言，但是两者却有着很大的不同点，本文着重对比 C# 与 Java 的差异
keywords: C#, Java, 对比
tags: [C#,Java]
excerpt:  C# 与 Java 同属于 OOP 语言，但是两者却有着很大的不同点，本文着重对比 C# 与 Java 的差异
---
C# 与 Java 同属于 OOP 语言，但是两者却有着很大的不同点，本文主要从语法层面对比而未对虚拟机等比较深入的层面进行对比。
可能部分地方有错误，请在评论处提出纠正，谢谢。

##### 1.1 Java 不支持 自定义操作符重载  
可能和 Java 起初的设计思想有关（严格的「OOP」思想），为了不产生歧义所以 Java 并没有支持操作符重载。虽然有```String a = "x"; a+="y"```这种看起来像操作符重载的操作其实是 JVM 的语法糖。   
   1. C# 的操作符重载
   ```c#
public static Student operator +(Student stu, string suffix){
        return new Student(stu.Age + 11, stu.Name + suffix);
}   
   ```

##### 1.2 Java 没有 struct  
Java 不支持自定义在 栈 中的类型，而 C# 支持 struct，可以自定义存放在 栈 中的自定义对象
   1. C# 的 struct
   ```c#
public struct Struct {
        public string field; 
}
   ```

##### 1.3 Java 的参数不能传地址引用  
Java 没有类似 C# 的 ```ref```,```in```,```out```等关键字，即使传递对象也是传递对象引用的 Copy
   1. Java 传递对象地址的 Copy
   ```java
/**
 *虽然对 obj 属性的操作会改变传进来的的内容
 *但是如果直接对 obj 赋值，则不会改变传进来的内容
 */
public void changeRef(Object obj){
    obj = anotherObj();
}
   ```
   1. C# 传递对象的真实地址
   ```c#
///<summary>
/// 该操作可以直接改变传进来参数
///</summary>
public void ChangeRef(ref object obj){
    obj = AnotherObj();
}
   ```

##### 1.4 Java 没有 unsigned 整形
虽然 Java 没有原生的 unsigned 整形，但是可以通过一些手段进行转换
   1. Java 获取 ```unsigned``` 数据  
```java
 //将data字节型数据转换为0~255 (0xFF 即BYTE)。
public int getUnsignedByte (byte data){     
         return data&0x0FF ;
      }
 //将data字节型数据转换为0~65535 (0xFFFF 即 WORD)。
public int getUnsignedByte (short data){     
            return data&0x0FFFF ;
      }       
//将int数据转换为0~4294967295 (0xFFFFFFFF即DWORD)。
public long getUnsignedIntt (int data){     
         return data&0x0FFFFFFFF ;
      }
```

##### 1.5 Java 没有静态类
Java 支持 final class，但是不支持 static class 
   1. C# 中的 static class
   ```c#
public static class Utils{
    public static void DoNbAction(){
        //do something
    }
}
   ```

##### 1.6 Java 不能直接操作指针
Java 不支持 C# 中的 unsafe 特性，该特性可以利用指针直接操作
   1. C# 中的 unsafe 特性
   ```c#
unsafe static void ChangeValue(int* pData){
    *pData = 200; 
}
unsafe static void Main(){
    int data = 100;
    Console.WriteLine("原始值: {0}", data);
    ChangeValue(&data);    
    Console.WriteLine("改变地址后: {0}", data);
}
   ```

##### 1.7 Java 不支持扩展方法
「扩展方法」可以很方便的在不修改原类的基础上给类添加实例方法
   1. C# 中的扩展方法
   ```c#
 /// <summary>
/// 让所有的对象都支持获取私有字段方法
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="instance"></param>
/// <param name="fieldname"></param>
/// <param name="type"></param>
/// <returns></returns>
public static T GetPrivateField<T>(this object instance, string fieldname, Type type) {
    BindingFlags flag = BindingFlags.Instance | BindingFlags.NonPublic;
    FieldInfo field = type.GetField(fieldname, flag);
    return (T)field.GetValue(instance);
}
   ```

##### 1.8 Java 不支持委托  
「委托」对于 C 语言来说可能就是「函数指针」一个指向函数入口地址的指针，通过委托很容易就实现了观察者模式，Java 中虽然没有委托但是有匿名类通过 lambda 也同样可以的目的，当然 C# 的「委托」更为简洁
   1. Java 的 Function
   ```java
public class FunctionDemo {
    static void modifyTheValue(int valueToBeOperated, Function<Integer, Integer> function) {
                int newValue = function.apply(valueToBeOperated);
                System.out.println(newValue);
    }
    public static void main(String[] args) {
                int incr = 20;  int myNumber = 10;
                modifyTheValue(myNumber, val-> val + incr);
                myNumber = 15;  modifyTheValue(myNumber, val-> val * 10);
                modifyTheValue(myNumber, val-> val - 100);
                modifyTheValue(myNumber, val-> "somestring".length() + val - 100);
    }
}
   ```
   1. C# 中的委托
   ```c#
delegate void Del(string str);
static void Notify1(string name){
    Console.WriteLine("Notification received for: {0}", name);
}
static void Notify2(string name){
    Console.WriteLine("Bang Bang Bang")
}
public static Main(String[] args) {
    Del += Notify;
    Del += Notify2;
    Del?.Invoke("hello");
    //Output:
    //Notification received for: hello
    //Bang Bang Bang
}
   ```

##### 2.1 C# 没有 Checked Exception   
关于 Java 的 Checked Exception，各种看法都有，有的支持有的不支持这种繁琐的写法，当前我建议一个项目里面最好选一种，要么选 Checked Exception 要么用 Unchecked Exception，这样就不容易引起混乱，虽然 Checked Exception 可以帮助我们关注异常，但是很多时候异常都是在顶层抓取的，这样下层的函数就得加上 throws 显得过于繁重。
   1. Java 的 Checked Exception
   ```java
public fileReader(String fileName) throws FileNotFoundException {
    //do some thing 
}
   ```

##### 2.2 C# 的 interface 不能定义字段
Java 的 interface 是可以定义 ```static final``` 字段的，而 C# 不支持定义
   1. Java 中的 interface 字段
   ```java
/**
 * 虽然支持不显示指明 static final 但是编译器编译之后都是 d 这种声明
 */
public interface SomeInterface{
    public int a = 10;
    public static int b = 20;
    public final int c = 30;
    public static final int d = 40;
}
   ```

##### 2.3 C# 没有内部类
C# 所有的类里面声明的类都是和 Java 中的「嵌套类」(static class) 效果一样，而 Java 支持「内部类」(inner class)
   1. Java 中的内部类
   ```java
public class Outter{
    public class Inner{
    }
}
public static void main(String[] args){
    Outter outter = new Outter();
    Outter.Innter innter = outter.new Inner();
}
   ```

##### 3.1 try/catch/finally 对比  
Java 允许在 finally 里面返回数据，而 C# 是禁止的
   1. 你知道下面的 Java 程序返回的是多少吗？
   ```java
public int getValue(){
    int val = 1;
    try{
        return val++;
    }finally{
        val++;
        return val;
    }
}
   ```

##### 3.2 泛型对比  
Java 的泛型只是编译时支持的而 C# 的泛型在运行的时也支持，Java 有泛型擦除机制所以称之为 「伪泛型」，所以就存在 ```List<? extend SomeClass>``` 这种写法，反正最后都是要擦除的都是 ```List<Object>```，而 C# 不同所有的泛型信息都是通过反射可取到的所以不能够在 ```List<int>``` 里面放入 string 对象，如果要放也是要先将 ```List<int>``` 赋值到 ```List<object>``` 在添加进去
   1. Java 可以直接通过反射在 List<Integer> 中放入 String 对象
   ```java
//声明Integer的泛型ArrayList对象，并放入Integer实例  
List<Integer> intList = new ArrayList<>();  
intList.add(new Integer(5));  
//定义需要被加入list对象的字符串  
String str = "abc";  
//通过反射获取list对象运行时的add方法，此时该方法已经被擦除泛型  
Method m = intList.getClass().getMethod("add", java.lang.Object.class);  
//调用泛型方法加入String对象  
m.invoke(intList, str);  
   ```
   1. C# 不能直接在上面添加，只能另外建立一个 List
   ```c#
List<int> intList = new List<int>();
intList.Add(1);
var objList = intList.OfType<object>().ToList();
objList.Add("hello");  
   ```
   1. C# 可以通过反射获取泛型的信息
   ```c#
public class MyGenericClass<T> {
public static void DisplayNestedType() {
    Console.WriteLine(typeof(T).ToString());
    }   
}
public void DisplayType<T>() {
    Console.WriteLine(typeof(T).ToString());
}
public oid DisplayListGenericType(Type listType){
    var genType = listType.GetGenericArguments()[0];
    Console.WriteLine(genType.Name);
}
   ```

##### 3.4 继承对比
Java 没有 ```virtual``` 关键字且加不加```@Override```都能覆盖父类的方法，而 C# 只能在父类中标注了```virtual```的方法在子类中才能覆盖，不然可以同时存在父类与子类同名、同签名的函数。
   1. C# 支持方法共存
   ```c#
class BaseClass {  
    public void Method1() {  
            Console.WriteLine("Base- Method1");  
    } 
}  
class DerivedClass : BaseClass  {  
    public new void Method2() {  
             Console.WriteLine("Derived - Method2");  
    }  
}  
class Program {  
    static void Main(string[] args) {  
             BaseClass bc = new BaseClass();  
             DerivedClass dc = new DerivedClass();  
             BaseClass bcdc = new DerivedClass();  
             bc.Method1();  
             dc.Method1();  
             dc.Method2();  
             bcdc.Method1();  
    }  
    // Output:  
    // Base - Method1  
    // Base - Method1  
    // Derived - Method2  
    // Base - Method1  
}  
   ```


##### 3.4 语法糖对比
C# 有很多的语法糖，虽然这些语法糖并不能起到额外的作用，但是对于一线的代码工人来说真是省了不少力气了，Java 从 JDK7 开始也逐步加入语法糖功能，比如类型推导、lambda 等等。  
1. __getter/setter 对比__  
   1. Java 中的 ```getter```,```setter```
   ```java
private String name;
public String getName(){
    return name;
}
public void setName(String name){
    this.name = name;
}
   ```
   1. C# 中的 ```getter```,```setter```
   ```c#
public string Name {get;set;}
   ```

1. __C# 支持 partial types__   
Java 只支持一个文件存放一个```public class```而且文件名和类名对应，C# 支持一个文件存放多个```public class```而且也支持多个文件声明同一个```public parital class```
   1. C# 中的 partial
   ```c#
//a.cs
public partial class Utils{
    //do soemthing
}
//b.cs
public partial class Utils{
    //do something
}
   ```

1. __类型推导__  
Java 支持从左往右推泛型，C# 支持从右往左推局部变量
   1. Java 中的类型推导
   ```java
Map<String,Integer> map = new HashMap<>();
   ```
   1. C# 中的类型推导
   ```c#
var dict = new Dictionary<string,int>();
   ```

1. __空指针检查__  
空指针检查一直以来是 Java 比较麻烦的一项处理，只能通过手动去检查，但是 C# 提供了漂亮的语法糖去完成了这一操作
   1. Java 中检查空指针
   ```java
public boolean valid(SomeObj obj){
    if(obj != null && obj.field == "valid"){
        Object f2 = (obj.field != null) ? obj.field : "null value";
        return true;
    }else{
        //do something
    }
    return false;
}
   ```
   1. C# 中的空指针检查
   ```c#
public bool Valid(SomeObj obj){
    if(obj?.field=="valid"){
        var f2=obj.field?? "null value";
        return true;
    }else{
        //do something
    }
    return false;
}
   ```


