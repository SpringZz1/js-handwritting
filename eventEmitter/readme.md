# 手写发布订阅模式
现在互联网是越来越卷，卷来自方方面面，也许是你的学历，也许是你的加班耐受能力，再也许是你的八股文背的好不好，可能你会觉得自己历经千辛万苦终于到了入职那一步，后面发现人家要卷你的入职时间，生活中处处充满排序，在你求职的那一刻，就已经订好了筹码。为什么这么多废话？因为这是最近找实习真是经历的问题，面试官上来就是一套组合拳，什么看到你的潜力，需要的是基本能力而不是前端能力，要视野开阔等等。只能说leader面确实不一样，人家用更加宏观的角度来让你觉得你自己不行，我们的公司要的是全面的人才而不是窄小的视野巴拉巴拉，然后不出意外我就挂了。  
> 说说设计模式？要求越多越好，说明是什么，为什么，怎么做，在你的项目中是怎么用到的？

`设计模式`是个很宏观的东西，前后端都要会，今天就先将前端比较常见的`发布订阅模式`吧。
## 发布订阅模式
什么是发布订阅模式？其实在我们生活中也是比较常见的一种模式了，例如订阅一个公众号，公众号的作者发布了新内容之后我们就能接收到更新推送，这个推送通知的工作交给了微信平台来完成，也就是订阅者和发布者之间存在一个'中间人'，那么`发布者-中间人-订阅者`，就构成了发布订阅模式。发布订阅模式的好处在于发布者和订阅者之间的关系是完全解耦的，双方不必知道对方是谁  
### 发布订阅模式应用
`VUE2`和`VUE2`中的`数据响应式`实际上用到的就是`发布订阅模式`+`代理模式`，数据劫持任务交给`代理模式`完成，这里我们只讲`发布订阅模式`，每次数据发生变化时`发布订阅模式`就通知所有副作用函数执行，这样能够更好的进行数据分工
### 手写发布订阅模式
我们要明确`发布订阅模式`的工作原理：
- 订阅者将自己想要订阅的事情注册到消息队列中
- 当发布者发布该事件到消息队列时，由消息队列统一发布订阅这个事件的通知

整体流程就是这么回事，那么我们捋一捋实现思路：
- 需要一个`消息队列`作为缓存列表
- `on`方法：用户用来订阅事件到`消息列表`中
- `off`方法：用户能够取消订阅
- `emit`方法：发布者发布新内容到`消息列表`中，调度中心处理代码
- `once`方法：仅仅触发一次事件，触发后删除该事件


思路导致如此，接下来我们看下代码的具体实现：
```
class EventEmitter {
  constructor() {
    // 消息队列
    this.event = {};
  }
  $on(type, callback) {
    // 如果没有这个type
    if(!this.event[type]) {
      this.event[type] = [callback];
    } else {
      this.event[type].push(callback);
    }
  }
  $off(type, callback) {
    if(!this.event[type]) return;
    if(!callback) {
      delete this.event[type];
    } else {
      this.event[type] = this.event[type].filter(item => item !== callback);
    }
  }
  $emit(type, callback) {
    if(!this.event[type]) return;
    this.event[type].forEach(fn => {
      fn();
    });
  }
  $once(type, callback) {
    function fn() {
      callback();
      this.$off(type, callback);
    }
    this.$on(type, fn);
  }
}
```