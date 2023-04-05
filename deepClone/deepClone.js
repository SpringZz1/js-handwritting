/**
 * 思路
 * 深浅拷贝，故名思意就是能够深度拷贝对象，为什么需要深度拷贝对象呢?
 * 这是因为对象中可能存在嵌套现象：对象嵌套现象，如果使用浅拷贝的时
 * 浅拷贝只会拷贝原始对象的引用，这就导致修改浅拷贝后的对象会对原对象造成影响
 * 所以我们需要深拷贝，让两个拷贝的对象指向不同的地址，不会彼此造成影响
 */

/**
 * 1. json.stringfy()深拷贝
 * 最常见常用的深拷贝方法，简单好用
 * 缺点在于由于json.stringfy()无法转换function类型的值，所以深拷贝function类型的值会失败
 */
let arr = ['old', 1, true, ['old', 'old2'], { old: 1 }];
let newArr = JSON.parse(JSON.stringify(arr));

/**
 * 2. 手写深拷贝
 */
function deepClone(source, map = new Map()) {
  let target = Array.isArray(source) ? [] : {};
  // 防止循环引用导致深拷贝死循环
  if (map.get(source)) return source;
  map.set(source, target);
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      // 如果是个嵌套对象则递归执行
      target[key] =
        typeof source[key] === 'object'
          ? deepClone(source[key], map)
          : source[key];
    }
  }
  return target;
}
