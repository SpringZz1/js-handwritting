# 模拟实现call
一句话介绍<code>call()</code>: <code>call()</code>方法在接收一个指定的<code>this</code>值和若干个指定的参数值的前提下调用某个函数或方法  
所以我们模拟的时候要考虑以下几点:
- 函数中添加一个属性(函数)
- 执行该函数
- 删除该函数  

但是<code>call()</code>还能接收参数，并且参数是不定长的，我们该如何解决呢？也很简单，通过自定义一个数组来接收<code>arguments</code>即可  
最后怎么执行这个添加的函数和得到的参数呢？有两种方法，一种是使用<code>ES3</code>的<code>eval()</code>，还有一种是使用<code>ES6</code>的<code>...</code>运算符，接下来我们就试试两种方法吧:
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
可见<code>ES3</code>的方法实现<code>call()</code>还是挺麻烦的, 但是<code>call()</code>是<code>ES5</code>的内容用<code>ES6</code>方法实现有些怪怪的, 所以还是老老实实用<code>ES3</code>的<code>eval()</code>吧  
但是既然<code>ES6</code>有更方便的方法, 还是值得我们一试的，来看看吧:
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
一句话介绍<code>apply()</code>，<code>apply()</code>和<code>call()</code>的作用是一样的，都是接收一个<code>this</code>对象，不同之处在于<code>apply()</code>通过一个数组来接受参数，而<code>call()</code>是通过将参数一个一个传入的。  
接下来模拟实现一下<code>apply()</code>，实际上的思路是差不多的，我们还是用两种方法来模拟实现
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
可以看出和<code>call()</code>的实现方法是差不多的，只是针对参数传入方式进行了一定修改，让我们看看<code>ES6</code>方法
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