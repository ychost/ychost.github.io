---
layout: post
title: linux 翻墙终极版
categories: [系统,推荐]
description: Lnux下面如果不翻墙那还要Linux干啥呢，软件下不了，问题搜不了只能天天看百度新闻，那还不如退回windows玩儿游戏呢
keywords: Lnux,翻墙,shadowsocks,privoxy
tags: [Linux,Shadowsocks,Privoxy]

---
本教程使用了shadowskcs和privoxy，可以让linux的终端和浏览器同时翻墙

## 总览
1. 注册[一枝红杏][href1]账号
2. 安装[Shadowsocks-qt5][href2]并配置
3. 安装[Privoxy][href3]并配置
4. 测试效果

## 购买[一枝红杏][href1]{:target="_blank"}的SS套餐
>   [一枝红杏][href1]{:target="_blank"}是的一家shadowsocks服务提供商，一年的价格为99元，经测试速度还不错在youtube上面可以流畅观看1080P的视频，当然你也可以选择其它的shadowsocks服务提供商

1. 点开[一枝红杏][href1]{:target="_blank"}并点击订购服务
   [![hx-home-page][img1]][img1]{:data-lightbox="fq-in-linux"}
2. 点击标准型套餐并订购
    [![hx-subscribe-page][img2]][img2]{:data-lightbox="fq-in-linux"}
3. 添加到购物车，输入密码，此密码为shadowsck客户端连接需要用到的
    [![hx-add-shopping-car][img3]][img3]{:data-lightbox="fq-in-linux"}
4. 填入页面下的促销代码，然后点击验证，最后点击结账
    [![hx-checkout][img4]][img4]{:data-lightbox="fq-in-linux"}
5. 弹出注册界面，填好相关信息并注册
    [![hx-register][img5]][img5]{:data-lightbox="fq-in-linux"}
6. 点击账单界面的支付宝付款，然后进行付款
    [![hx-pay-off][img6]][img6]{:data-lightbox="fq-in-linux"}
7. 进入我的SS账号->管理账号->查看详情就可以看见刚刚购买SS套餐详情了
    [![hx-account-info][img7]][img7]{:data-lightbox="fq-in-linux"}

## 安装[Shadowsocks-qt5][href2]
安装过程请参考Shadowsocks-qt5的官方[wiki][href4]

```
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```


### 装好后的效果
[![ssqt5-client-gui][img8]][img8]{:data-lightbox="fq-in-linux"}

## 配置[Shadowsocks-qt5][href2]
1. 打开刚刚购买的[一枝红杏][href1]SS套餐详情界面，并点击新加坡节点（新加坡的速度相对比较快）的二维码按钮，然后就会弹出SS配置二维码
[![hx-qr-code][img9]][img9]{:data-lightbox="fq-in-linux"}

1. 打开Shadowsocks-qt5软件，然后点击链接->添加->扫描屏幕上的二维码，出现配置界面然后点击OK，然后点击连接

    [![ss-config][img10]][img10]{:data-lightbox="fq-in-linux"}

1. 打开网络设置并设置代理我这里是deepin的发行版，不同发行版的操作界面可能不大一样，注意这里用的是自动代理指向的是一个pac文件用于实现局部翻墙，我这里已经生成了一个pac文件有需要的自行[下载][file1]，当然也可以自己用工具根据gfwlist.txt生成最新的pac文件
    [![deepin-proxy-setting][img11]][img11]{:data-lightbox="fq-in-linux"}

1. 点击应用到整个系统，然后测试是否能打开[Google][href5]

    [![google.com][img12]][img12]{:data-lightbox="fq-in-linux"}

1. 此时浏览器已经可以翻墙了，但是终端还是不行，因为我们走的时候Socks5的代理，然而终端要走http的代理，所以需要使用[Privoxy][href3]来实现对其桥接

## 安装配置[Privoxy][href3]
```
sudo apt-get install privoxy
```
1. 打开配置文件 /etc/privoxy/config

    ```
    sudo vim /etc/privoxy/config
    ```
  [![google.com][img13]][img13]{:data-lightbox="fq-in-linux"}

    找到forward-socks5（如果是forward-socks5t改成forward-socks5） 并将后面的值改成 127.0.0.1:1080，将http代理到socks5

1. 重启privoxy
    ```
    sudo service privoxy restart
    ```

1. 配置终端的代理，8118端口是默认端口，可以在config里面修改，测试wget去访问google发现终端已经翻墙了
    ```
    export http_proxy=http://127.0.0.1:8118/
    export https_proxy=http://127.0.0.1:8118/
    wget www.google.com
    ```
  [![terminal-http-proxy][img14]][img14]{:data-lightbox="fq-in-linux"}

1. 这只是临时修改了代理的环境变量，重启终端会丢失的，所以可以将这两个环境变量配置在 ~/.bashrc 里面这样就始终有效了，但是由于是全局翻墙的所以这样会导致访问国内的服务很慢，所以还是设置临时翻墙比较好，当然 privoxy也是支持类似于pac那种局部翻墙的，但是语法上稍有区别，可以参考[Privoxy 简明教程][href6]

### 总结
  　　 Linux下面的全局翻墙设置很麻烦，不像windows或者mac在shadowsocks里面勾选全局翻墙就行了，一般来说浏览器翻墙就行了，当遇到npm或者gem，gradle在终端编译不过的时候一般都是被墙了，所以需要里面privoxy来设置代理转发给socks5实现翻墙
    

[href1]: http://order.yizhihongxing2018.com/aff.php?aff=1943
[href2]: https://github.com/shadowsocks/shadowsocks-qt5
[href3]: http://www.privoxy.org/
[href4]: https://github.com/shadowsocks/shadowsocks-qt5/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97
[href5]: https://google.com
[href6]: https://www.zfanw.com/blog/privoxy-tutorial.html

[img1]: /images/post/tutorial/hx-home-page.png
[img2]: /images/post/tutorial/hx-subscribe-page.png
[img3]: /images/post/tutorial/hx-add-shopping-car.png
[img4]: /images/post/tutorial/hx-checkout.png
[img5]: /images/post/tutorial/hx-register.png
[img6]: /images/post/tutorial/hx-pay-off.png
[img7]: /images/post/tutorial/hx-account-info.png
[img8]: /images/post/tutorial/ssqt5-client-gui.png
[img9]: /images/post/tutorial/hx-qr-code.png
[img10]: /images/post/tutorial/ss-config.png
[img11]: /images/post/tutorial/deepin-proxy-setting.png
[img12]: /images/post/tutorial/google.com.png
[img13]: /images/post/tutorial/vim-privoxy-config.png
[img14]: /images/post/tutorial/terminal-http-proxy.png


[file1]: /files/autoproxy.pac
