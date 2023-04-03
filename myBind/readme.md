# 模拟实现bind
本来想一句话介绍bind()的，但是感觉内容还挺多的，一句话以我的语文能力好像不太能做到，还是按点介绍一下bind吧：
- bind()和call()、bind()都能够改变this指向，因此我们模拟实现的时候改变this指向可以通过call()或者apply()实现
- bind()返回一个新的函数，该函数能够作为构造函数使用，因此还需要根据是否作为构造函数来选择this指向  


这么一看，好像一两句话也能说完的样子，算了，我都分点列出来了，这样清楚点，既然把点都列出来了，那废话不多说，直接进入主题：
```
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if(typeof this !== 'function') {
    throw new Error('Error');
  }
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
```