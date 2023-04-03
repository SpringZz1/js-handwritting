/**
 * 思路
 * bind()方法也是一种改变this指向的方法，不过与call()、apply()不同的地方在于
 * 1. bind()返回一个新函数
 * 2. bind()方法能够多次分批传递参数
 * 3. bind()方法返回的函数能够当作构造函数使用，如果返回的是构造函数时，则this指向为构造函数，否则this指向指定的this
 * 说起来有抽象，直接看下怎么实现的
 */
Function.prototype.myBind = function (context) {
  context = context || window;
  // 因为要返回新的函数，所以需要保存一下
  let self = this;
  // 保存参数
  let args = Array.prototype.slice.call(arguments, 1);
  // 中转函数, 使用中转函数的好处是不用多次创建构造函数
  let fNOP = function () {};
  let fBound = function () {
    // 保存下一批次的函数
    let bindArgs = Array.prototype.slice.call(arguments);
    // 判断是否作为构造函数来确定this指向
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
