---
layout: post
title: 在 Jekyll 中 使用 Markdown 画流程图
categories: [工具, 推荐]
description: 传统的 Markdown 是不支持画流程图的，但是可以引用第三方的库来扩展 Markdown 的能力，本文才用了将 Jekyll-Mermaid 插件引入到站点中，从而实现了以 Markdown 的语法画出「优雅」流程图。
keywords: Jekyll, Markdown, FlowChart
tags: [Markdown, FlowChart]
---

　　平时在写博客的时候，需要用到流程图的时候一般都是才用 VISIO 等软件绘制好了之后，然后截图贴在自己的文章里面，这样做虽然简单但是显得不够「优雅」而且文章当中图片过多会大大增加流量的消耗，降低了阅读者的体验。基于此种情况，最好的方式当然是利用 JavaScript 以原生的方式来绘制流程图，虽然类似的插件很多但是用 JS 语法在 Markdown 中书写流程图似乎感觉不是那么的和谐，所以本文采取了一种「优雅」的方式来原生绘制流程图的方法

* 使用到的插件

> [Mermaid][href1], [Jeyll-Mermaid][href2]

### 效果图

---

<table>
<thead>
    <th>
        Code
    </th>
    <th>
        Chart
    </th>
</thead>
<tbody>
    <tr>
        <td style="width:50% !important">
             <pre style="padding:0px">
            <code style="padding:0px">
{% raw %} 
{% mermaid %} 
graph TD
    B["fa:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?);
{% endmermaid %}
{% endraw %}
            </code>
            </pre>           
         </td>
         <td>
            {% mermaid %} 
             graph TD
                B["fa:fa-twitter for peace"]
                B-->C[fa:fa-ban forbidden]
                B-->D(fa:fa-spinner);
                B-->E(A fa:fa-camera-retro perhaps?);
            {% endmermaid %} 
        </td>
    </tr>
</tbody>
</table>
<br/>
<br/>
　　可以很清楚的看见，使用了类似于代码高亮 {% raw %} {% highlight %}//some code{% highlight %} {% endraw %} 的风格写出了流程图，此插件不仅仅支持流程图，其它的比如 甘特图、时序图 等等它都支持的，具体的用法请查看 mermaid 的 API。

### 使用教程

---

* 下载 [Mermaid][href1], [Jeyll-Mermaid][href2] 两个插件到本地

* 将 Jekyll-Mermaid 文件夹下面的 /lib/jekyll-mermaid.rb 复制到 Jekyll 目录下面的 _plugins 文件夹中

* 将 Mermaid/dist 文件夹下面的 mermaid.min.js, mermaid.css, mermaid.forest.css 文件复制到 assets 的 js 和 css 等文件夹中

* 在 _config.yml 添加如下配置

  ```yml
   mermaid:
     src: /Path/To/mermaid.min.js
  ```
* 在 header.html 中添加 mermaid 的样式文件引入，<font color="red">注意路径</font>

  ```html   
  <link rel="stylesheet" href="/Path/To/mermaid.css">
  <link rel="stylesheet" href="/Path/To/mermaid.forest.css">
  ```
* 现在就可以在文章当中流畅地画图了，记得添加 {% raw %} {% mermaid %} {% endmermaid %} {% endraw %} 标签，具体的语法和 API 请看 [Mermaid][href1] 的 ReadMe.md

[href1]: https://github.com/knsv/mermaid
[href2]: https://github.com/jasonbellamy/jekyll-mermaid