---
layout: post
title: 让百度收录自己的博客
categories: [Tutorial, 推荐]
description: 由于 GitHub 的限制百度无法收录搭建在 GitHub 上的博客的，这样我们玩儿的博客就在国内就成单机的了，本文就是一篇解决这个问题的一个教程
keywords: 镜像, Github, Coding
tags: [Github 镜像, Coding]
---
　　由于 GitHub 的限制百度无法收录搭建在 GitHub 上的博客的，这样我们玩儿的博客就在国内就成单机的了，本文就是一篇解决这个问题的一个教程

> 如果你还不熟悉如何搭建 GitHub 博客请点击 [「此处」][href1]

> 准备工具 [Putty][href4], [WinScp][href5]

### 原理

1. 如何让百度收录：

	百度是无法收录 GitHub Pages 的所以不能通过 SEO 优化等来解决此问题，比较好的解决办法就是搭建一个百度能收录的 GitHub Pages 的镜像网站，本文推荐在 [Coding][href2] 上面创建一个仓库作为 GitHub Pages 的镜像，这样百度就能收录到 Coding 上面的博客了，但是我们还是在 GitHub 上面工作的因为 Coding 仅仅是一个镜像而已。


1. 镜像原理：

	[![github-coding-flow][img1]][img1]{:data-lightbox="github-mirror"}
	
	1. 用户{% ihighlight bash %} git push {% endihighlight %}更新到 Github上面

	2. GitHub 接受到部署更新后会自动调用 Webhooks

	3. Webhooks 通知 OpenShift 服务器，OpenShift 服务器执行 {% ihighlight sh %} git pull {% endihighlight %}获取 GitHub 上面刚刚更新的内容

	4. 当 OpenShift 服务器更新完之后，执行 	{% ihighlight sh %} git push coding master {% endihighlight %} 将 Coding 上的内容进行更新

	5. 这时 Coding 和 GitHub 上面的内容就是一致的了，也就在 Coding 上面搭建了 GitHub 的一个简单的镜像仓库

### OpenShift 配置

* #### 什么是 OpenShift

	> 　　OpenShift 是红帽的云开发平台即服务（PaaS）。自由和开放源码的云计算平台使开发人员能够创建、测试和运行他们的应用程序，并且可以把它们部署到云中。Openshift广泛支持多种编程语言和框架，如Java，Ruby和PHP等。另外它还提供了多种集成开发工具如 Eclipse integration，JBoss Developer Studio和 Jenkins等。OpenShift  基于一个开源生态系统为移动应用，数据库服务等，提供支持。 ---- 摘自百度

	　　总之，[OpenShift][href3] 就是一个可以免费使用 Linux 服务器，我们可以在上面搭建网站，但是由于 GFW 等原因国内访问的速度并不理想，但是 OpenShift 上面的带宽是很大的。

	　　先去　[OpenShift][href3] (如果访问不了可以使用 [Lantern][href6] 翻出去) 注册一个账号，然打开 OPENSHFIT WEB CONSOLE 接着　Add Application 这里为了简单起见我们添加一个 PHP 5.4 应用程序

    [![open-openshift-web-console][img2]][img2]{:data-lightbox="github-mirror"}


    [![openshift-add-phpapp][img3]][img3]{:data-lightbox="github-mirror"}

* #### 登录 OpenShift

	　这里有两种方式登录，第一种是利用 rhc 登录，第二种方式是用putty登录，第一种方式简单快捷不需要自己去配置 .ssh 文件等等，第二种方式比较通用不仅仅限于登录 OpenShift 其它的利用 ssh 登录的都可以，这里我选择以第一种方式来登录 OpenShift, 如果有兴趣使用putty登录，请参考 [###][href7]。

	* 安装 rhc 

  ```
   	gem install rhc
  ```

   * 配置 OpenShift, 在配置种输入自己的 OpenShift 登录帐号及密码

  ```
   	rhc setup
  ```
  * 登录 OpenShift, 注意把 <font color="red">APP_NAME</font> 替换成上面建立的 OpenShift 应用名称

  ```
  	rhc ssh APP_NAME 
  ```

  * 登录成功了如图所示

  [![rch-login-successfully][img4]][img4]{:data-lightbox="github-mirror"}

###  联动 GitHub 与 Coding

#### PHP 执行脚本

#### GitHub 端配置

### 注意事项

#### 重复页面的 SEO 文件

#### 自动区分 Coding 与 GitHub



[href1]: /2016/08/10/create-blog-with-jekyll/
[href2]: https://coding.net/user
[href3]: http://openshift.com/
[href4]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[href5]: http://www.downza.cn/soft/187923.html
[href6]: https://lanterncn.org/
[href7]: #

[img1]: /images/post/tutorial/github-coding-flow.jpg
[img2]: /images/post/tutorial/open-openshift-web-console.jpg
[img3]: /images/post/tutorial/openshift-add-phpapp.jpg
[img4]: /images/post/tutorial/rch-login-successfully.jpg