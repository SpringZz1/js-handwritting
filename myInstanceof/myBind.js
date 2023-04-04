/**
 * 思路: instanceof能够用于对对象数据类型进行类型判断，其原理就是根据原型链进行判断
 * 利用这个原理我们能够比较简单的手写一个instanceof
 */

/**
 * 此处left为需要判断类型的数据，right为数据类型
 */
function myInstanceof(left, right) {
  if (
    (typeof left !== 'object' && typeof left !== 'function') ||
    left === null
  ) {
    throw new Error('不是对象数据类型');
  }
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function A() {}
const a = new A();
console.log(myInstanceof(a, A)); // true
console.log(myInstanceof(1, A)); // false
