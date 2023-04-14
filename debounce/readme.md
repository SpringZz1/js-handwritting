# 手写防抖
前端开发中会遇到一些频繁触发的事件，比如用户连续点击按钮、用户在搜索框输入文字时搜索框的联想功能。假如频繁触发点击事件，有可能导致连续的表单提交问题，联想功能疯狂刷新导致页面割裂，所以我们需要一种方法来`延迟`显示内容。这就是我们今天的主角`debounce`防抖，`debounce`的核心思想就是在面对一系列的连续触发事件时，我们一定会在最后一次触发事件过了n秒之后才执行，加入你在等待n秒期间又触发了事件，那就重新开始计数

```
function debounce(func, wait) {
  let timer = null;
  return function() {
    let self = this;
    let args = arguments;
    if(timer) clearSetTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, wait)
  }
}
```
最基本的一个`debounce`就完成了，如果我加入一个要求，要求能够在第一次触发的时候能立即触发事件，后续的点击才会进入防抖我们该怎么做呢？也很简单，直接看代码：
```
function debounce(func, wait, immediate) {
  let timer = null;
  return function() {
    let self = this;
    let args = arguments;
    if(timer) clearSetTimeout(timer);
    if(immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if(callNow) func.apply(self, args);
    } else {
      timer = setTimeout(() => {
        func.apply(self, args);
      }, wait)
    }
  }
}
```