/**
 * 发布订阅模式，一种一对多的设计模式，订阅者和发布者之间存在着一个中间平台
 * 通过发布者发布内容后中间平台再一次性发布更新通知给订阅者
 */
class eventEmitter {
  constructor() {
    // type: 事件名
    // callback []: 回调函数
    this.events = {};
  }
  // 将type和callback加入消息队列
  $on(type, callback) {
    if (this.events[type]) {
      this.events[type].push(callback);
    } else {
      // 如果不存在这个事件则直接创建并加入
      this.events[type] = [callback];
    }
  }
  // 删除指定type和callback的信息队列
  $off(type, callback) {
    if (!this.events[type]) return;
    if (!callback) {
      // 如果没有callback直接删除整个事件
      this.events[type] = undefined;
    } else {
      this.events[type] = this.events[type].filter((item) => item !== callback);
    }
  }
  // 触发这个type队列的事件
  $emit(type) {
    if (!this.events[type]) return;
    // 每个事件都触发一次
    this.events[type].forEach((callback) => {
      callback();
    });
  }
  // 事件触发一次后就删除
  $once(type, callback) {
    function fn() {
      callback();
      this.$off(type, callback);
    }
    this.$on(type, fn);
  }
}
