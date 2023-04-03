/**
 * 思路
 * 1. new方法内部创建新的对象obj，将obj的原型和传入的函数原型连接
 * 2. 将obj的this指向指向传入的函数原型，结果为ret
 * 3. 判断new方法返回的变量是object类型还是普通类型，如果是object类型，则返回ret，否则直接返回obj
 */
function objFactory(func, ...args) {
  let obj = Object.create(func.prototype);
  let ret = func.apply(obj, args);
  return typeof ret === 'object' ? ret : obj;
}
