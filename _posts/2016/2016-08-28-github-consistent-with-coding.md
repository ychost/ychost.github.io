---
layout: post
title: 让百度收录自己的博客
categories: [杂记, 推荐]
description: 由于 GitHub 的限制百度无法收录搭建在 GitHub 上的博客的，这样我们玩儿的博客就在国内就成单机的了，本文就是一篇解决这个问题的一个教程
keywords: 镜像, GitHub, Coding
tags: [GitHub, Coding]
---
　　由于 GitHub 的限制百度无法收录搭建在 GitHub 上的博客的，这样我们玩儿的博客就在国内就成单机的了，本文就是一篇解决这个问题的一个教程

> 如果你还不熟悉如何搭建 GitHub 博客请点击 [「此处」][href1]


### 原理

1. 如何让百度收录：

	百度是无法收录 GitHub Pages 的所以不能通过 SEO 优化等来解决此问题，比较好的解决办法就是搭建一个百度能收录的 GitHub Pages 的镜像网站，本文推荐在 [Coding][href2] 上面创建一个仓库作为 GitHub Pages 的镜像，这样百度就能收录到 Coding 上面的博客了，但是我们还是在 GitHub 上面工作的因为 Coding 仅仅是一个镜像而已。


1. 镜像原理：

	[![github-coding-flow][img1]][img1]{:data-lightbox="github-mirror"}
	
	1. 用户{% ihighlight bash %} git push {% endihighlight %}更新到 GitHub上面

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

	　这里有两种方式登录，第一种是利用 rhc 登录，第二种方式是用putty登录，第一种方式简单快捷不需要自己去配置 .ssh 文件等等，第二种方式比较通用不仅限用于登录 OpenShift 其它主机也可以登录，但这里我选择以第一种方式来登录 OpenShift, 如果有兴趣使用putty登录，请参考 [「putty远程连接openshift云服务器」][href7]。

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

* 利用 rhc 或者 putty 成功登陆了之后，进入 data 文件夹，这个文件夹我们才具有操作权限

  ```
   cd $OPENSHIFT_DATA_DR
  ```
  
* 将 GitHub 上面的仓库 Clone 一份到该目录，注意将 <font color="red">REPO_URL</font>替换你博客的仓库地址

  ```
    git clone REPO_URL
  ```

* 修改 .git/config 文件内容，将 Coding.net 的信息和 GitHub的信息直接添加上去，当然如果觉得不安全可以考虑用 SSH 

  ```
    vim ./git/config
  ```

  注意将 <font color="red">GITHUB_PWD</font>, <font color="red">CODING_PWD</font> 等等替换成自己的信息，这里主要是利用 HTTPS 来认证账户，没有 Coding 账户的先去 [Coding.net][href2] 注册

  ```
      [core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
[remote "origin"]
        url = https://GITHUB_PWD@github.com/USER_NAME/USER_NAME.github.io.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[remote "coding"]
        url = https://USER_NAME:CODING_PWD@git.coding.net/USER_NAME/USER_NAME.git
        fetch = +refs/heads/*:refs/remotes/coding/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
  ```

#### PHP 执行脚本

* 进入 app-root/repo 文件夹，app-root 是 data 文件夹的上层目录

* 添加 php 脚本文件  pushCodingNet.php ，并加入如下内容，这里就是主要实现请求这个文件后自动获取 GitHub 的最近更新并强行推送到 Coding 上面去，注意替换 <font color="red">YOUR_NAME</font>

  ```php
      <?php
    if( $_GET['key'] == 'PUSH' ) {
        echo shell_exec('cd $OPENSHIFT_DATA_DIR/YOUR_NAME.github.io;git pull;git push -f coding');
    }
    else {
        header('HTTP/1.1 400 Bad Request');
        echo <<<HTML
    // Fallback
    HTML;
    }
    
  ```

#### 添加 Webhooks

进入你的 GitHub 仓库 → Setting → Webhooks & Services → Add Webhook, 注意 Payload URL 加入 <font color="red">YOUR_OPENSHIFT_WEB</font>/pushCodingNet.php?key=PUSH

  [![github-add-webhooks][img5]][img5]{:data-lightbox="github-mirror"}  

### 完成

　　到这里已经搭建好了，只要我们向 GitHub 提交更新，GitHub 上面设置的 Webhook 会自动去请求 OpenShift 主机，然后 OpenShift 主机接到请求之后会自动拉取 GitHub 的最新内容然后强行推送到 Coding 的仓库中去，所以 Coding 和 GitHub的内容就保持一致了

#### 注意事项

* SEO 问题
  
  如果担心 SEO 问题在每个页面上添加 [canonical][href8] 标签就好





[href1]: /2016/08/10/create-blog-with-jekyll/
[href2]: https://coding.net/user
[href3]: http://openshift.com/
[href4]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[href5]: http://www.downza.cn/soft/187923.html
[href6]: https://lanterncn.org/
[href7]: http://jingyan.baidu.com/article/0f5fb099cdc2426d8334ea0d.html
[href8]: http://www.chinaz.com/web/2011/0630/192530.shtml

[img1]: /images/post/tutorial/github-coding-flow.jpg
[img2]: /images/post/tutorial/open-openshift-web-console.jpg
[img3]: /images/post/tutorial/openshift-add-phpapp.jpg
[img4]: /images/post/tutorial/rch-login-successfully.jpg
[img5]: /images/post/tutorial/github-add-webhooks.jpg