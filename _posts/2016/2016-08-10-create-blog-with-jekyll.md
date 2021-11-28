---
layout: post
title: 用 Jekyll 搭建 GitHub 博客
categories: [杂记, 推荐]
description: 如果想要以一种优雅的方式写博客，那么 Markdown 是你的第一选择
keywords: Jekyll, GitHub
tags: [Jekyll, Blog, GitHub]
---

　　如果想要以一种「优雅」的方式写博客，那么 [Markdown][href1]{: target="_blank"} 是你的第一选择，为了能够将纯文本转成静态博客我们需要用到 [jekyll][href2]{: target="_blank"}，不仅本地可以运行它而且 [GitHub][href3]{: target="_blank"} 也带有它的运行环境，所以利用 Jekyll 搭建的博客可以放在 [GitHub][href3]{: target="_blank"} 上面以供他人访问。

> 本文的所有操作都是基于 Windows 平台的

> 本文只是一个简单的搭建 Jekyll 本地调试环境和启用 GitHub 博客服务的一个教程，未涉及博客的撰写内容

> 环境搭建好了可以参考 GitHub 官方提供的[教程][href10]{: target="_blank"}

> 谷歌是可以收录 GitHub 博客的

> 由于百度不能检索到 GitHub 的博客，故利用国内的 [Coding][href11]{:target="_blank"} 做了一个 [GitHub][href3]{:target="_blank"} 的镜像内容 [教程][href12]


<br/>

### 概括

1. 安装 [Ruby][href4]{: target="_blank"} 和 [devkit][href4]{: target="_blank"}

2. 用 Gem 安装 Jekyll

3. 下载 Jekyll 博客模板

4. 运行下载的模板进行相关修改和调试

5. 创建 GitHub 账户

6. 上传调试好的博客到 GitHub 的指定仓库中去


### 环境搭建

#### 准备工作

1. 下载 [Ruby][href4]{: target="_blank"}
	> 2019-3-27：这里最好下载 [Ruby2.3.1.exe][href14] 和 [DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe][href13]，其它版本测了兼容性有点问题

	> 2017-08-09：如果是 windows 平台，由于 Wdm 不支持高版本 Ruby 所以请使用 <font color="red"> ruby2.3 </font>及之前的版本
	
	> 注意根据如果电脑是 <font color="red">x64(64位操作系统)</font> 请下载 <font color="red">Ruby2.3.1(x64)</font>, 如果是 <font color="red">x86 (32位系统)</font> 请下载 <font color="red">Ruby2.3.1</font>

	[![ruby-download-page][img1]][img1]{:data-lightbox="create-blog"}

2. 下载 [devkit][href4]{: target="_blank"}

	> 这个软件和 Ruby 是同一个下载网页，它在<font color="red">下载网页的底部</font>，这个也分<font color="red"> x86 </font>和<font color="red"> x64 </font>两个版本，请根据自己的情况下载，~~第一个下载连接是支持 Ruby1.8.7和1.9.3 这个是不需要的，因为刚刚下载的 Ruby 是 2.3.1 版本~~

	[![devkit-download-page][img2]][img2]{:data-lightbox="create-blog"}

#### 安装工作

1. 安装 Ruby 和 devkit

	> Ruby 的安装是典型的 Windows 软件的安装流程 <font color="red">建议以默认的路径安装，注意<font color="blue">勾选</font> Add Ruby executables to your PATH</font>，不然只有自己手动添加 Ruby 的环境变量

	[![ruby-install-step][img3]][img3]{:data-lightbox="create-blog"}

	> devkit 的安装稍微麻烦一点，不过只是多一条命令而已
	
	> 首先，打开 devkit 安装包会自动弹出解压窗口，这里将它解压到了桌面的 blog 文件夹

	[![unzip-devkit-pkg][img4]][img4]{:data-lightbox="create-blog"}

	> 接着，到 devkit 解压的目录目录打开 CMD 命令窗口，这里有一个快捷键的方式：在该目录下面按住 「Shift + 鼠标右键」会出现「在此处打开命令窗口(W)」点击它

	[![cmd-open-infolder][img5]][img5]{:data-lightbox="create-blog"}

	> 然后就进入了 CMD 命令行模式，输入如下命令 

   ```
   ruby dk.rb init
   ruby dk.rb install
   ```

2. 检查安装情况

   ```
   ruby -v
   gem -v
   ```
	[![pkg-install-info][img6]][img6]{:data-lightbox="create-blog"}

### jekyll 安装

1. 替换 gem 官方源
	> 2019-3-27：<font color="red">现在不用换源国内也可以访问</font>

	> jekyll 需要用 gem 来进行安装，由于 gem 的官方源被墙了所以需要替换 gem 的源，这里将其替换成 [Ruby China][href5]{: target="_blank"}，顺便安装了 bundle 以及将它的源替换掉了

   ```
   gem sources --add https://gems.ruby-china.com/ 
   gem sources --remove https://rubygems.org/
   gem install bundle
   bundle config mirror.https://rubygems.org https://gems.ruby-china.com
   ```

2. 安装 jekyll

   ```
   gem install jekyll
   ```

	[![jekyll-install-cmd][img7]][img7]{:data-lightbox="create-blog"}

3. 检查安装情况

   ```
   jekyll --version
   ```

	[![jekyll-install-rst][img8]][img8]{:data-lightbox="create-blog"}

#### 本地调试博客

1. 下载模板

	> 网上有很多利用 jekyll 搭建起来的博客模板，这里推荐 [jekyllthemes.org][href6]{: target="_blank"}

	> 自己选一个看的上眼的模板并下载下来，这里以 [hcz-keyll-material][href7]{: target="_blank"} 为例

	[![jekyll-download-theme][img9]][img9]{:data-lightbox="create-blog"}

2. 启用服务
	
	> 解压刚刚下载的模板，文件夹里一般含有一个名为 <font color="red">Readme.md</font> 的文件，该文件包含了此模板的一些介绍和相应的配置

	> 到刚刚下载的模板的文件夹打开 CMD 终端执行


   ```
   bundle exec jekyll serve
   ```


3. 可能会报很多的错，不要担心看看报错的原因，网上一般都有解决方案的，如果是依赖问题可以用如下命令解决

   ```
   bundle install
   ```

	[![blog-start-cmd][img10]][img10]{:data-lightbox="create-blog"}

4. 查看博客

	> 浏览器输入 [127.0.0.1:4000][href8]{:target="_blank"} 就可以访问刚刚搭建的博客

	[![blog-browse-effect][img11]][img11]{:data-lightbox="create-blog"}

#### 远程提交

　　这里只需要创建一个仓库名为 <font color="red">userName</font>.GitHub.io 的仓库 「注：这里的 <font color="red"> userName </font> 为你的 GitHub 账号」，然后将该模板上传上去就可以了。

1. 安装 [Git][href9]{:target:"_blank"} 软件
	
	> 一路默认下去就行
	
	[![git-install-process][img15]][img15]{:data-lightbox="create-blog"}


2. 创建建 [GitHub][href3]{: target="_blank"} 账户
	
	[![GitHub-create-acnt][img16]][img16]{:data-lightbox="create-blog"}

3. 创建一个名称为 <font color="red">userName</font>.GitHub.io 的仓库「<font color="red">userName </font>为你的 GitHub 账号」

	> 这里的账号名称为 ychost 由于之前创建了这个仓库所以出现了同名错误

	[![GitHub-create-repo][img12]][img12]{:data-lightbox="create-blog"}

	[![GitHub-submit-repo][img13]][img13]{:data-lightbox="create-blog"}

4. 上传项目到 GitHub
	
	> 到博客项目根目录点击右键选择「Git Bash Here」

	> 输入如下命令，注意第二行的<font color="red"> userName</font>

   ```
   git init
   git remote add blog https://GitHub.com/userName/userName.GitHub.io.git  
   git add .
   git commit -m 'my first blog'  
   git push blog  
   ```

	[![git-input-cmd][img14]][img14]{:data-lightbox="create-blog"}

	> 然后按照提示输入相应的用户账号和密码进行登录就可以了

5. 打开浏览器输入 <font color="red"> userName</font>.GitHub.io 就可以浏览到刚刚上传上去的博客内容

[href1]: http://sspai.com/25137
[href2]: http://jekyll.bootcss.com/
[href3]: https://www.github.com
[href4]: https://rubyinstaller.org/downloads/archives/
[href5]: https://gems.ruby-china.org/
[href6]: http://jekyllthemes.org/
[href7]: http://jekyllthemes.org/themes/hcz-jekyll-material/
[href8]: http://127.0.0.1:4000
[href9]: http://rj.baidu.com/soft/detail/30195.html?ald
[href10]: https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
[href11]: https://coding.net
[href12]: /2016/08/28/github-consistent-with-coding/
[href13]: https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
[href14]: https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.1-x64.exe

[img1]: /images/post/tutorial/ruby-download-page.jpg
[img2]: /images/post/tutorial/devkit-download-page.jpg
[img3]: /images/post/tutorial/ruby-install-step.jpg
[img4]: /images/post/tutorial/devkit-unzip-process.jpg
[img5]: /images/post/tutorial/cmd-open-infolder.jpg
[img6]: /images/post/tutorial/pkg-install-info.jpg
[img7]: /images/post/tutorial/jekyll-install-cmd.jpg
[img8]: /images/post/tutorial/jekyll-install-rst.jpg
[img9]: /images/post/tutorial/jekyll-download-theme.jpg
[img10]: /images/post/tutorial/blog-start-cmd.jpg
[img11]: /images/post/tutorial/blog-browse-effect.jpg
[img12]: /images/post/tutorial/github-create-repo.jpg
[img13]: /images/post/tutorial/github-submit-repo.jpg
[img14]: /images/post/tutorial/git-input-cmd.jpg
[img15]: /images/post/tutorial/git-install-process.jpg
[img16]: /images/post/tutorial/github-create-acnt.jpg