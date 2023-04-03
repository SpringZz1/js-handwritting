# 模拟实现call
一句话介绍call(): call()方法在接收一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法  
所以我们模拟的时候要考虑以下几点:
- 函数中添加一个属性(函数)
- 执行该函数
- 删除该函数  

但是call()还能接收参数，并且参数是不定长的，我们该如何解决呢？也很简单，通过自定义一个数组来接收arguments即可  
最后怎么执行这个添加的函数和得到的参数呢？有两种方法，一种是使用ES3的eval()，还有一种是使用ES6的...运算符，接下来我们就试试两种方法吧:
```
// ES3

Function.prototype.myCall = function(context) {
  // context是指定的this, 如果没有指定则默认为window
  context = context || window;
  // 保存不定长的参数
  let args = [];
  // 获取不定长的参数, 注意此处从i = 1才是参数, 因为i = 0是context
  for(let i = 1; i < arguments.length; i++) {
    args.push('arguments(' + i + ')');
  }
  // eval运行字符串
  result = eval('context.fn(' + args + ')');
  // 函数运行完成删掉
  delete context.fn;
  return result;
}
```
可见ES3的方法实现call()还是挺麻烦的, 但是call方法是ES5的内容用ES6方法实现有些怪怪的, 所以还是老老实实用ES3的eval吧  
但是既然ES6有更方便的方法, 还是值得我们一试的，来看看吧:
```
// ES6
Function.prototype.myCall = function(context) {
  context = context || window;
  context.fn = this;
  let args = [];
  for(let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  // 重点: 通过...运算符我们可以直接将接收到的参数作为指定属性的参数输入得到结果
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
```
# 模拟实现apply
一句话介绍apply()，apply()和call()的作用是一样的，都是接收一个this对象，不同之处在于apply通过一个数组来接受参数，而call()是通过将参数一个一个传入的。  
接下来模拟实现一下apply，实际上的思路是差不多的，我们还是用两种方法来模拟实现
```
// ES3
Function.prototype.myApply = function (context, arr) {
  context = context || window;
  context.fn = this;
  let result;
  // 如果没有传入参数数组或参数数组为空
  if (!arr.length) {
    result = context.fn();
  } else {
    // 如果传入参数数组
    let args = [];
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ' ]');
    }
    result = eval('context.fn(' + args + ')');
    delete context.fn;
  }
  return result;
};
```
可以看出和call()的实现方法是差不多的，只是针对参数传入方式进行了一定修改，让我们看看ES6方法
```
// ES6
Function.prototype.myApply = function(context, arr) {
  context = context || window;
  context.fn = this;
  let result;
  if(!arr.length) {
    result = context.fn();
  } else {
    let args = [];
    for(let i = 0; i < arr.length; i++) {
      args.push(arr[i]);
    }
    // 重点: 通过ES6的...实现传送参数
    result = context.fn(...args);
    delete context.fn;
  }
  return result;
}
```