# 手写forEach
正所谓`既生瑜何生亮`,`for`和`forEach`也是面试常问的一个问题，为什么有了`for`还有`forEach`呢？接下来让我们来捋一捋：  
首先，`for`是`JavaScript`被发明的时候就存在的，它能够数组，字符串等，而`forEach`是`ES5`的时候被提出的，它主要是为了能够遍历`可迭代`对象，虽然`for`也能遍历`可迭代`对象，但是`forEach`更加方便快捷，这里稍微提一下什么是`可迭代`对象：`可迭代`对象就是指拥有`[Symbol.iterator]`的对象。这就是`for`和`forEach`的本质区别，那么接下来再总结一下这两个的区别：
- `for`是可以`中断`的，而`forEach`是`不可中断`的，如果非要让`forEach`跳出循环，那么我们可以用`try/catch`来包裹`forEach`
- `forEach`的`index`是无法控制的，只会无脑变大，我们无法修改`index`
- `for`可以控制循环的起点，而`forEach`如上面所说，无法控制
- `forEach`和`for`的性能存在差距，`for`的性能要大于`forEach`，为什么呢？因为`forEach`中存在额外的函数调用栈和上下文，所以存在上下文切换的负担

大致内容就是这些，我们开始着手实现以下`forEach`，`forEach`其实就是通过`回调函数`来遍历对象，所以我们只需要触发这个回调函数就行了，不过需要注意`forEach`还能接收第二个参数来改变`this`的指向：
```
Function.prototype.myForEach = function(cb) {
  let _arg1 = this;
  let _len = _arg1.length;
  // 接收第二个参数，如果没有传入则为window
  let _arg2 = argument[1] || window;
  for(let i = 0; i < _len; i++) {
    cb.apply(_arg2, [_arg1[i], i, _arg1]);
  }
}
```
这样就完成一个简单的`forEach`手写