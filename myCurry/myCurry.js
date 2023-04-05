/**
 * 思路
 * curry函数实际上就是一种高阶函数，能够将多个参数的一个函数转换为一系列使用一个参数函数的技术
 * 有啥用呢？curry的用途可以理解为参数复用，本质上是降低通用性，提高适用性
 * 并且像react的函数编程需要纯函数，而柯里化就能让函数更纯，松散解耦
 */
function curry(fn) {
  return function curriedFn(...args) {
    if (fn.length > args.length) {
      return function () {
        return curriedFn(...args.concat(...arguments));
      };
    }
    return fn(...args);
  };
}

// 使用
const fn = (x, y, z, a) => x + y + z + a;
const myFn = curry(fn);
console.log(myFn(1)(2)(3)(1));
