---
layout: post
title: 修改日志
published: true
categories: [Private]
description: 这是我博客系统的修改日志
keywords: 日志, 博客，私密
tags: [Private]
---
#### 2019-04-13
1. 添加图片水印
> 通过 site.useWatermark 来控制

#### 2019-04-10
1. 添加本地调试模式底部显示
> 本地调试屏蔽了不蒜子的浏览量统计

#### 2019-04-06
1. 添加阅读分钟数自定义配置
> 在 post 文章里面通过 readMins 配置

#### 2019-04-03
1. 添加对 PDF 文章的支持
> 在 post 文章里面通过 pdfLink 指向文件即可

#### 2019-03-29
1. 私有文章检索
> 搜索 「__」 即可

#### 2018-09-05
1. 删除网易云音乐播放器

#### 2018-08-31	
1. 切换评论系统为 [valine](https://panjunwen.com/diy-a-comment-system/)

#### 2018-08-22
1. 将服务器从 github 移动到自己租的腾讯服务器，域名不变

#### 2018-04-24
1. 添加 https 访问
1. 添加 service-worker 支持离线访问博客

#### 2018-03-24
1. 添加页面访问量和点击量，来源[不蒜子](http://busuanzi.ibruce.info)

#### 2018-03-17
1. 修复搜索框 ```focus``` 事件不存在的 Bug
1. 添加 ```window.onSearchLoad``` 函数
   ```javascript
      window.onSearchLoad(function()){
		    var results = window.idx.search("动态规划"); 
            console.log(results);
	  }
   ```

#### 2018-03-16
1. 在 prod 模式下面屏蔽掉「上一篇」，「下一篇」对私密文章的连接

#### 2018-02-27
1. 添加「上一篇」，「下一篇」的连接

#### 2018-02-26
1. 添加文章字数统计与阅读时间预估

#### 2018-01-19
1. 更改「分类」的锚为 ```cat-var```，之前为 ```var```
1. 修复「分类」的锚的定位

#### 2018-01-17
1. 替换「维基」连接为「归档」
1. 添加博客文章统计功能
	> 原创、转载、加密统计
1. 删除「分类」的 More 连接
1. 修改分类详细里面的无序列表 ```<ul>``` 为有序的 ```<ol>```
1. 添加「网易云播放器」
1. 添加「标签」页面

#### 2018-01-15
1. 替换评论系统为「畅言」
1. 添加「打赏」功能

#### 2018-01-14
1. 删除「百度统计」

#### 2018-01-12
1. 替换「disqus」为「Gitment」
1. 修复几处编译时候的 Warning
1. 删除 cnzz 的流量统计
1. 切换 `canonical` 指向 blog.sudoyc.com

#### 2017-08-09
1. 替换「网易云更贴」为「disqus」
2. 添加 ```gem "tzinfo-data" if Gem.win_platform?``` 到 Gemfile 中

#### 2017-04-11
1. 修改 404 页面指向益云的公益广告
2. 替换「多说」为「网易云跟帖」
3. 关闭「百度分享」和「百度搜索」
4. 添加「remoteBuild.sh」脚本
5. 关闭「openshift」的「webhook」改为手动向「coding.net」上面部署


#### 2016-08-28

1. 切换 `canonical` 标签指向 www.sudoyc.com

2. 修复在 GitHub 上面某些图片出现 404 错误

    > GitHub 上面的文件需要区分大小写

3. 添加文章 [「让百度收录自己的博客」][h28-1]

[h28-1]: /2016/08/28/github-consistent-with-coding/

#### 2016-08-15

1. 添加 「百度搜索」 「百度分享」(隐藏)  

1. 搜索栏自适应屏幕

#### 2016-08-14

1. 修复「详细分类」中异步回调的问题

3. 修复各个指向「详细分类」的连接

4. 修正「详细分类」界面的 {% ihighlight html%}<title>{% endihighlight %}

5. 修复「详细分类」界面的分享连接抖动问题

6. 删除「推荐文章」的{% ihighlight css %}target="_blank"{% endihighlight %}

7. 添加 `tags` 标签

8. 添加 `repost` 标签 

8. 添加 {% ihighlight liquid %} {% raw %}{{ site.cat_brif_repo_limit }} {% endraw %}{% endihighlight %} 变量限制分类中的预览文章数量

9. 添加 [inline_highlight][h14-1] 支持 span code 高亮
	
	> 安装方法： [installing-a-plugin][h14-2]{:target="_blank"}

	> 使用方法：{% raw %} {% ihighlight code %} //some conde span {% endihighlight %}   {% endraw %}

10. 在 SublimeText2 `ihighlight` 的snippet `ihigh` 

	> [手把手教你写Sublime中的Snippet][h14-3]{:target="_blank"} 	

	> snippet 的 `scope` [标签值][h14-4]{:target="_blank"} 

11. 给 Post 的文章的所有 {% ihighlight html %} <a> {% endihighlight %} 标签添加属性 	{% ihighlight css %} target="_blank" {% endihighlight %}，如果需要修改请使用 	{% ihighlight markdown %} [text][href]{:target="_self"} {% endihighlight %}

[h14-1]: https://github.com/bdesham/inline_highlight
[h14-2]: https://jekyllrb.com/docs/plugins/#installing-a-plugin
[h14-3]: http://www.jianshu.com/p/356bd7b2ea8e
[h14-4]: https://gist.github.com/iambibhas/4705378

#### 2016-08-13

1. 替换「友言」评论系统为「多说」

2. 删除掉原始的 ~~ReadMe.md~~

3. 添加文章[「显示网页访问量」][h13-1]{:target="_blank"}

4. 修复「推荐文章」在部分界面不显示的问题

5. 添加详细分类子页面修复「中文乱码」问题

	> 这里使用了 jQuery 当中的两个 API `encodeURIComponent(url)` 和 `decodeURIComponent(url)`

	> Liquid 当中使用了管道命令 `url_encode`

   ```liquid 
   {% raw %}
   {{ category | first | url_encode   }}
   {% endraw  %}
   ```
 6. 更新 OpenShift 中的 PHP 脚本

    > 删除掉了~~`git fetch`~~命令，使 Coding 的镜像内容与 GitHub 上面完全一致

[h13-1]: /2016/08/13/use-cnzz-show-pv/


#### 2016-08-12

1. 添加[ Coding.net ][h12-1]{:target="_blank"}的镜像站点，[解决百度无法抓取 GitHub Pages 的问题][h12-2]{:target="_blank"}

2. 恢复百度统计 「为了百度抓取页面」

3. 删除 ~~`site.github`~~ 变量，添加 `local_debug` 变量来区分本地与远程服务器
	
	> 本地启动服务其使用命令 `bundle exec jekyll serve --config _config.local.yml`

	> ~~liquid 里面 <font color="red">没有</font> `true` <font color="red">只有</font> `false` 这个真坑~~

4. html 头中添加`canonical`标签解决重复网页的 SEO 问题

5. 替换首页的「我的 GitHub 仓库」为「推荐文章」

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
[h11-5]: /2016/11/show-all-files-in-visualStudio/


#### 2016-08-10

1. 添加 lightbox 插件可以点击图片全屏放大
2. 修该部分逻辑

	> 百度分析和评论系统只有 GitHub 上面才有

    > 鼠标放到图片上面会呈手指状

3. 添加了一篇博文[「固定 Vmware 中的 Linux 的 IP地址」][h10-1]{:target="_blank"}

4. 修正了「关于」的内容。

5. ~~添加 "hideInGitHub" 该标签支持只在本地显示某文章而在github上面是隐藏的~~

6. 添加 "private" 的分类标签，该标签内的文章只在本地显示而在 GitHub 上面是隐藏的

7. 对文章的文件夹进行了按年号的分类

[h10-1]: /2016/08/10/fixed-ip-in-vmware-linux/
