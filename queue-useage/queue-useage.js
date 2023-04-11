/**
 * 几个朋友一起玩击鼓传花游戏，从第一个人开始数数，数到某个数字的人自动淘汰，笑到最后的人取得胜利，请问最后这个人在原来的哪一个位置？
 * 思路：我们可以用队列实现这个功能，首先要先封装一个队列
 */
class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(element) {
    this.queue.push(element);
  }
  dequeue() {
    return this.queue.shift();
  }
  front() {
    return this.queue[0];
  }
  size() {
    return this.queue.length;
  }
}

function passGame(list, num) {
  let queue = new Queue();
  // 全部人都先进入队列
  for (let i = 0; i < list.length; i++) {
    queue.enqueue(list[i]);
  }
  while (queue.size > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 删掉这个对应的人
    queue.dequeue();
  }
  return {
    name: queue.front(),
    num: list.indexOf(queue.front()) + 1,
  };
}
