---
layout: post
title: docker 实用教程
categories: [工具]
description: 主要介绍常用的 docker 命令 
keywords: docker 
tags: [Docker]
---
## docker 镜像加速
推荐[阿里云镜像加速][href1]，登录后即可获得自己的镜像加速设置命令粘贴到命令行即可

## 获取镜像
```
    docker pull ubuntu
```
这里获取了一个 ubuntu 的镜像，更多镜像请到 [docker hub][href2] 上面去搜索

## 运行容器
```
    docker run -d --name server -p 80:8081 -v $PWD/html:/mnt ubuntu
``` 

这里在 后台 运行了一个名称为 server 的 ubuntu 容器且将容器内部的 8081 端口暴露在外部为 80 端口以及将当前目录下面的 /html 目录挂载到了容器内部的 /mnt 目录

## 进入容器
这里推荐用 ```docker-ener```
```
wget -P ~ https://github.com/yeasy/docker_practice/raw/master/_local/.bashrc_docker;
echo "[ -f ~/.bashrc_docker ] && . ~/.bashrc_docker" >> ~/.bashrc; source ~/.bashrc
```

使用方法：
```
    docker-enter <container>
    比如：
    docker-enter server
```

## 导出容器快照
```
    sudo docker export <container> > something.tar
    比如：
    sudo docker export server > server.tar
```
注： 这里导出的容器是不包含数据层的，比如你导出了一个 mysql 容器然后导入后发现里面的数据库没有数据是因为导出的时候不包含数据层，docker 的数据层设计比较特殊详情你参考官方文档。

## 导入容器快照
```
    sudo cat server.tar | docker import - server
```
注：用户既可以使用 docker load 来导入镜像存储文件到本地镜像库，也可以使用 docker import 来导入一个容器快照到本地镜像库。这两者的区别在于容器快照文件将丢弃所有的历史记录和元数据信息（即仅保存容器当时的快照状态），而镜像存储文件将保存完整记录，体积也要大。此外，从容器快照文件导入时可以重新指定标签等元数据信息。
    
## 数据备份
使用 --volumes-from 标记来创建一个加载备份数据的容器，并从主机挂载当前目录到容器的 /backup 目录。命令如下：

```
sudo docker run --volumes-from server -v $(pwd):/backup ubuntu 
tar cvf /backup/backup.tar /server/data
```
这里将 server 容器的 /server/data 目录压缩到了当前目录的 ./backup/backup.tar 文件中

## 数据恢复
1. 如果要恢复数据到一个容器，首先创建一个带有空数据卷的容器 dbdata。

    ```
sudo docker run -v /dbdata --name dbdata ubuntu /bin/bash
    ```

2. 然后创建另一个容器，挂载 dbdata 容器卷中的数据卷，并使用 untar 解压备份文件到挂载的容器卷中。
```
sudo docker run --volumes-from dbdata -v $(pwd):/backup ubuntu 
tar xvf /backup/backup.tar
```

3. 为了查看/验证恢复的数据，可以再启动一个容器挂载同样的容器卷来查看
```
sudo docker run --volumes-from dbdata ubuntu /bin/ls /dbdata
```



[href1]: https://account.aliyun.com/login/login.htm?oauth_callback=https%3A%2F%2Fcr.console.aliyun.com%2F&lang=zh#/accelerator

[href2]: https://hub.docker.com/
