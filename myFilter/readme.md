# 手写filter
数组方法`filter`能够返回符合条件的新数组，额，好像就是这个实现步骤，那我们直接上手试试看吧：
```
// 考虑到数组可能存在嵌套问题，需要一个深拷贝
function deepClone(source, map = new Map()) {
  if(source instanceof Date) {
    return new Date(source);
  }
  if(source instanceof RegExp) {
    return new RegExp(source);
  }
  if(source instanceof Function) {
    return source;
  }
  let target = Array.isArray(source) ? [] : {};
  // 防止循环引用
  if(map.has(source)) return map.get(source);
  map.set(source, target);
  for(const key of source) {
    if(source.hasOwnProperty(key)) {
      target[key] = typeof source[key] === 'object' ? deepClone(source[key], map) : source[key];
    }
  }
  return target;
}

Function.prototype.myFilter = function(cb) {
  let _item;
  let _arg1 = this;
  let _arg2 = arguments[1] || window;
  let _len = _arg1.length;
  let _result = [];
  for(let i = 0; i < _len; i++) {
    _item = deepClone(_arg1[i]);
    cb.apply(_arg2, [_item, i, _arg1]) ? _result.push(_item) : '';
  }
  return _result;
}
```
主要工作量在深拷贝上