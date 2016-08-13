---
layout: category
description: 哈哈，你找到了我的文章基因库
keywords: 同一类文章
comments: true
menu: 同一类文章
permalink: /category/
---

<section class="container posts-content">
	{% assign sorted_categories = site.categories | sort %}
	{% for category in sorted_categories %}
	{% if  (site.private_show) or category[0] != "private" %}
	<a href="sss"><h3>{{ category | first }}</h3></a>
	<ol class="posts-list" id="{{ category[0] }}">
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
