---
layout: post
title: 2016年8月修改日志
published: true
categories: [private]
description: 这是我博客系统的修改日志
keywords: 日志, 博客，私密
---
#### 2016-08-12

1. 添加[ Coding.net ][h12-1]{:target="_blank"}的镜像站点，解决百度无法抓取 GitHub Pages 的问题，教程 [地址][h12-2]{:target="_blank"}

2. 恢复百度统计 「为了百度抓取页面」

[h12-1]: http://ychost.coding.me/
[h12-2]: #
#### 2016-08-11

1. 修改博客中的代码样式「kramdown 的代码[ 缩进 ][h11-1]{:target="_blank"}真恶心」

2. 更改[ 百度统计 ][h11-4]{:target="_blank"}为[ cnzz ][h11-2]统计，并自定义[ 显示今日访问人数 ][h11-3]{:target="_blank"}

3. 修改博客中图片样式并解决`img{width}`与手势插件的冲突
	
	> 通过限制`img`解决的，`img ===>  .markdown-body  img`

4. 添加博文[「显示 VisualStudio 未被引用的文件」][h11-5]{:target="_blank"}

[h11-1]: http://mazhuang.org/2016/06/28/vim-kramdown-tab/
[h11-2]: http://www.umeng.com/
[h11-3]: #
[h11-4]: http://tongji.baidu.com/
[h11-5]: /2016//11/show-all-files-in-visualStudio/


#### 2016-08-10

1. 添加 lightbox 插件可以点击图片全屏放大
2. 修该部分逻辑

	> 百度分析和评论系统只有 Github 上面才有

    > 鼠标放到图片上面会呈手指状

3. 添加了一篇博文[「固定 Vmware 中的 Linux 的 IP地址」][h10-1]{:target="_blank"}

4. 修正了「关于」的内容。

5. ~~添加 "hideInGithub" 该标签支持只在本地显示某文章而在github上面是隐藏的~~

6. 添加 "private" 的分类标签，该标签内的文章只在本地显示而在 Github 上面是隐藏的

7. 对文章的文件夹进行了按年号的分类

[h10-1]: /2016/08/10/fixed-ip-in-vmware-linux/