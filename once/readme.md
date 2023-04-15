# 手写once函数
`once`函数，是一种只能执行一次的函数，也就是说第一次就会将结果缓存下来，后面不管你怎么改变输入参数，输出的解构都不会发生变化；这是一道检验你闭包用的好不好的题目，实现起来还是比较简单的，让我们来看看具体是怎么做的吧：
```
function once(fn) {
  if(typeof fn !== 'function') return;
  let isFirst = true;
  let res = 0;
  // 利用闭包
  return function(...args) {
    if(!isFirst) return res;
    res = fn.call(this, args);
    isFirst = false;
    return res;
  }
}

let fn = (x) => x;
let onceF = once(fn);
console.log(onceF(3)); // 3
console.log(onceF(4)); // 3
```
可以看到我们利用`闭包`缓存了结果，这样就能做到对结果的缓存，利用`isFirst`实现判断是否是第一次运行这个函数，这个`闭包`很妙阿！