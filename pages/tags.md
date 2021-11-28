---
layout: tags
title: 标签
description: 标签云
keywords: 友情链接
comments: true
menu: 标签
permalink: /tags/
---

{% assign tag_size = site.tags.size %}
{% if site.private_show == false %}
    {% assign tag_size = tag_size | minus:1 %}
{% endif %}

> 嗯，目前共 {{ tag_size }} 个标签，继续努力

<div id="tags-cloud"></div>
<section class="container posts-content">
	{% assign sorted_tags= site.tags | sort %}
	{% for tag in sorted_tags %}
    {% if site.private_show  or tag.first != site.private_name %}
        <a id="tag-{{tag.first}}"><h3>{{ tag | first }}</h3></a>
        <ol>
        {% for post in tag.last %}
                <li class="posts-list-item">
                    <span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
                    <a class="posts-list-name" href="{{ post.url }}">{{ post.title }}</a>
                </li>
        {% endfor %}
        </ol>
    {% endif %}
    {% endfor %}
</section>


<script>
$(function(){
    var words = [
        {% for tag in site.tags %}
            {% if site.private_show  or tag.first != site.private_name %}
                {
                text:"{{tag.first}}",
                link:"#tag-{{tag.first}}"
                },
            {% endif %}
        {% endfor %}
    ];
    for (var w of words){
        w.weight = Math.random()* 200;
    }
    $("#tags-cloud").jQCloud(words,{
        width: 900,
        height:500
    });
});
 </script>