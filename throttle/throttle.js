/**
 * 节流
 * 面对连续触发的事件，每隔一段事件，只触发一次
 * 节流主要有两种方式能够实现
 * 1. 使用时间戳
 * 2. 使用定时器
 */

/**
 * 1. 使用时间戳
 * 能够立即触发，但是离开之后就没法再触发了
 */
function throttle(func, wait) {
  let previous = 0;
  return function () {
    let self = this;
    let args = arguments;
    let now = +new Date();
    if (now - previous >= wait) {
      func.apply(self, args);
      previous = now;
    }
  };
}

/**
 * 2. 使用定时器
 * 不能立即触发，但是离开之后能重新触发
 */
function throttle(func, wait) {
  let timer = null;
  return function () {
    let args = arguments;
    let self = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(self, args);
      }, wait);
    }
  };
}

/**
 * 来个双剑合璧的版本，又能立即触发也能离开之后重新触发
 */
function throttle(func, wait) {
  let timer = null;
  let previous = 0;
  let self, args;
  let later = function () {
    previous = +new Date();
    timer = null;
    func.apply(self, args);
  };
  let throttled = function () {
    let now = +new Date();
    // 下次触发func的剩余时间
    let reminding = wait - (now - previous);
    self = this;
    args = arguments;
    if (reminding <= 0 || reminding > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      func.apply(self, args);
    } else if (!timer) {
      timer = setTimeout(later, reminding);
    }
  };
  return throttled;
}
