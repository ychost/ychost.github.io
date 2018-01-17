---
layout: post
title: 深入 Java 核心
categories: [后端]
description: Java 的类加载器、扩展加载器、引导类加载器的加载顺序，一个 Main 函数究竟经历了哪些加载过程，内存中的堆、栈、方法区有何异同，如何利用反射来实现这些操作？
keywords: Java 虚拟机, Jvm, 反射
tags: [Java, Jvm]
repost: ["Dr.Lester", "http://www.godql.com/blog/2017/07/07/Core-Java/"]
excerpt: Java 的类加载器、扩展加载器、引导类加载器的加载顺序，一个 Main 函数究竟经历了哪些加载过程，内存中的堆、栈、方法区有何异同，如何利用反射来实现这些操作？
---

### 类加载
类加载负责加载编译后的class文件（字节码文件）到JVM当中。

* 在JRE中，类加载器主要分为以下几种：
    * 引导类加载器（Bootstrap）  
        它本身使用C/C++语言实现的，负责加载Java的核心类库，在jre\lib目录中，当中包括如rt.jar，这些都是Java自带的核心类库，必须由它来完成加载。
    * 拓展/扩展类加载器（Extension）  
        这个加载器就是由Java语言实现，负责加载jre\lib\ext目录下的类库，这个目录下的类库都是一些扩展类。
    * 应用程序/系统类加载器（Application）  
        这个类加载器同样使用Java语言实现，它主要负责加载classpath下面的所有类库，通常我们编写的Java类都是由这个类加载器完成加载。

> 三个类加载器的初始化过程：当程序运行时，首先会初始化引导类加载器，它就负责创建和初始化扩展类加载器，当扩展类加载器完成初始化之后，又负责创建和初始化系统类加载器。  
> 这些类加载器协同起来完成整个类加载的过程，因此这些类加载器的加载模式是基于“双亲委托模型”。

[![classloader][img1]][img1]{:data-lightbox="deepin-java"}

#### 举例说明
当我们编写一个Java类时，首先负责加载这个类的加载器是系统类加载器，但是它不会立马就去执行加载，而是先把这个任务交给父加载器（扩展类加载器），而扩展类加载器同样也会将这个任务交给父加载器（引导类加载器），最终当引导类加载器不能去加载这个类的时候（也就是在自己加载职责范围找不到的时候），又会将这个任务交回给子加载器。以此类推，最终我们编写的类都会配置在classpath环境中，所以，这个类的加载任务还是回到系统类加载器来完成。

```java
public class Test {
	String name;
	public void say(){
		System.out.println("Hello Word");
	}
	
	// 程序的入口的方法，和具体类无关
	public static void main(String[] args) {
		Test t = new Test();	
		t.say();
		// 得到当前的类加载器ApplicationClassLoader
		ClassLoader cl = Test.class.getClassLoader();
		System.out.println(cl);
		// 得到ApplicationClassLoader的父类加载器ExtensionClassLoader
		ClassLoader extCl = cl.getParent();
		System.out.println(extCl);
		// 得到ExtensionClassLoader的父类加载器BootstrapClassLoader
		// 由于BootstrapClassLoader是用C/C++语言编写的，在java中无法直接使用
		// 所以才会返回一个null
		ClassLoader bootCl = extCl.getParent();
		System.out.println(bootCl);
	}
}
```

当一个class文件最终加载到jvm之后，就表示类加载这个阶段已经全部完成。接下来就是对整个class文件的内容进行解析和做内存的分配。

### 内存分配
当JVM运行起来的时候就会给内存划分空间，那么这块空间称之为运行时数据区。
(备注：当一个Java源程序编译成class字节码文件之后，字节码文件里存放的都是二进制的汇编命令，当程序运行的时候，JVM会将这个二进制的命令逐行解释，交给CPU去执行)

运行时数据区将划分为以下几块内容：

* __栈__   
     每一个线程运行起来的时候就会对应一个栈（线程栈），栈当中存放的数据是被当前线程所独有的。而栈当中存放的是栈帧，当线程调用一个方法的时候，就会形成一个栈帧，并将这个栈帧进行压栈操作，当方法执行完之后就会将这个栈帧进行出栈操作。这个栈帧里面包括（局部变量、操作数栈、指向当前方法对应类的常量池引用、方法的返回地址等信息）。  
> 备注：由于局部变量都是存放在栈中，而每一个线程都对应自己的线程栈，因此局部变量是线程安全的，不会才产生资源共享的情况。

   [![stack-method][img2]][img2]{:data-lightbox="deepin-java"}
* __本地方法栈__   
     本地方法栈的机制和栈的机制类似，区别在于，栈是运行Java所实现的方法，而本地方法栈是运行的本地方法(Native Method)。所谓的本地方法指的是在本地jvm中需要调用非Java语言所实现的方法，例如c语言。在JVM的规范中，其实没有强制性要求实现方一定要划分出本地方法栈的和具体的实现，这一部分可以根据实现方具体要求来实现。因此在HotSport虚拟机的实现中就将方法栈和本地方法栈二合为一

   [![stack-method][img3]][img3]{:data-lightbox="deepin-java"}
    
* __程序计数器__    
     程序计数器也可以称之为PC寄存器。它主要用于存放当前程序下一条将要执行的指令地址。CPU会根据这个地址找到对应的指令来执行。通俗的讲就是指令缓存。这个寄存器是有JVM内部实现的，并不是物理概念上的寄存器，但是JVM在实现功能的逻辑上是相同的。
* __堆__   
     堆内存中主要存放创建的对象以及数组。 堆内存是可以被多个线程所共享的一块区域,因此多个线程栈都可以去访问同一块堆的内存区域。堆里面的每一对象都存放了该实例的实例变量。
当在方法中定义了一个局部变量，如果这个变量是基本数据类型，那么这个变量的值就直接存放在栈中，如果这个变量是引用数据类型，那么这个对象变量就存放在堆内存中，而栈中存放的是一个指向堆内存中这个对象的首地址。
> (备注：Java中除了8个基本数据类型以外的所有类型都是引用数据类型)
* __引用__   
    [![string-heap][img4]][img4]{:data-lightbox="deepin-java"}
* __更改__   
    [![string-heap-change][img5]][img5]{:data-lightbox="deepin-java"}
* __数组__    
    [![array-heap][img6]][img6]{:data-lightbox="deepin-java"}
* __循环__   
    [![for-heap][img7]][img7]{:data-lightbox="deepin-java"}

* __实例变量和静态变量的区别：__  
    * 实例变量：实例变量是随着对象的创建而创建，而实例是存放在堆中，所以实例变量自然也就跟实例一并保存在堆内存。只要创建多少个实例，就会有多少份实例变量。当实例被回收的时候，实例变量也随之而销毁。
    * 静态变量：静态变量也叫类变量，它是在类加载的时候就已经初始化好，并存放在方法区，并且只有一份，所以它是被多个实例所共享的一个变量。
* __方法区__    
方法区在JVM中也是一个非常重要的一块内存区域，它和堆一样，是可以被多个线程所共享的一块区域。这个区域中主要存放了每一个加载的class文件信息。    
在一个class文件中主要包含魔数(代码中出现但没有解释的数字常量或字符串)（用来确定是否是一个class文件）、常量池（常量池在下面会有完整说明）、访问标志（当前的class是类还是接口，是否是抽象类，
是否是public修饰，是否使用了final修饰等描述信息…）、字段表集合信息（使用什么访问修饰符、是实例变量还是静态变量，是否用final修饰等描述信息…）、
方法表集合信息（访问修饰符，是否静态方法，是否用final修饰，是否用了synchronized修饰，是否是native方法…）等内容。   
当一个类加载器加载一个class文件的时候，会根据这个class文件的内容创建一个Class对象，而这个Class对象就包括了上述的这些内容。后续要创建这个类的所有实例，都是通过这个Class对象创建出来的。  
    [![method-area][img8]][img8]{:data-lightbox="deepin-java"}

* __常量池__    
常量池也是方法区中的一部分，它存放的内容是class文件中最重要的资源，JVM为每一个class对象都维护一个常量池。它主要存储两种类型的常量。
   1. 字面常量
        > 字面常量通常就是在Java中定义的字面量值，如：int i =1,这个1就是字面量；String s = (“abc”)，这个abc就是字面量。或者使用final修饰的常量值等等。
   1. 符号引用
        > 符号引用主要包括类和接口的完整类名、属性字段的名称和描述符、方法名称和描述符等信息

   [![const-pool][img9]][img8]{:data-lightbox="deepin-java"}

> 在Java当中，8个基本数据类型都有对应的包装类型，而大部分包装类型都实现了常量池的技术，除了Double和Float类。
(备注说明：在JDK8之后，方法区已经取消，方法区被一个叫MetaSpace，它和堆合并到一起管理)

* __内存运行时数据区__  
   [![main-load-stop][img10]][img10]{:data-lightbox="deepin-java"}

> 扯了好多Java虚拟机的内容，也没讲多深，因为这里主要的目的是为了大家方便理解Java反射机制，下面正式进入正题

### 类加载

当ClassLoader加载一个class文件到JVM的时候，会自动创建一个该类的Class对象，并且这个对象是唯一的，后续要创建这个类的任何实例，都会根据这个Class对象来创建。因此每当加载一个class文件的时候，都会创建一个与之对应的Class对象。

* __解析一个类的各个部分，形成一个对象。__  
   [![stack-ref-heap][img11]][img11]{:data-lightbox="deepin-java"}  
    外存中的类，加载到内存中，会形成该对象的Class类，例如：String类，加载到内存中，就是StringClass对象。
也就是说类是java.lang.Class类的实例对象，而Class是所有类的类
对于普通的对象，一般都的创建方式：

```java
String s = new String();
```
既然类都是Class的对象，那么能否像普通对象一样创建呢，当看源码时，是这样写的 ：

```java
private Class(ClassLoader loader) {
    classLoader = loader;
}
```
源码里构造器是私有的，只有JVM可以创建Class的对象，虽然我们不能new一个Class对象，但是可以从已有的类得到一个Class对象，共有三种方式，如下：

```java
// 类名.class  通过获取类的静态成员变量class得到(任何类都有一个隐含的静态成员变量class)
Class<?> clazz = String.class;
// 对象.getClass
Class<?> clazz2 = new String().getClass();
// Class.forName("全量限定名")
Class<?> clazz3 = Class.forName("java.lang.String");
```
> (注意：这三种方式都是利用反射获取的都是同一个Class对象，这也叫做String的类类型，也就是描述何为类，一个类都有哪些东西，所以可以通过类类型知道一个类的属性和方法，并可以调用一个类的属性和方法，这就是反射的基础。)

### 反射
> 反射是指在程序的运行期间动态的去操作某个Class对象里面的成员（包括类信息、属性信息、方法信息等元素）。它可以让Java这种静态语言具备一定的动态性。目前大部分的开源框架实现都是基于反射的机制实现。  
JVM → 类加载 → class文件 → 创建 → Class对象 → 构建类的实例 → instance(实例)；  
重点在运行时动态的操作Class对象。

#### 反射机制的利与弊
为何要用反射机制？直接new对象不ok了吗，这就涉及到了动态与静态的概念

   * 静态编译：在编译时确定类型，绑定对象,即通过。
   * 动态编译：运行时确定类型，绑定对象。动态编译最大限度发挥了java的灵活性，体现了多态的应用，有利于降低类之间的藕合。
   * 优点:
       * 可以实现动态创建对象和编译。比如，一个软件，不可能第一个版本就把它设计的很完美，当这个程序编译成功，发布后，当发现某些功能需要更新时，我们不可能要用户把旧版的卸载，再重新安装新的版本。采用静态的话，需要把整个程序重新编译一次才可以实现功能的更新，而采用反射机制的话，它就可以不用卸载，只需要在运行时才动态的创建和编译，就可以实现该功能。
一句话总结：运行期类型的判断，动态类加载，动态代理就使用了反射
   * 缺点:
      1. 对性能有影响。反射相当于一系列解释操作，通知JVM要做的事情。性能比直接的java代码执行相同的操作要慢很多。
      1. 由于反射允许代码执行一些在正常情况下不被允许的操作（比如访问私有的属性和方法），所以使用反射可能会导致意料之外的副作用，反射代码破坏了抽象性，因此当平台发生改变的时候，代码的行为就有可能也随着变化。

#### 反射机制的相关操作

* __创建实例__  

   ```java
// 在反射操作之前的第一步，就是要先获取Class对象
Class<?> clazz = Class.forName("org.demo.reflect.bean.People");
// 根据Class对象创建一个实例
clazz.newInstance();
   ```
* __动态操作属性__  
通过Class对象可以动态的获取和操作类中的属性，属性在JDK中有一个类来进行封装，就是Field,Field提供了一些常用的API方法让我们去访问和操作类中的属性  

```java
getField() // 获取所有公开的属性字段（包括继承父类的公有属性）
getDeclaredField() // 获取本类所有（包括公有和私有，但是不包括父类的）的属性字段（注意：如果要访问和操作私有属性，必须调用setAccessible方法，打开访问开关）
getFields() // 获取所有公有的属性（包括继承自父类的公有属性）
getDeclaredFields() // 获取本类所有的属性（包括共有和私有的，但是不包括父类的）
set() // 给属性赋值，需要传入两个参数，第一个参数是当前类的一个实例，第二个参数是具体要赋予的值
get() // 获取属性的值，需要传入一个当前类的实例作为参数
getName() // 获取属性的名称
getType() // 获取属性的类型
isAnnotationPresent() // 判断该属性上是否定义了指定的注解，需要传入一个注解的Class对象作为参数
getAnnotation() // 获取当前属性上的注解对象，需要传入一个注解的Class对象作为参数
```

```java
public static void main(String[] args) throws Exception {
     
    // 在反射操作之前的第一步，就是要先获取Class对象
    Class<?> clazz = Class.forName("org.demo.reflect.bean.People");
    // 根据Class对象创建一个实例
    Object instance = clazz.newInstance();
    // 获取指定的属性
    Field f1 = clazz.getField("userName");
    // 获取属性的值,get方法需要传入一个当前类的实例
    Object value = f1.get(instance);
    System.out.println(value);
    // 通过反射给属性赋值
    // 第一个参数是当前类的实例，第二个参数是要赋予的值
    f1.set(instance, "godql");
    value = f1.get(instance);
    System.out.println(value);
    // 获取一个私有的属性
    // 如果需要访问和操作私有的成员，必须打开访问开关
    // 打开访问开关其实就是破坏封装
    Field f2 = clazz.getDeclaredField("age");
    // 强制打开访问权限
    f2.setAccessible(true);
    Object value2 = f2.get(instance);
    System.out.println(value2);
    f2.set(instance, 30);
    value2 = f2.get(instance);
    System.out.println(value2);
    // 获取属性的名称
    System.out.println(f1.getName());
    System.out.println(f2.getName());
    // 获取属性的类型
    System.out.println(f1.getType());
    System.out.println(f2.getType());
    // 获取所有公有的属性(包括继承自父类的公有属性)
    Field[] fs1 = clazz.getFields();
    // 获取本类所有的属性（包括共有和私有的，但是不包括父类的）
    Field[] fs2 = clazz.getDeclaredFields();
    // 判断当前属性上是否定义了注解
    System.out.println(f1.isAnnotationPresent(MyAnno.class));
    ystem.out.println(f2.isAnnotationPresent(MyAnno.class));
    // 获取属性上定义的注解
    MyAnno anno = f1.getAnnotation(MyAnno.class);
    // 获取注解上的属性值
    System.out.println(anno.name());
}
```
* __动态操作方法__  
对于Class中的方法，API也提供了相应的类来进行封装，就是Method

```java
getMethod() // 获取指定的公共的方法（包括继承自父类公共的），需要传递两个参数，第一个参数是方法名称，第二个参数是一个可变参数，传递的是方法参数的类型
getMethods() // 获取所有的公共的方法（包括继承父类的公共方法）。
getDeclaredMethod() // 获取本类中指定的方法（包括私有和共有的，不包括父类的），需要传递两个参数，第一个参数是方法名称，第二个参数是一个可变参数，传递的是方法参数的类型。如果是私有方法，同样需要先打开访问开关(setAccessible(true))。
getDeclaredMethods() // 获取本地中所有的方法（包括私有和公共的，不包括父类）
getName() // 获取方法名称
getReturnType() // 获取方法的返回值类型
getParameterTypes() // 获取方法中所有的参数类型
getParameterCount()// 获取方法中参数的总个数
getParameters() // (JDK1.8新特性)获取方法中所有的参数信息，每一个参数信息都是一个Parameter类的对象。可以通过这个对象获取各个参数的类型以及名称(注意：如果要获取参数名，在编译的时候需要加上一个parameters参数，如：javac -parameters Xxx.java。或者是在开发环境中设置相应的编译选项)。
invoke() // 回调当前方法,需要传递两个参数，第一个是当前类的实例，第二个是一个可变参数，需要传入调用方法是所需的参数值。
```

```java
public static void main(String[] args) throws Exception {
     
    Class<?> clazz = Class.forName("org.demo.reflect.bean.People");
    Object instance = clazz.newInstance();
    // 获取指定的Method
    Method m1 = clazz.getMethod("say", String.class, int.class);
    // 获取方法名
    System.out.println(m1.getName());
    // 获取方法的返回值类型
    System.out.println(m1.getReturnType());
    // 获取方法的所有参数类型
    Class<?>[] paramsType = m1.getParameterTypes();
    for (Class<?> c : paramsType) {
        System.out.println(c);
    }
    // 获取参数名称（JDK1.8开始支持）
    Parameter[] params = m1.getParameters();
    for (Parameter p : params) {
        System.out.println("参数类型:"+p.getType());
        System.out.println("参数名称:"+p.getName());
    }
    // 通过当前的方法，获取定义这个方法的类
    Class<?> c = m1.getDeclaringClass();
    System.out.println(c.getName());
  
    // 方法回调，目的就是通过反射去调用一个方法
    m1.invoke(instance, "godql", 21);
}
```
* __动态操作构造方法__   
Constructor是在反射API中用于封装构造方法的一个类，因此通过这个类可以获取构造方法的一些信息，以及通过这个对象来实例化一个类的实例。

```java
getConstructor() // 获取无参并且公共的构造方法
getDeclaredConstructor() // 获取一个构造方法可以是私有的也可以是公共的，需要传入一个可变参数，就是构造方法的参数类型（注意：如果是私有的，必须先打开访问开关）
newInstance() // 通过构造方法创建实例，也需要传入一个可变参数，传入的是具体的值
getConstructors() // 获取所有公共的构造方法，返回的是一个Constructor数组
getDeclaredConstructors() // 获取所有的构造方法(包括私有和共有的),同样返回的是一个数组
getParameters() // 获取所有的参数对象，和Method一样
getParameterTypes() // 获取所有的参数类型，同Method一样
```

```java
public static void main(String[] args) throws Exception {
      
    Class<?> clazz = People.class;
    // 获取无参的构造方法
    Constructor<?> c1 = clazz.getConstructor();
    // 获取构造方法的名称
    System.out.println(c1.getName());
    // 获取一个私有并且带参数的构造方法
    Constructor<?> c2 = clazz.getDeclaredConstructor(String.class);
  
    // 可以通过构造方法实例化一个对象
    //（注意：如果默认有一个无参并且是公共的构造方法，
    // 那么可以直接使用class.newInstance()方法创建实例，
    // 如果构造方法是私有的，或者是带参数的，就必须先获取
    // Constructor对象，在通过这个对象来创建类实例）
  
    // 1.适用于无参并且是公共的构造方法
    /* 
      Object instance = clazz.newInstance();
      System.out.println(instance);
    */
  
    // 2.适用于带参数或是私有的构造方法
    // 由于构造方法也可以私有化，所以必须先打开访问开关
    c2.setAccessible(true);
    Object instance = c2.newInstance("godql");
    System.out.println(instance);
  
    // 获取所有public修饰的构造方法
    Constructor<?>[] cons = clazz.getConstructors();
    // 获取所有构造方法（包括私有的）
    Constructor<?>[] cons2 = clazz.getDeclaredConstructors();
}
```
* __Class中的一些API__  
Class对象本身提供了很多的API方法用于获取和操作Class对象。

```java
getPackage() // 获取当前类所在的包，使用Package对象进行封装，可以从中获取包的信息，例如：包名
getSimpleName() // 获取当前类的简单类名（不包括包名）
getName() // 获取当前类的完整类名(包括包名)
getSuperclass() // 获取当前类的父类，返回的也是一个Class对象
getInterfaces() // 获取当前类所实现的所有接口，返回的是一个Class数组
isAnnotationPresent() // 判断当前类上是否定义了注解
getAnnotation() // 获取类上定义的注解
```

#### 通过反射了解集合泛型的本质

Java中集合的泛型，是防止错误输入的，只在编译阶段有效，绕过编译到了运行期就无效了。

```java
public static void main(String[] args) {
     
    List list = new ArrayList(); 
    List<String> list1 = new ArrayList<>(); 
   
    list.add("godql");
    // list1.add(20); 错误的
    Class c1 = list.getClass();
    Class c2 = list1.getClass();
   
    System.out.println(c1 == c2); // 结果：true，说明类类型完全相同
    // 反射的操作都是编译之后的操作(运行时)
   
    /*
     * 以上说明编译之后集合的泛型是泛型擦除的
     * Java中集合的泛型，是防止错误输入的，只在编译阶段有效，绕过编译就无效了。
     * 验证: 通过方法的反射来操作，绕过编译 
     */
    try {
        // 通过动态操作方法的反射得到add方法
        Method m = c2.getMethod("add", Object.class);
        // 方法回调 给list1添加一个int型的，这是在运行时的操作，所以编译器编译时没有泛型检查，所以不会报错
        // 绕过编译操作
        m.invoke(list1, 20);
        // 验证是否有添加进list集合里
        System.out.println(list1.size()); 
        // 这时候不能使用foreach遍历，否则集合会认为集合里边全是String类型的值
        // 且有类型转换错误，因为这个集合里面有int类型、String类
        System.out.println(list1); 
    } catch (Exception e) {
           e.printStackTrace();
    }
}
```
#### 使用场景
通用的应用程序  
框架比如：
   1. Spring 的 Ioc/Di
   1. SpringMVC 监控 Controller中的注解
   1. MyBatis 利用反射获取和设置对象值
   1. Struts2 的 FormBean 和页面之间…
   1. Hibernate的 find(Class clazz)
   1. JavaBean和JSP之间调用
   1. JDBC 的 classForName()

[img1]: /images/post/java/classloader.png
[img2]: /images/post/java/stack-method.png
[img3]: /images/post/java/native-method-stack.png
[img4]: /images/post/java/string-heap.png
[img5]: /images/post/java/string-heap-change.png
[img6]: /images/post/java/array-heap.png
[img7]: /images/post/java/for-heap.png
[img8]: /images/post/java/method-area.png
[img9]: /images/post/java/const-pool.jpg
[img10]: /images/post/java/main-load-step.png
[img11]: /images/post/java/stack-ref-heap.png


