---
layout: page
title: About
description: code is life
keywords: ychost，夏天
comments: true
menu: 关于
permalink: /about/
---

我是夏天，一个小小的码农。

为了记录一些笔记，发现还是博客最实在


## 标签

* 码农
* 机电
* 学生
* naive

## 联系

* GitHub：[@ychost](https://github.com/ychost)
* 博客：[{{ site.title }}]({{ site.url }})
* 微博: [@ychost-wb](http://weibo.com/ychost-wb)

## 技能

#### 语言
<div class="btn-inline">
    {% for keyword in site.skill_software_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>

#### 平台开发
<div class="btn-inline">
    {% for keyword in site.skill_mobile_app_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>

#### Windows 开发
<div class="btn-inline">
    {% for keyword in site.skill_windows_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>
