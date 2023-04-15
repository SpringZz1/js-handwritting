/**
 * 实现一个函数，该函数能够缓存结果，只会计算一次
 */
function once(fn) {
  let res,
    isFirst = true;
  return function (...args) {
    if (!isFirst) return res;
    res = fn.call(this, args);
    isFirst = false;
    return res;
  };
}

const f = (x) => x;
const onceF = once(f);
console.log(onceF(3)); // 3
console.log(onceF(4)); // 3
