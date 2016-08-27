---
layout: post
title: C51 混合式调度器
categories: [MCU]
description: 在MCU利用调度器可以极大地提高程序的执行效率，保证程序的时序关系以及可以降低单片机的功耗
keywords: C51, 合作式调度器, 抢占式调度器, 混合式调度器
tags: [C51, despathcer]
---

　　突然发现有段时间没有写博客了，这些日子都在忙一些其他的事情所以博客就被耽搁了，但是已经起草了 6 篇左右的文章了，等开学了就慢慢补上。
<br/>
　　虽然这几个月来都没有碰过单片机了，可能以后也不会走嵌入式这个方向了，所以这里将之前学过的单片机相关的一些东西做一个总结，这里是这个系列的第一章 「C51 混合式调度器」


### 什么是调度器

　　我对时间触发方式的调度器的理解就是：将一系列需要执行的任务放入到队列中去，MCU 不断扫描这个队列，当某个任务的标志为 「执行」状态的时候那么这个任务就被 MCU 执行，然后 MCU 继续对队列进行扫描或者进入休眠状态达到低功耗的状态，其中任务的标志是通过 MCU 的定时器中断或者外部中断来进行更新的。

#### 调度器分类

   > 调度器一般分为三种：合作式调度器、抢占式调度器、混合式调度器

   > 合作式调度器是基于时间先后的顺序来执行的，任务严格按先后顺序执行

   > 抢占式调度器是基于任务优先级的，高优先的任务可以打断低优先级的任务获得执行的权利

   > 混合式调度器是合作式调度器和抢占式调度器的综合体，支持<font color="red">多个合作式</font>的调度任务和<font color="red">一个抢占式</font>的调度任务

#### 为什么选择混合式调度器

　最主要的原因是 C51 的性能的限制，对于抢占式调度器在 C51 上面实现有一定的难度而且抢占式调度器本身的可靠性是比较低的，所以为了降低实现的难度和增加系统的可靠性选择了 「混合式调度器」




### 程序设计

####  宏和结构体定义

1. 宏定义
	
	注意 {% ihighlight c %} typedef void (code *Action)() {% endihighlight %} 这个是一个返回类型为 	{% ihighlight c %} void {% endihighlight %} 的函数指针类型的定义，由于它不需要更改所以索性定义到了 	{% ihighlight c %} code {% endihighlight %} 区域，取名的 	{% ihighlight c# %} Action {% endihighlight %} 的原因是因为借鉴了 C# 的 	{% ihighlight C# %} Aciton {% endihighlight %} 委托

   ```c 
	#ifndef __PREMACRO_H_
	#define __PREMACRO_H_

	#ifndef DEBUG
		#define DEBUG
	#endif

	#include <at89x52.h>

	typedef unsigned char u8;
	typedef unsigned int  u16;
	typedef unsigned long u32;
	typedef bit bool;
	typedef void (code *Action)();

	#ifndef true
		#define true 1
		#define false !true
	#endif
		
	#define NULL 0
	#define EXTERNAL0_ITRP 0
	#define TIMMER0_ITRP   1
	#define EXTERNAL1_ITRP 2
	#define TIMMER1_ITRP   3
	#define UART_ITRP      4
	#define TIMMER2_ITRP   5

	#define OSC_FREQ (12000000UL)
	#define OSC_PER_INST (12)

	#define RETURN_NORMAL (bit) 0
	#define RETURN_ERROR (bit) 1

	#ifdef DEBUG
		void printf_init(void);
	#endif

	#endif
   ```


2. 任务结构体

	这个是个合作式调度器的任务结构体，可以很明显看到一个任务需要具备的元素有四个

	* {% ihighlight c %} task_ptr {% endihighlight %} 任务需要执行的函数 

	* {% ihighlight c %} delay {% endihighlight %} 起始运行时间，单片机首次执行该任务需要的延时

	* {% ihighlight c %} period {% endihighlight %} 任务执行的周期时间，即每隔一个周期时间该任务执行一次

	* {% ihighlight c %} runme {% endihighlight %} 这是任务的执行标志，其值为该任务需要执行的次数，系统主要扫描这个标志，如果该标志大于 0 那么就执行任务，执行一次该标志减 1 直到该标志的值为 0 才认为这个系统周期中该任务执行完毕

   ```c
   /**
 * 任务结构体
 * @filed task_ptr  原型为void Action(void)的一个函数指针
 * @filed delay     起始运行时间
 * @filed period    周期运行时间间隔
 */
typedef data struct
{
    Action task_ptr;
    u16 delay;
    u16 period;
    u8 runme;
} sTask;
   ```


#### 相关函数

1. 全局变量定义

   ```c 
	//所有的调度任务
	sTask sch_tasks[SCH_MAX_TASKS];

	//错误代码
	u8 sch_error_code = 0;

	//进入休眠
	static void sch_to_sleep(void);

	//控制错误显示的时间
	static u16 error_tick_count;

	//用于比较是否有新的错误产生
	static u8 last_error_code;
   ```