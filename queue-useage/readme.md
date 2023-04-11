# 手写击鼓传花
题目：几个朋友一起玩击鼓传花游戏，从第一个人开始数数，数到某个数字的人自动淘汰，笑到最后的人取得胜利，请问最后这个人在原来的哪一个位置  
这道题主要考的是我们对队列的理解，我们先将这些人加入队列中，然后根据给定的数来进行队列的入队和出队，这样能保持原有的顺序不发生变化，找到需要删除的数对应的人，这样一直循环知道只剩最后一个人就行
```
class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(item) {
    this.queue.push(item);
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

function passGame(nameList, num) {
  let queue = new Queue();
  // 先将所有人入队
  for(let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  while(queue.size() > 1) {
    for(let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    queue.dequeue();
  }
  return {
    name: queue.front(),
    index: nameList.indexOf(queue.front())
  }
}
```
