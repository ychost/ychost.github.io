---
layout: categories
title: 分类
description: 哈哈，你找到了我的文章基因库
keywords: 分类
comments: false
menu: 分类
permalink: /categories/
---

<section class="container posts-content">
	{% assign sorted_categories = site.categories | sort %}
	{% for category in sorted_categories %}
	{% if  site.private_show  or category[0] != site.private_name %}
	<div  id="cat-{{ category[0] }}"><h3>{{ category | first }}</h3></div>
		<ol>
		{% for post in category.last %}
			<li class="posts-list-item">
				<span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
				<a class="posts-list-name" href="{{ post.url }}">{{ post.title }}</a>
			</li>
		{% endfor %}
		</ol>
	{% endif %}
	{% endfor %}
</section>
<!-- /section.content -->
<script>
(function(blog){
	blog.encodeHylinks($(".cats-hylink"));
}(blog));
</script>