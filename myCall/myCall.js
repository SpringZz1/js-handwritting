/**
 * call的作用
 * 1. 能够改变this指向
 * 2. 能够访问到this指向的对象的内容
 */

// ES3写法
Function.prototype.myCall = function (context) {
  // 确定this要指向的目标
  context = context || window;
  // 通过this能够访问到要执行的函数
  context.fn = this;
  // 接收函数参数
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  // eval执行函数
  let result = eval('context.fn(' + args + ')');
  // 删除已经没用的对象函数
  delete context.fn;
  return result;
};

// ES6方法
Function.prototype.myCall1 = function (context) {
  context = context || window;
  context.fn = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  // 使用到了ES6的...拓展符
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

