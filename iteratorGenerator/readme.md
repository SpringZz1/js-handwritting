# Generator
<code>生成器Generator</code>能够暂停函数的执行，generator函数通过<code>*</code>命令生成，内部使用<code>yield</code>完成函数暂停控制；也就是说生成器内部的执行规则是执行知道遇到下一个<code>yield</code>关键字；综上，我们能够通过使用generator函数实例化后的对象的.next()函数实现函数的控制
例：
```
function* iteratorGenerator() {
  yield '1st', yield '2nd', yield '3rd';
}

const iterator = iteratorGenerator();

iterator.next(); // {value: '1st', done: false}
iterator.next(); // {value: '2nd', done: false}
iterator.next(); // {value: '3rd', done: true}
```
那么generator可以解决什么问题呢？  
1. 异步操作的同步化，我们知道Promise的链式调用能够较好的解决回调地狱问题，但是promise的连续链式调用也会增加心智负担，但是通过使用<code>generator</code>我们能够将异步代码转换为同步代码形式，更加具有可读性
2. 配置iterator接口，ES6新增的for...of让我们能够遍历具有[Symbol.iterator]属性的对象，在遍历方便相比for...in更加优秀，通过将对象用<code>generator</code>包裹后，就让对象拥有了[Symbol.iterator]属性

接下来让我们手动实现一个generator:
```
function iteratorGenerator(list) {
  // 用于最终遍历到哪儿了
  let index = 0;
  let len = list.length;
  return {
    // next()函数
    next() {
      // done表示遍历位置, 遍历到终点则done为true, 否则为false
      let done = index >= len;
      let value = !done ? list[index++] : undefined;
      return {
        value: value,
        done: done,
      };
    },
  };
}

const iterator = iteratorGenerator(['1st', '2nd', '3rd']);

iterator.next(); // {value: '1st', done: false}
iterator.next(); // {value: '2nd', done: false}
iterator.next(); // {value: '3rd', done: true}
```
完成！