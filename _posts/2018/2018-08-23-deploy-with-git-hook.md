---
layout: post
title: 使用 Git hook 实现自动化部署
categories: [工具]
description: 每一次与 Git Rpository 进行交互的周期内可以执行任意的脚本当然包括自动部署
keywords: git hook, 自动化部署
tags: [git, hook, 自动化部署]
excerpt: 每一次与 Git Rpository 进行交互的周期内可以执行任意的脚本当然包括自动部署
---

### 背景
传统的部署方式一般通过 FTP 将生成的文件传入到服务器然后进行手动部署操作，该方式繁琐且没啥技术含量。本文通过一个简单的 git hook 的使用旨在说明自动化部署的原理

### 方法
1. 用户 push 源码到服务器
1. 服务器监听到 push 动作然后执行 hook 里面定义的脚本
1. 脚本让服务文件夹拉取最新的代码，然后执行部署动作

[![hook-deploy][img1]][img1]{:data-lightbox="hook-deploy"}

### 教程
1. 在服务器上建立一个 git repository
```
    cd /home/git/blog/
    git init --bare
```
1. 将```www```文件夹关联到 git repostory
```
    cd /home/srv/www/
    git clone /home/git/blog/
```
1. 编写 hook 脚本
```
    cd /home/git/blog/hooks/
    vim ./post-receive
    chmod +x ./post-receive
```
post-receive 内容
```
    #!/bin/sh
    unset GIT_DIR # 这句十分重要，去除掉 git 的默认路径
    DEPLOY_PATH=/home/srv/www/
    cd $DEPLOY_PATH
    #你的部署脚本
    git fetch --all
    git reset --hard origin/master
  ```
1. 本地添加远程仓库
```
    git remote add origin ssh://git@some.test.com:/home/git/blog
```

### 备注
1. 本例只是一个简单的通过每次 git push 然后```www```文件夹拉取最新代码
1. 你可以参考 git hook 的相关信息，通过截取 commit message 来确定什么时候才执行部署操作
1. 你要有 ssh 登录权限才能执行 push 操作


[img1]: /images/post/tutorial/hook-deploy.png
