# 手写观察者模式
`观察者模式`和`发布订阅模式`两个就像孪生兄弟一样，说到`观察者模式`就一定会说到`发布订阅模式`，那么二者究竟有什么区别呢？今天我们着重讲一下`观察者模式`，因为`发布订阅模式`我们之前已经写过了，文末我会po出他们二者的区别。  
## 观察者模式原理
- `观察者模式`是`一对多`的模式，它只有两个角色，分别是观察对象`Subject`和观察者`Observer`
- 当目标对象`Subject`的状态发生变化之后，所有它的观察者`Observer`都会得到响应
```
class Observer {
  constructor(doSome) {
    this.doSome = doSome;
  }
  update() {
    console.log(this.doSome);
  }
}

class Subject {
  constructor() {
    this.observerList = [];
  }
  addObserver(observer) {
    this.observerList.push(observer);
  }
  notify() {
    this.observerList.forEach((observer) => {
      observer.update();
    })
  }
}

const obj1 = new Observer('我是obj1');
const obj2 = new Observer('我是obj2');
const temp = new Observed();
temp.addObserver(obj1);
temp.addObserver(obj2);
temp.notify(); // 我是obj1 我是obj2
```
## 区别
`观察者模式`和它的好兄弟`发布订阅模式`来比，主要有以下区别：
- `观察者模式`是`一对多`的关系，而`发布订阅模式`的`发布者`和`订阅者`之间存在着`调度中心`来协调过程
- `观察者模式`观察者和订阅者之间相互耦合，`发布订阅模式`因为`调度中心`所以是强解耦的
- `观察者模式`适合用于内部元素关联性强、职责较为单一的模块，而`发布订阅模式`更适合做跨模块的通信