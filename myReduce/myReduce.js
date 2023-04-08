/**
 * 思路：reduce有很多地方的用处，常见的就是进行累加的时候进行使用
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
Function.prototype.myReduce = function (cb, initValue) {
  initValue = initValue || [];
  let _arg1 = this;
  let _len = _arg1.length;
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arg1[i]);
    initValue = cb(initValue, _item, i, _arg1);
  }
  return initValue;
};
