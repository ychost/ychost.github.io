---
layout: post
title: C51 混合式调度器
categories: [嵌入式, 推荐]
description: 在MCU利用调度器可以极大地提高程序的执行效率，保证程序的时序关系以及可以降低单片机的功耗
keywords: C51, 合作式调度器, 抢占式调度器, 混合式调度器
tags: [C51,dispatcher]
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

* #### 目录结构

  ```
─Sources
    │  HybSCH.c            // 调度器源文件
    │  Main.c              // 主文件
    │  PreMacro.c          // 预先定义常用一些常用函数，print, delay_ms 等等
    │  
    └─Headers
            HybSCH.h       //调度器头文件
            PreMacro.h     // 宏文件
  ```

* #### 使用调度器

    　　这是一个很简单的例子，实现了 LED 的两种不同的闪烁功能，可以看见当使用了调度器之后再也不需要将所有的任务放入一个大的 {% ihighlight c %} while(true) {% endihighlight %}中去执行了，这里只需要将任务加入到调度器的队列中去，然后单片机会自动扫描并执行，并且任务触发的时间是十分精确的

  ```c
    #include "./Headers/PreMacro.h"
    #include "./Headers/HybSCH.h"

    //记得在 HybSCH 中去设置 SCH_MAX_TASKS 

    //用于 IO 互锁
    #define LOCKED (bit)1
    #define UNLOCKED (bit)0
    #define LED_PORT P1

    sbit LED = P1 ^ 0;
    static bit led_lock = UNLOCKED;

    void led_short_flash(void){
        if(led_lock == LOCKED){
            return;
        }
        led_lock = LOCKED;
        LED = ~LED;
        led_lock = UNLOCKED;
    }

    void led_long_flash(void){
        static u8 i = 0;
        if(led_lock==LOCKED){
            return;
        }
        led_lock = LOCKED;
        for(i=0;i<3;++i){

            LED_PORT = 0xf0;
            hard_delay_ms(500);
            LED_PORT = 0x0f;
            hard_delay_ms(500);
        }
        led_lock = UNLOCKED;
    }

    void main(void)
    {
        //初始化调度器使用的定时2
        hsch_init_timmer2();
        
        //led_short_flash 以抢占方式运行，周期一秒
        hsch_add_task(led_short_flash,0,1000,0);

        //led_long_flash 以合作方式运行，周期20秒
        hsch_add_task(led_long_flash, 0, 20000, 1);
        
        //启动调度器
        hsch_start();
        while(true)
        {
            hsch_dispatch_tasks();
        }
    }
  ```

* ####  实现调度器

    * 宏定义 PreMacro.h
	
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


* 任务结构体 

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

*  函数声明

   ```c 
    #ifndef __HYBIRD_SCH_H_
    #define __HYBIRD_SCH_H_
 
    void hsch_dispatch_tasks(void);                 //派遣任务
    u8   hsch_add_task(Action,  u16,  u16,  u8);    //添加任务
    bool  hsch_delete_task(const u8);               //删除任务
    void hsch_init_timmer2 (void);                  //初始化定时器
    void hsch_start(void);                          //调度器开始
    void hsch_report_status(void);                  //报告调度器状态

    #endif
   ```

*  {% ihighlight c %} void hsch_dispatch_tasks(void) {% endihighlight %} 派遣任务

   ```c 
   /**
     * 扫描任务集合并执行
    */
    void hsch_dispatch_tasks(void)
    {
        u8 i = 0;
        for(i = 0; i < SCH_MAX_TASKS; ++i)
        {
            if(hsch_tasks[i].runme > 0 && hsch_tasks[i].co_cp)
            {
                hsch_tasks[i].func();
                --hsch_tasks[i].runme;
                            
                if(hsch_tasks[i].period == 0)
                {
                    hsch_delete_task(i);
                }
            }
        }
        hsch_report_status();
        hsch_to_sleep();
    }
   ```

*  {% ihighlight c %}u8 hsch_add_task(Action func,  u16 delay,  u16 period,  u8 co_cp){% endihighlight %} 添加任务


   ```c
   /**
     * 添加任务
     * @param  func   任务函数
     * @param  delay  首次执行延时
     * @param  period 周期执行间隔
     * @param  co_cp  合作/抢占标志
     * @return        任务ID [用于删除任务]
     */
    u8 hsch_add_task(Action func,  u16 delay,  u16 period,  u8 co_cp)
    {
        u8 i = 0;
        while((hsch_tasks[i].func != NULL) && (i < SCH_MAX_TASKS))
        {
            ++i;
        }
        if(i == SCH_MAX_TASKS)
        {
            hsch_error_code = ERROR_SCH_TOO_MANY_TASKS;
            return SCH_MAX_TASKS;
        }
        hsch_tasks[i].func = func;
        hsch_tasks[i].delay = delay;
        hsch_tasks[i].period = period;
        hsch_tasks[i].co_cp = co_cp;
        hsch_tasks[i].runme = 0;
            
        return i;
    }
   ```


*  {% ihighlight c %}  void hsch_update(void) interrupt TIMMER2_ITRP {% endihighlight %} 更新调度器

   ```c 
   /**
     * 更新调度器，周期由T2设置
     */
    void hsch_update(void) interrupt TIMMER2_ITRP
    {
        u8 i = 0;
        TF2 = 0;
        for(i = 0; i < SCH_MAX_TASKS; ++i)
        {
            if(hsch_tasks[i].func )
            {
                if(hsch_tasks[i].delay == 0)
                {
                     //若是合作式则在中断中只置位,等待到hsch_dispatch_tasks中去执行
                    if(hsch_tasks[i].co_cp)
                    {
                        ++hsch_tasks[i].runme;
                    }
                     //若是抢占方则在中断中执行该函数
                    else
                    {
                        hsch_tasks[i].func();
                        hsch_tasks[i].runme -= 1;
                        if(hsch_tasks[i].period == 0)
                        {
                            hsch_tasks[i].func = NULL;
                        }
                    }
                    //如果是周期执行则将周期间隔赋予下次执行的延时
                    if(hsch_tasks[i].period)
                    {
                        hsch_tasks[i].delay = hsch_tasks[i].period;

                    }

                }
                //延时计算
                else
                {
                    --hsch_tasks[i].delay;
                }
            }

        }
    }

   ```

*  {% ihighlight c %}  void hard_delay_ms(const u16 t) {% endihighlight %} 硬件延时函数

   ```c
   /**
     * 硬件延时,T0作为该延时的时钟源
     * @param t 延时的毫秒数
     */
    void hard_delay_ms(const u16 t){
        u16 ms;
        TMOD &= 0xf0;
        TMOD |= 0x01;
        ET0 = 0;
        for(ms=0;ms<t;++ms){
            TH0 = 0XFC;
            TL0 = 0X18;
            TF0 = 0;
            TR0 = 1;
            while(TF0 == 0);
            TR0 = 0;
        }
    }
   ```

以上是一些基础的函数的实现，具体的 DEMO 到 [HybSCH][href1] 下载
    
> 此工程是基于 Keil5 的

[href1]: https://github.com/ychost/HybSCH