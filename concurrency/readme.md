# 处理串行请求
腾讯面试官问我的一个问题，我觉得挺好的，遂记：给你一个不定长的异步请求，每个异步请求都依赖于上一个异步请求，请问怎么做呢？  
其实这么问我一下子就有思路了，这不是经典的使用`async/await`嘛？结果面试官马上说，不让用`async/await`，只用`Promise`怎么做呢？别说，还真把我干住了，这只用Promise咋做呀？后面面试官教给我一招，`reduce`，不得不说`reduce`还是得多用才会，话不多说，我们直接上实战：
## 纯Promise实现串行请求
```
const createPromise = (time, id) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise: ', id);
    }, time)
  })
}

function concurrency(promises) {
  promises.reduce((previousPromise, curPromise) => {
    previousPromise.then(() => curPromise());
  }, Promise.resolve());
}

concurrency([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);

得到输出:
promise: 1
promise: 2
promise: 3
```
`reduce`以同步的方式完成了异步的串行处理，`previousPromise`就是第一个开启的异步请求，所以我们需要让`reduce`的第二个参数为`Promise.resolve()`，这样才可以让请求启动，同时调用`curPromise`完成链式调用，这个方法真难想阿，不过要是能做出来就很吊了  
## async/await实现串行请求
`async/await`做这个就是降维打击了，而且是我认为最优雅的写法，我们直接看代码：
```
const createPromise = (time, id) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise: ', id);
    }, time)
  })
}

async function concurrency(promises) {
  for(const promise of promises) {
    await promise();
  }
}

concurrency([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);

得到输出:
promise: 1
promise: 2
promise: 3
```