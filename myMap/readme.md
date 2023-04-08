# 手写map
数组方法`map`通过回调函数返回调用函数后的新数组
```
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

Function.prototype.myMap = function(cb) {
  let _item;
  let _result = [];
  let _arg1 = this;
  let _arg2 = arguments[1] || window;
  let _len = _arg1.length;
  for(let i = 0; i < _len; i++) {
    _item = deepClone(_arg1[i]);
    _result.push(cb.apply(_arg2, [_item, i, _arg1]));
  }
  return _result;
}
```