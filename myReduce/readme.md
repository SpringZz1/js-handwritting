# 手写reduce
数组方法`reduce`对数组中的每个元素按序执行一个回调函数，每次运行回调函数前会将先前的元素计算结果作为参数计入，最后将其结果汇总为单个返回值，这么说有点抽象，我们看下`MDN`怎么说：
语法：
```
reduce(cb)
reduce(cb, initialValue)
```
其中参数`cb`接收四个参数：
- `previousValue`：上一次调用`callback`时的返回值，在第一次调用时，若指定了初始值`initialValue`，则其值为`initialValue`，否则为数组索引为0的元素`array[0]`
- `currentValue`：数组正在处理的元素。在第一次调用的时候，若指定了初始值`initialValue`，则其值为数组索引为0的元素`array[0]`，否则为`array[1]`
- `currentIndex`：数组中正在处理的元素的下标。若指定了初始值`initialValue`，则索引号为0，否则从索引1起始
- `array`：用于遍历的数组

`initialValue`：  
作为第一次调用`callback`函数时函数perviousValue的值，若指定了初始值`initialValue`，则`currentValue`将数组的第一个元素，否则 `previousValue`将使用数组第一个元素，而`currentValue`将使用数组第二个元素  
不愧是`MDN`，内容讲的很透彻，那么接下来我们已经知道流程了，就来走走看怎么实现吧！
```
// 深拷贝函数
function deepClone(source, map = new Map()) {
  if (source instanceof RegExp) {
    return new RegExp(source);
  }
  if (source instanceof Date) {
    return new Date(source);
  }
  if (source instanceof Function) {
    return source;
  }
  if (map.has(source)) return map.get(source);
  let target = Array.isArray(source) ? [] : {};
  map.set(source, target);
  for (const key of source) {
    if (source.hasOwnProperty(key)) {
      target[key] =
        typeof source[key] === 'object'
          ? deepClone(source[key], map)
          : source[key];
    }
  }
  return target;
}

Function.prototype.myReduce = function(cb, initialValue) {
  initialValue = initialValue || [];
  let _arg1 = this;
  let _len = _arg1.length;
  let _item;
  for(let i = 0; i < _len; i++) {
    _item = deepClone(_arg1[i]);
    initialValue = cb(initialValue, _item, i, _arg1);
  }
  return initialValue;
}
```
这个应该是最复杂的一个手写数组方法了，也是使用最频繁的，需要好好学