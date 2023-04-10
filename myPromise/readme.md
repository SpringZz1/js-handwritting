# 手写Promise的静态方法
`Promise`的四大天王：`Promise.all`、`Promise.race`、`Promise.any`、`Promise.allSettled`，我们要做到知己知彼，知其然知其所以然，让我们来看看`Promise`的四个静态方法的用法以及手写吧！  
## Promise.all
最常见的就是`Promise.all`，它有什么用呢？很简单，当我们需要知道一组异步请求的结果，谁能做到呢？`Promise.all`就能，它能够接收一组异步请求，然后根据它们的状态来返回最终的状态（`reject`或者`resolve`）。要注意到的是如果有一组异步请求出现`reject`，那么`Promise.all`就会直接返回`reject`并且我们无从得知其他请求的状态。
```
Promise.myAll = function(promises) {
  let arr = [];
  let count = 0;
  return new Promise((resolve, reject) =>{
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((res) => {
        arr[index] = res;
        count += 1;
        if(count === promises.length) resolve(arr);
      }).catch(err => {
        reject(err);
      })
    })
  })
}
```
## Promise.race
第二个常见的`Promise`api就是`Promise.race`，它有什么用呢？race，顾名思义，竞跑，也就是说通过`Promise.race`包裹的异步操作会返回第一个`完成`的状态，剩下未完成的就不管了，这个完成的状态可能是`reject`也可能是`resolve`，这么说好像还是不知道具体怎么用，比较常见的一个场景就是我们需要做超时判断的时候，`Promise.race`就很有用，将你需要的异步请求和一个计时器一起包裹在`Promise.race`中，看谁先完成就能知道是否超时。
```
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
};
```
## Promise.any
`Promise.any`和`Promise.all`是反过来的，`Promise.all`只要遇到一个`reject`则直接整个返回`reject`，而`Promise.any`需要全部请求都返回`reject`才整体返回`reject`，否则返回`resolve`，实现起来和`Promise.all`就是相反的，相信已经实现了`Promise.all`的我们随便吃这道题
```
Promise.myAny = function(promises) {
  let count = 0;
  let arr = [];
  return new Promise((resolve, reject) => {
    promise.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve).catch((err) =>{
        arr[index] = {val: err, status: 'Reject'},
        count++;
        if(count === promises.length) reject(new Error(arr));
      })
    })
  })
}
```

## Promise.allSettled
终于来到我们最后的一个api，`Promise.allSettled`，通过上述实现我们知道，`Promise.all`和`Promise.any`分别遇到`reject`和`resolve`就直接输出结果了，那如果我想知道具体哪个请求出了问题该怎么办呢？当当当，`Promise.allSettled`就是这么用的，不论请求时`reject`还是`resolve`，`Promise.allSettled`都会输出全部的请求结果，让我们更加直观的看到异步请求的结果和分析错误原因。
```
Promise.myAllSettled = function(promises) {
  let arr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    Promise.resolve(promise).then((res) => {
      arr[index] = res;
      count++;
      if(count === promises.length) resolve(arr);
    }).catch((err) => {
      arr[index] = {val: err, status: 'Reject'};
      count++;
      if(count === promises.length) reject(new Error(err));
    })
  })
}
```
至此，四个重要的`Promise`静态方法全部实现