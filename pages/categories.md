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
	{% if  (site.private_show) or category[0] != site.private_name %}
	<a href="detail?cat={{ category | first | url_encode   }}" class="cats-hylink"><h3>{{ category | first }}</h3></a>
	<ol class="posts-list" id="{{ category[0] }}">
		{% for post in category.last | limit: site.cat_brif_repo_limit %}

		<li class="posts-list-item">
		<span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
		<a class="posts-list-name" href="{{ post.url }}">{{ post.title }}</a>
		</li>

		{% endfor %}
		
		{% if category[1].size > site.cat_brif_repo_limit %}
		<li class="posts-list-item">
			<a href="detail?cat={{ category | first | url_encode   }}" class="cats-hylink posts-list-name">　<span class="posts-list-meta">More</span>
	　·　·　·　·　·　·　·　　</a>
		</li>
		{% endif %}
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