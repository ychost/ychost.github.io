---
layout: post
title: Jenkins+Docker 持续集成
categories: [工具, 推荐]
description: 记录在使用 Jenkins 与 Docker 的配置过程，方便日后再来进行相关的配置
keywords: Jenkins, Docker, Maven, Java, Gogs, Dockerfile
tags: [Jenkins, Docker, 持续集成]
excerpt: 记录在使用 Jenkins 与 Docker 的配置过程，方便日后再来进行相关的配置
---

### 背景
Jenkins 部署流程

[![jenkins][img1]][img1]{:data-lightbox="jenkins"}

有了 jenkins 之后我们只需要 push 代码到仓库，后续的编译、测试、打包、启动服务等操作都是自动完成的。第 3-5 步骤可以自己写 Dockerfile 来执行这样可以任意变更执行的内容和结果。

注：
1. 关于 Jenkins，Docker  怎么安装不在本文的范围内，网上有很多教程自行搜索
2. 本文测试的时候 Jenkins 和 Docker 是装在同一个服务器的，如果非同一个服务器可以通过 SSH 插件解决


### Jenkins 配置 
#### 安装插件
系统管理 -> 插件管理 -> 可选插件 -> 直接安装
1. Maven Integration
1. Gogs plugin

[![jenkins][img4]][img4]{:data-lightbox="jenkins"}


#### 环境配置
系统管理 -> 全局工具配置
1. 配置好 JDK、Git、Maven 等路径
   [![jenkins][img3]][img3]{:data-lightbox="jenkins"}


### 创建任务
1. 新建任务->构建一个maven项目
   [![jenkins][img2]][img2]{:data-lightbox="jenkins"}
1. 源码管理 -> Git

   输入自己的代码仓库 URL 及登录的 Credentials
   [![jenkins][img5]][img5]{:data-lightbox="jenkins"}
   [![jenkins][img6]][img6]{:data-lightbox="jenkins"}
1. 构建触发器 -> Build when a change is pushed to Gogs

   这样每次 push 到 Gogs 仓库都会触发任务
   [![jenkins][img7]][img7]{:data-lightbox="jenkins"}

1. Gogs 仓库设置 Webhook
  [![jenkins][img8]][img8]{:data-lightbox="jenkins"}
  注意替换 url 中的域名和 taskName
  ```
    http://jenkins.xx.com/gogs-webhook?/?job=taskName
  ```

1. Build, PostSteps

   这里设置代码的构建命令和构建完成后执行的命令，第一个是普通 maven 项目的构建命令可以去查相关的构建参数含义，第二个是任务构建成功后执行的命令这里将执行命令的具体内容放到了<font color="red">代码根目录的 run.sh</font>
   [![jenkins][img10]][img10]{:data-lightbox="jenkins"}
   [![jenkins][img9]][img9]{:data-lightbox="jenkins"}
   ```bash
    clean install -D maven.test.skip=true
   ```
   ```bash
    #!/bin/bash
    chmod +x ./run.sh
    sudo ./run.sh
   ```

注：
1. 通过第 3、4 步设置那么每次的 push 都会触发 Webhook 进而触发 jenkins 的构建任务
1. 一般情况都是自己手工点构建，不需要通过 push 来触发从而可以避免不必要的构建任务
1. PostSteps 里面执行的是 run.sh 该文件在后面会有介绍

### 创建 Maven 项目
这里直接创建了一个简单的 SpringBoot 的项目，注意在根目录多加了一个 run.sh 和 Dockerfile，具体内容在 Dockerfile 段落中介绍

[![jenkins][img11]][img11]{:data-lightbox="jenkins"}


### Docker 私有仓库
上述步骤基本完成了 Jenkins 的配置，剩下的就是 Docker 方面的配置了。采用 Docker 私有仓库的原因是方便镜像的构建比如同一个内网中需要用到同一个镜像这样拉取速度就很快了而且可以任意的对镜像进行配置。

1. 拉取创建私有仓库必备的 registry，并创建容器
   ```bash
    docker run -itd -p 5000:5000 -v $PWD/data:/var/lib/registry --name registry registry
   ```
   注：这里是将当前目录下面的 ./data 目录用来挂载的，主要用来存自己的镜像文件

1. 修改 /etc/docker/daemon.json 因为没有配置 https 证书所以要直接放行，根据自己的 ip 来设置，这里只放行了本地 ip
   ```json
    { "insecure-registries":["localhost:5000"]}
   ```
1. 测试推送，假设本地已经有镜像 centos
   ```bash
    docker tag tomcat localhost:5000/centos
    docker push localhost:5000/centos
   ```
   注：通过修改本地镜像的 tag，tag 的格式必须是 url/xxx 才能进行正确的推送

1. 测试拉取镜像
   ```bash
    docker pull localhost:5000/centos
   ```

### Dockerfile
Dockerfile 语法很简单请参考 [dockerfile 介绍](https://www.cnblogs.com/boshen-hzb/p/6400272.html)
1. 基础镜像，替换为国内源的 Centos7，注意 localhost:5000/centos 来自于私有仓库
   ```dockerfile
    # base image is centos
    # replace repo to aliyun mirror
    FROM localhost:5000/centos

    RUN yum install -y wget && \
            cd /etc/yum.repos.d/ && \
            mv CentOS-Base.repo CentOS-Base.repo_bak && \
            wget -O CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo && \
            yum clean all && \
            yum makecache && \
            yum -y update

    ENTRYPOINT bash
   ```
   * 将文件命名为 Dockerfile 然后执行命令，注意最后有个 . 代表当前目录
     ```bash
        $ sudo docker build localhost:5000/base .
        # 提交到私有仓库 
        $ sudo docker push localhost:5000/base
     ```


1. JDK8 镜像，在基础镜像的基础上添加了 JDK 文件
   ```dockerfile
    FROM localhost:5000/base
    # 注 jdk1.8.0_181.tar.gz 要与 Dockerfile 同目录
    # ADD 命令会自动解压
    ADD jdk1.8.0_181.tar.gz /opt/

    ENV JAVA_HOME=/opt/jdk1.8.0_181
    ENV PATH=$JAVA_HOME/bin:$PATH

    ENTRYPOINT bash
   ```
   * 将 JDK 文件放到和 Dockerfile 同目录，注意名字，这里是 jdk1.8.0_181.tar.gz
   * 执行命令
     ```bash
        $ sudo docker build localhost:5000/jdk8 .
        # 提交到私有仓库
        $ sudo docker push localhost:5000/jdk8
     ```   

1. 编写工程的 Dockerfile，放在<font color="red">工程根目录</font>，注意 jar 文件名字
   ```dockerfile
    ############################################################
    # Dockerfile to build SpringBoot Installed Containers
    # Based on Centos
    ############################################################
    # 基础镜像 jdk8
    FROM localhost:5000/jdk8

    # 作者
    MAINTAINER ychost<ychost@outlook.com>

    # 添加编译结果到镜像里面
    ADD target/hello-0.0.1-SNAPSHOT.jar /opt

    # 暴露端口
    EXPOSE 8080

    # 容器启动后执行的命令
    ENTRYPOINT ["java" ,"-jar","/opt/hello-0.0.1-SNAPSHOT.jar"]
   ```

1. 编写工程的的入口脚本 run.sh，放在<font color="red">工程根目录</font>
   ```bash
    #!/usr/bin/env bash
    # 删除旧容器
    docker rm -vf helloContainer
    # 删除旧镜像
    docker rmi -f helloImage
    # 构建新镜像
    docker build -t helloImage .
    # 创建容器启动服务
    docker run -d -p 10236:8080 --name helloContainer helloImage
   ```

注：
1. 步骤 1、2 只是在私有仓库创建 base 镜像和 jdk8 镜像
1. 步骤 3、4 是自己工程的配置，可根据自己的项目来决定

### 测试
1. 将工程代码提交到 Gogs 仓库
1. Jenkins 会收到来自 Gogs Webhook 的通知自动构建任务，也可以自己手动在任务界面点击「构建」按钮
1. 点击「控制台输出」可以看到构建的明细

[![jenkins][img12]][img12]{:data-lightbox="jenkins"}
[![jenkins][img13]][img13]{:data-lightbox="jenkins"}

### 总结
1. 本文只是一个简单的通过 jenkins 配合 Docker 实现构建任务
1. 大部分的操作还是在于自己手工写 Dockerfile 来解决，当然你也可以选择其他 jenkins 插件来配置
1. 不单是 Maven 项目的构建，其它项目也可以通过 Jenkins 配置，去找找插件就行了
1. 可以通过配置里面的邮件通知，当任务部署后会自动通过邮件通知过来

[img1]: /images/post/tutorial/jenkins-process.png
[img2]: /images/post/tutorial/jenkins-1.png
[img3]: /images/post/tutorial/jenkins-2.png
[img4]: /images/post/tutorial/jenkins-3.png
[img5]: /images/post/tutorial/jenkins-4.png
[img6]: /images/post/tutorial/jenkins-5.png
[img7]: /images/post/tutorial/jenkins-6.png
[img8]: /images/post/tutorial/jenkins-7.png
[img9]: /images/post/tutorial/jenkins-8.png
[img10]: /images/post/tutorial/jenkins-9.png
[img11]: /images/post/tutorial/jenkins-10.png
[img12]: /images/post/tutorial/jenkins-11.png
[img13]: /images/post/tutorial/jenkins-12.png