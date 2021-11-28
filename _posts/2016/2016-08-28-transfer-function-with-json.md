---
layout: post
title: 使用 JSON 传递函数
categories: [后端, 推荐]
description: 一般来说 JSON 只能是包含基础数据，如果要用回调一般采用的是 JSONP, 但是如果 JSON 也能自带 {% ihighlight javascript %} function {% endihighlight %} 就省去了很多麻烦了。
keywords: JSON, function, 用 JSON 传递 函数
tags: [JSON]
---

　　一般来说 JSON 只能是包含基础数据，如果要用回调一般采用的是 JSONP, 但是如果 JSON 也能自带 {% ihighlight javascript %} function {% endihighlight %} 就省去了很多麻烦了。

> 本文是基于 ASP.NET MVC 利用的 Newtonjson 来进行 JSON 转换和传递的

* Model 注意这里利用了 <font color="red">JRaw</font>

  ```c#
    public class Person {
        public string Name { get; set; }
        public JRaw Exec { get; set; }
    }
  ```

* Controller 

  ```c#
   public ActionResult Index()
        {
            Person person = new Person { Name = "Joe",
            Exec = new JRaw("function(){console.log('i am the function')}") };
            ViewBag.Person = JsonConvert.SerializeObject(person);
            return View();
        }
  ```

* View

  ```html  
    @{
        Layout = null;
    }
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width" />
            <title>Index</title>
            <script>
                var person = eval(@Html.Raw(@ViewBag.Person));
                console.log("personJSON",person);
                person.Exec();
            </script>
        </head>
        <body>
            
        </body>
        </html>

  ```

* Result

    [![json-with-function][img1]][img1]{:data-lightbox="json-func"}

可以很清楚地看见类型为 <font color="red">JRaw</font> 的 {% ihighlight c# %} Exec {% endihighlight %} 传递给 JavaScript 之后就变成了一个可以执行的函数

[href1]: http://www.newtonsoft.com/json

[img1]: /images/post/json/josn-with-function.jpg