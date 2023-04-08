/**
 * 思路：数组方法filter能够根据传入的条件来有选择的返回符合条件的值，就是这么简单
 */

// 深拷贝
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
Function.prototype.myFilter = function (cb) {
  let _arg1 = this;
  let _len = _arg1.length;
  let _arg2 = arguments[1] || window;
  let _item;
  let _result = [];
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arg1[i]);
    cb.apply(_arg2, [_item, i, _arg1]) ? _result.push(_item) : '';
  }
  return _result;
};
