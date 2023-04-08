/**
 * forEach实际上是用于遍历迭代器的操作，它的作用是能够遍历出当前元素、下标以及数组，同时第二个参数还接受一个this
 */

Function.prototype.myForEach = function (cb) {
  let _arg1 = this;
  let _len = _arg1.length;
  let _arg2 = arguments[1] || window;
  for (let i = 0; i < _len; i++) {
    cb.apply(_arg2, [_arg1[i], i, _arg1]);
  }
};
