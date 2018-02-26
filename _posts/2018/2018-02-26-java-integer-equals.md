---
layout: post
title: Java 中 Integer 的 == 与 equals
categories: [后端]
description: Java 的 Integer 的 == 与 equals 在不同数值范围所得到的结果不一样，关于这一点虽然实际项目中遇到的比较少，但是对于面试来说是一个重要点
keywords: Java, Integer, equals
tags: [Java, Equals]
excerpt: Java 的 Integer 的 == 与 equals 在不同数值范围所得到的结果不一样，关于这一点虽然实际项目中遇到的比较少，但是对于面试来说是一个重要点
---
考虑如下代码的输出：  
```java
Integer a = 0;
Integer b = 0;
System.out.println(a == b);
System.out.println(a.equals(b));
//output:
//true
//true
```

再考虑这个代码的结果：  
```java
Integer a = 1000;
Integer b = 1000;
System.out.println(a == b);
System.out.println(a.equals(b));
//output:
//false
//true
```

__为什么会有两个不同的结果，这个结果有什么因素导致？__  
原来 Java 设有 Integer 的常量池，这个常量池缓存了 $$[-128,127]$$ 的所有整数，所以在比较 $$[-128,127]$$ 之间的 Integer 的时候是直接比较的同一常量值，所以```a==b```，当比较范围之外的值的时候比较的是新对象的引用地址，所以 ```a!=b```     
> 注：上面的代码 ```Integer a = 0``` 等，使用到了自动装箱，而 Integer 的自动装箱使用的是 ```Integer.valueof(int i)```

__其它包装器__  
* Boolean：(全部缓存)
* Byte：(全部缓存)
* Character(<= 127缓存)
* Short(-128 — 127缓存)
* Long(-128 — 127缓存)
* Float(没有缓存)
* Doulbe(没有缓存)

附 JDK 源码：

```java
/** 
     * Cache to support the object identity semantics of autoboxing for values between  
     * -128 and 127 (inclusive) as required by JLS. 
     * 
     * The cache is initialized on first usage. During VM initialization the 
     * getAndRemoveCacheProperties method may be used to get and remove any system 
     * properites that configure the cache size. At this time, the size of the 
     * cache may be controlled by the vm option -XX:AutoBoxCacheMax=<size>. 
     */  
  
    // value of java.lang.Integer.IntegerCache.high property (obtained during VM init)  
    private static String integerCacheHighPropValue;  
  
    static void getAndRemoveCacheProperties() {  
        if (!sun.misc.VM.isBooted()) {  
            Properties props = System.getProperties();  
            integerCacheHighPropValue =  
                (String)props.remove("java.lang.Integer.IntegerCache.high");  
            if (integerCacheHighPropValue != null)  
                System.setProperties(props);  // remove from system props  
        }  
    }  
  
    private static class IntegerCache {  
        static final int high;  
        static final Integer cache[];  
  
        static {  
            final int low = -128;  
  
            // high value may be configured by property  
            int h = 127;  
            //可以配置这一常量池的范围
            if (integerCacheHighPropValue != null) {  
                // Use Long.decode here to avoid invoking methods that  
                // require Integer's autoboxing cache to be initialized  
                int i = Long.decode(integerCacheHighPropValue).intValue();  
                i = Math.max(i, 127);  
                // Maximum array size is Integer.MAX_VALUE  
                h = Math.min(i, Integer.MAX_VALUE- -low);  
            }  
            high = h;  
  
            cache = new Integer[(high - low) + 1];  
            int j = low;  
            for(int k = 0; k < cache.length; k++) //缓存区间数据  
                cache[k] = new Integer(j++);  
        }  
  
        private IntegerCache() {}  
    }  
  
    /** 
     * Returns a <tt>Integer</tt> instance representing the specified 
     * <tt>int</tt> value. 
     * If a new <tt>Integer</tt> instance is not required, this method 
     * should generally be used in preference to the constructor 
     * {@link #Integer(int)}, as this method is likely to yield 
     * significantly better space and time performance by caching 
     * frequently requested values. 
     * 
     * @param  i an <code>int</code> value. 
     * @return a <tt>Integer</tt> instance representing <tt>i</tt>. 
     * @since  1.5 
     */  
    public static Integer valueOf(int i) {  
        if(i >= -128 && i <= IntegerCache.high)  
            return IntegerCache.cache[i + 128];  
        else  
            return new Integer(i);  
    }  
```
__参考：__  

[https://www.cnblogs.com/csniper/p/5882760.html][href2]

[http://blog.csdn.net/fanxiaobin577328725/article/details/52431508][href1]

[href1]: http://blog.csdn.net/fanxiaobin577328725/article/details/52431508
[href2]: https://www.cnblogs.com/csniper/p/5882760.html