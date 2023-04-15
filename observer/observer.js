/**
 * 观察者模式
 * 观察者模式和发布订阅模式类似，最大的不同在于发布订阅模式发布者和订阅者之间是解耦的
 * 观察者模式双方是互相知晓的
 */
class Observed {
  constructor() {
    // 记录有多少人在观察我
    this.observerList = [];
  }
  // 添加观察者
  addObserver(observer) {
    this.observerList.push(observer);
  }
  // 有事件发生则通知所有的观察者
  notify() {
    this.observerList.forEach((observer) => {
      observer.update();
    });
  }
}

class Observer {
  constructor(doSome) {
    // 观察到有动静后，观察者需要做的事情
    this.doSome = doSome;
  }
  update() {
    console.log(this.doSome);
  }
}

const obj1 = new Observer('我是obj1');
const obj2 = new Observer('我是obj2');
const temp = new Observed();
temp.addObserver(obj1);
temp.addObserver(obj2);
temp.notify();
