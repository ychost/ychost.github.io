---
layout: post
title: 显示 VisualStudio 未被引用的文件
categories: [杂记]
description: 有时候复制一个文件夹到 VS 的一个目录下面但是 VS 仅仅显示该文件夹而文件夹中的文件是不显示的
keywords: Visual Studio, show all files
tags: [VS, Files]
---
　　有时候复制一个文件夹到 VS 的一个目录下面但是 VS 仅仅显示该文件夹而文件夹中的文件是不显示的，但是该项目所在的路径里面是包含这些文件的只是 VS 没有添加到工程里面来而已。

1. 背景介绍

    > 这里以 VisualStudio2015 为例来说明如何正确加载复制到 VS 中的文件夹

    > 我向 VS 复制了一个名为 test 的文件夹，里面包含了一个test.js的文件，但是很明显可以看出 VS 是没有包含这个文件到项目中去的

    [![vs-copy-folder][img1]][img1]{:data-lightbox="show-vs-files"}


2. 点击「解决方案」上面的「显示所有文件」

3. 之前没有显示的 test.js 文件也显示出来了但是是黑色的，这里只需要点击右键，然后选择<br/>「包括在项目中(J)」就可以了

	[![vs-include-files][img2]][img2]{:data-lightbox="show-vs-files"}


[img1]: /images/post/windows/vs-copy-folder.jpg
[img2]: /images/post/windows/vs-include-files.jpg
