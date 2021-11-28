---
layout: archive
title: 归档
description: 统计博客文章数目以及按日期分类
keywords: 归档,博客
comments: true
menu: 归档
permalink: /archive/
---

{% for post in site.posts %}
    {% if post.categories[0] != site.private_name %}
        {% if post.repost %}
            {% assign repost_len = repost_len | plus: 1 %}
        {% else %}
            {% assign orpost_len = orpost_len | plus: 1 %}
        {% endif %}
    {% else %}
        {% assign prpost_len = prpost_len | plus: 1 %}
    {% endif %}
{% endfor %}

{% if site.private_show %}
    {% assign total_len = orpost_len | plus: repost_len | plus: prpost_len %}
{% else %}
    {% assign total_len = orpost_len | plus: repost_len %}
{% endif %}

> 目前共 {{ total_len }} 篇文章，其中「原创」{{orpost_len}} 篇，「转载」{{repost_len}} 篇{% if site.private_show %}，「加密」{{prpost_len}} 篇 {% endif %}

<section class="container posts-content">
{% for post in site.posts  %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
    {% if forloop.first %}
        <a id="year-{{ this_year }}"><h3>{{ this_year }}</h3></a>
    <ol>
    {% endif %}
    {% if site.private_show  or post.categories[0] != site.private_name %}
    <li class="posts-list-item">
				<span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
				<a class="posts-list-name" href="{{ post.url }}">{{ post.title }}
                {% if post.categories[0] == site.private_name %} 
                    「加密」 
                {% endif %} 
                </a>
    </li>
    {% endif %}
    {% if forloop.last %}
    </ol>
    {% else %}
        {% if this_year != next_year %}
        </ol>
        <a id="year-{{ next_year }}"><h3>{{ next_year }}</h3></a>
        <ol>
        {% endif %}
    {% endif %}
{% endfor %}
</section>

