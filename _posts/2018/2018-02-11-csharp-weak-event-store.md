---
layout: post
title: C# 事件总线（弱订阅）
categories: [桌面]
description: 基于 WeakEventManager 的一种事件总线模式的实现，在 WPF 中使用尤为方便，摒弃掉传统的各种 Service 注入，将程序的架构做成响应式的。 
keywords: C#,WeakEventStore
tags: [C#,WeakEvent,WPF]
excerpt: 基于 WeakEventManager 的一种事件总线模式的实现，在 WPF 中使用尤为方便，摒弃掉传统的各种 Service 注入，将程序的架构做成响应式的。
---
#### 普通订阅
对于 C# 而言实现消息订阅尤为简单，只需要简单的使用委托即可，比如：

```c#
public class Subscriber1{
    public Action<string> actions;

    public Action AddListener(Action<string> action){
        actions += action;
        return ()=>{
            actions -= action;
        };
    }

    public void Raise(string message){
        actions?.Invoke(message);
    }

    public void Test(){
        var rmLsr = AddListener(msg=>{
                Console.WriteLine("test received message: "+msg);
        });
        Raise("Hello world");
        rmLsr();
        Raise("Goodbay");
        //output:
        //test received message: Hello worl
    }
}
```
#### 弱订阅
上述的 ```AddListener``` 为强引用，即被引用的 ```action``` 如果为某一对象的属性，那么该对象就会被 ```EventSouce``` 强引用了，即使将被引用的对象置空也不能使之被回收掉，所以这里需要自己手动取消订阅即 ```rmLsr()```，在 .Net4.5 以上的版本引入了 ```WeakEventManager<TSource,TArags>``` 实现对事件的弱引用。上面的版本改进如下：  
> 弱订阅就必须使用 event 且格式必须是 ```Action<object,EventArgs>``` 这种 Windows 编程常用的事件触发模式，相对繁琐，不过也很简单  

```c#
   /// <summary>
    /// event 模式的事件源
    /// </summary>
    public class SubEventSource : EventSource {
        public event Action<object, SubEventArgs> Event;

        public void Raise(SubEventArgs args) {
            Event?.Invoke(this, args);
        }
    }

    /// <summary>
    /// event 模式的事件参数
    /// </summary>
    public class SubEventArgs : EventArgs {
        public object Data;
    }

    public class Subscriber2 {
        /// <summary>
        /// 事件源
        /// </summary>
        private readonly SubEventSource evnetSource = new SubEventSource();
        /// <summary>
        /// 添加订阅，可不必手动取消
        /// </summary>
        /// <param name="handler"></param>
        /// <returns></returns>
        public Action AddListener(EventHandler<SubEventArgs> handler) {
            //注意第二个参数，该订阅使用的反射通过字符串去找到 evnetSource.Event 这个事件
            WeakEventManager<SubEventSource, SubEventArgs>.AddHandler(evnetSource, 
                nameof(evnetSource.Event), handler);
            //手动取消订阅
            return () => {
                WeakEventManager<SubEventSource, SubEventArgs>.RemoveHandler(evnetSource, 
                 nameof(evnetSource.Event),
                    handler);
            };
        }
        /// <summary>
        /// 测试自动取消订阅
        /// </summary>
        public void Test() {
            var handler = new TestHandler();
            AddListener(handler.Handle);
            evnetSource.Raise(new SubEventArgs() { Data = "hello" });
            handler = null;
            //垃圾回收
            GC.Collect();
            GC.WaitForFullGCComplete();
            evnetSource.Raise(new SubEventArgs() { Data = "world" });
            //output:
            //hello
        }

        /// <summary>
        /// 事件处理方
        /// </summary>
        public class TestHandler {
            public void Handle(object sender, SubEventArgs args) {
                Console.WriteLine(args?.Data?.ToString());
            }
        }
    }
```
#### 事件总线
基于上述的事件弱订阅模式，这里实现了一个消息总线，在 WPF 中使用起来尤为方便，从此不再需要各种 Service 注入，只需要简单的 Subscribe/Dispatch 就行了  
>各个订阅者依赖于 Payload 的 Type 来区分各个事件，类似于 MvvmLight 的 Messenger 

__使用：__  
```c#
public class Cmd {
    public string Data;
}

public class App {
    public static readonly YEventStore EventStore = new YEventStore();
    public static void Main(string args[]){
       EventStore.Subscribe(typeof(Cmd),(s,e)=>{
            var cmd = e.Payload as Cmd;
            Console.WriteLine(cmd.Data);
        })
       EventStore.Dispatch(new Cmd(){Data="hello"});
    }
}

```

__实现：__

```c#
    public delegate void Unsubscibe();
    /// <summary>
    /// 事件总线模式的一种实现
    /// [x] 使用的是 WeakEvent ，支持（手动/自动）取消订阅
    /// [x] 所有操作都是同步的，所以注意每个操作不要耗费太时间和死锁问题
    /// <author>ychost</author>
    /// <date>2018-2-10</date>
    /// </summary>
    public class YEventStore {
        /// <summary>
        /// 所有操作上的锁
        /// </summary>
        private readonly object locker = new object();
        /// <summary>
        /// 所有事件源代
        /// </summary>
        private readonly IDictionary<Type, YEventSource> eventSource;
        /// <summary>
        /// 最近 Dispatch 的对象
        /// </summary>
        private object latestPayload;
        /// <summary>
        /// 初始化
        /// </summary>
        public YEventStore() {
            eventSource = new Dictionary<Type, YEventSource>();
        }

        /// <summary>
        /// 派遣事件
        /// </summary>
        /// <param name="payload"></param>
        public void Dispatch(object payload) {
            if (payload == null) {
                return;
            }
            var type = payload.GetType();
            lock (locker) {
                latestPayload = payload;
                if (eventSource.TryGetValue(type, out var source)) {
                    StackTrace trace = new StackTrace();
                    StackFrame frame = trace.GetFrame(1);
                    source.CallFrame = frame;
                    source.RaiseEvent(new YEventArgs(payload));
                }
            }
        }

        /// <summary>
        /// 单一订阅
        /// </summary>
        /// <param name="actionType"></param>
        /// <param name="handler"></param>
        /// <param name="useLatestPayload"></param>
        /// <returns></returns>
        public Unsubscibe Subscribe(Type actionType, EventHandler<YEventArgs> handler,
                                    bool useLatestPayload = true) {
            lock (locker) {
                if (!eventSource.ContainsKey(actionType)) {
                    eventSource[actionType] = new YEventSource();
                }
                var source = eventSource[actionType];
                WeakEventManager<YEventSource, YEventArgs>.AddHandler(source, 
                                        nameof(YEventSource.Event), handler);

                if (useLatestPayload && latestPayload?.GetType() == actionType) {
                    handler?.Invoke(new YEventSource() {
                                        CallFrame = new StackTrace().GetFrame(0)
                                    },
                          new YEventArgs(latestPayload));
                }
            }
            return () => {
                lock (locker) {
                    var source = eventSource[actionType];
                    WeakEventManager<YEventSource, YEventArgs>.RemoveHandler(source, 
                                            nameof(YEventSource.Event), handler);
                }
            };
        }

        /// <summary>
        /// 集合订阅
        /// </summary>
        /// <param name="handlers"></param>
        /// <param name="useLatestPayload"></param>
        /// <returns></returns>
        public Unsubscibe Subscribe(IDictionary<Type, EventHandler<YEventArgs>> handlers,
                                    bool useLatestPayload = true) {
            lock (locker) {
                foreach (var pair in handlers) {
                    var actionType = pair.Key;
                    var handler = pair.Value;
                    if (!eventSource.ContainsKey(actionType)) {
                        eventSource[actionType] = new YEventSource();
                    }
                    var source = eventSource[actionType];
                    WeakEventManager<YEventSource, YEventArgs>.AddHandler(source, 
                                                    nameof(YEventSource.Event), handler);

                    if (useLatestPayload && latestPayload?.GetType() == actionType) {
                        handler?.Invoke(this, new YEventArgs(latestPayload));
                    }
                }
            }
            return () => {
                lock (locker) {
                    foreach (var pair in handlers) {
                        var source = eventSource[pair.Key];
                        WeakEventManager<YEventSource, YEventArgs>.RemoveHandler(source, 
                                                nameof(YEventSource.Event), pair.Value);
                    }
                }
            };
        }
      
    }
```
__参考文献：__  

[Weak Event Patterns][href1]

[href1]: https://docs.microsoft.com/en-us/dotnet/framework/wpf/advanced/weak-event-patterns