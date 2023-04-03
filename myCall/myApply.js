/**
 * apply的作用和call是一样的，唯一不同的是接收参数的方法
 * 接收一个指定的this对象
 * 通过数组的形式接收参数
 */
Function.prototype.myApply = function (context, arr) {
  context = context || window;
  context.fn = this;
  let result;
  if (!arr.length) {
    result = context.fn();
  } else {
    let args = [];
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ' ]');
    }
    result = eval('context.fn(' + args + ')');
    delete context.fn;
  }
  return result;
};
