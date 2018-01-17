---
layout: post
title: 显示网页访问量
categories: [杂记]
description: CNZZ 是一个第三方的网站流量统计分析系统，类似于百度统计、谷歌分析这类的网站，它们可以对你自己的网站的 IP、PV 等数据进行统计分析
keywords: CNZZ, show PV
tags: [CNZZ, PV, IP]
---
　　[CNZZ][href1]{:target="_blank"} 是一个第三方的网站流量统计分析系统，类似于[ 百度统计][href2]{:target="_blank"}、[谷歌分析 ][href3]{:target="_blank"}这类的对网站，它们可以对你自己的网站的 IP、PV 等数据进行统计分析。它支持前端显示今日和昨日的 IP、 PV 等数据，但是显示的样式很丑而且不能在后台自定义，本文是一个破解这一限制达到自定义其数据显示的一篇教程。

> 由于「百度统计」没有暴露访问量的 API 以及「谷歌分析」被隔离在墙外了，所以选取了 [CNZZ][href1]{:target="_blank"} 来作为统计工具

#### 获取统计代码

1. 到 [CNZZ][href1]{:target="_blank"} 官网去注册账号，添加一个需要统计的站点

2. 在「统计站点」中点击「统计代码」

3. 在「统计代码」中往下翻页 <font color="red">开启</font>「统计图标“带数据显示”」

	[![cnzz-get-code][img1]][img1]{:data-lightbox="cnzz-show-pv"}

4. 将上述代码插入到页面的 `<footer>` 里面，就可以看其统计的效果

#### 分析统计代码

1. 原始代码

   ```html
   <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_YOURID'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3DYROUID%26online%3D1' type='text/javascript'%3E%3C/script%3E"));</script>
   ```
2. 利用 [urlDecode][href4]{:target="_blank"} 对 `escape` 部分解码后的代码

	> 注意 <font color="red">+</font> 号会被解析掉，请手动添加，以下是我手动格式化后的代码

   ```html
   <script type="text/javascript">
   
   var cnzz_protocol = (("https:" == document.location.protocol) ? "\
   https://" : " http://");
   document.write("\
  	<span id='cnzz_stat_icon_YOURID'></span>\
      	<script src='" +  cnzz_protocol +  
      	"s4.cnzz.com/z_stat.php?id=YOURID&online=1'\
      	 type='text/javascript'></script");

   </script>
```

3. 自定义统计代码
	
	可以看出 CNZZ 的统计代码其实是在网页上追加了一个 ID 为 cnzz_stat_icon_<font color="red">YOURID</font> 的 `span` 元素，然后跨域访问了一个php脚本「引入 JS 文件」，所以我们可以自己来构建这样两个步骤。
  
    * 在网页的`<footer>`里面面追加一个`<span>`和一个`<script>`元素
    * 注意 id 为你的 id，由于原始的显示不好看，所以这里将其隐藏

	  ```html
	  <span style="display:none" id='cnzz_stat_icon_YOURID'></span>

      <script src="\
            http://s4.cnzz.com/z_stat.php?id=YOURID&online=1" 
            type='text/javascript'>
      </script>

	  ```

#### 破解统计代码

1. 创建一个在页面中自己创建一个展示 PV 的一个`<span>`，比如

   ```HTML
   <span> 今日PV量：<span id="totdayPv"></span></span>
   ``` 

1. 取出统计值，并赋给创建的`<span>`

   ```javascript
  /*
		获取cnzz统计的今日PV值
  */
(function(){
	var cnzzITLTimes = 10;
	var cnzzITL = setInterval(function(){
	var cnzz = $("#cnzz_stat_icon_YOURID a");  
	cnzz.each(function(){    
	  if($(this).text().indexOf("今日PV") >= 0 ){  
	    clearInterval(cnzzITL);
	    console.log($(this).text());
	    var vistAll = $(this).text().split("]");
	    var todayIpStr = vistAll[0];
	    var todayPvStr = vistAll[1];       
	    var yestodayIpStr = vistAll[2];
	    var yestodayPvStr = vistAll[3]    
		// get today's pv
		// you can also get today's ip etc.
	    totdayPv =   todayPvStr.replace(/[^\d]/g,'');
	    console.log(totdayPv);
	    if(totdayPv == 0){
	      totdayPv = 1;
	   }
	   $("#totdayPv").text(totdayPv);
	}});

	if(--cnzzITLTimes == 0){
		clearInterval(cnzzITL);
	}
  },500);
})();
   ```

#### 结论

   　　这其实就是一个简单 DOM 操作，只是加载的统计代码为跨域的所以需要用`<script>`标签，开始考虑用`JSONP`然后回调，很明显回调的话就不用`setInterval`这种低级的方式了，后来发现使用`JSONP`是可以加载到统计的脚本，但是该脚本需要对页面进行 DOM 操作却被浏览器<font color="red">禁止</font>了，可见`JSONP`获取的跨域脚本有很多限制，所以还是换回了利用`<script>`标签的方式来引入脚本，然后再来获取需要的值


[href1]: https://web.umeng.com/main.php?c=user&a=index
[href2]: http://tongji.baidu.com/
[href3]: http://www.google.cn/intl/zh-CN_ALL/analytics/features/analysis-tools.html
[href4]: http://tool.chinaz.com/tools/urlencode.aspx

[img1]: /images/post/crack/cnzz-get-code.jpg