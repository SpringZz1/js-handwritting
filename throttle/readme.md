# 手写节流
`节流`和`防抖`两兄弟都是为了避免出现连续触发的问题所发明的，`防抖`的做法是以最后一次触发为基准开始计时，时间到则触发，而`节流`是在一段时间内只触发一次，两者的应用场景稍微有点差距，本次主角是`节流`，所以我们介绍一下`节流`的使用场景，比如我们在下拉刷新加载新的内容的时候，需要的就是`节流`而不是`防抖`  
`节流`主要有两种方式实现，他们各具特点，我们一个一个讲  
## 时间戳实现节流
时间戳实现`节流`其实很简单，就是计算时间差，如果到了我们需要设定的时间，则触发事件
```
function throttle(func, wait) {
  let previous = 0;
  return function() {
    let self = this;
    let args = arguments;
    let now = +new Date();
    if(now - previous <= wait) {
      func.apply(self, args);
      previous = now;
    }
  }
}
```
基于时间戳实现`节流`的特点在于我们第一次触发时就会立即触发，但是离开之后就无法重新触发了
## 定时器实现节流
```
function throttle(func, wait) {
  let timer = null;
  return function() {
    let self = this;
    let args = arguments;
    if(!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(self, args);
      }, wait)
    }
  }
}
```
基于定时器实现`节流`的好处在于解决了基于定时器`节流`存在的离开之后无法重新触发的问题，但是问题在于无法立即触发，那么有没办法又能立即触发又能重新触发呢？让我们试试看双剑合璧的方法
## 双剑合璧
```
function throttle(func, wait) {
  let previous = 0;
  let args, self;
  let timer = null;
  let latter = function() {
    previous = +new Date();
    timer = null;
    func.apply(self, args);
  }
  let throttled = function() {
    let now = +new Date();
    let reminding = wait - (now - previous);
    self = this;
    args = arguments;
    if(reminding <= 0 || reminding > wait) {
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(self, args);
    } else if(!timeout) {
      timeout = setTimeout(later, reminding);
    }
  }
  return throttled;
}
```