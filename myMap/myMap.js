/**
 * 思路：数组方法map根据回调函数返回执行后的新数组
 */
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

Function.prototype.myMap = function (cb) {
  let _arg1 = this;
  let _arg2 = arguments[1] || window;
  let _len = _arg1.length;
  let _item;
  let _result = [];
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arg1[i]);
    _result.push(cb.apply(_arg2, [_item, i, _arg1]));
  }
  return _result;
};
