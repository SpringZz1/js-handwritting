/**
 * 防抖
 * 在连续触发一个事件的情况下，只以最后一次触发事件为基准开始计算触发延迟
 * 相关应用：关键词联想只有在停下之后开始联想，提交表单以最后一次点击为准
 */
function debounce(func, wait) {
  let timer = null;

  return function () {
    let self = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, wait);
  };
}

/**
 * 现在添加一个立即执行功能
 * 我们可以通过这个功能能让函数立即触发，然后等停止触发n秒之后才可以重新执行
 */
function debounce(func, wait, immediate) {
  let timer = null;
  return function () {
    let self = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout((timer = null), wait);
      if (callNow) func.apply(self, args);
    } else {
      timer = setTimeout(() => {
        func.apply(self, args);
      }, wait);
    }
  };
}
