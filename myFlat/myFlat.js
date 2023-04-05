/**
 * 思路
 * 数组扁平化就是将嵌套的数组扁平为只有一层的数组
 */

/**
 * 1. 遇到这种多层嵌套的问题应该比较自然的想到递归解法， 直接看下代码
 */
let arr = [1, [2, [3, 4]]];
function myFlat(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(myFlat(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

/**
 * 2. 借用ES6的...操作符，但是...操作符只能解嵌套一层数组，如果有多层嵌套怎么办呢？
 * 这时候就要借助神奇的Array.some，只要还存在数组嵌套，则递归使用...操作符
 */

function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

/**
 * 使用reduce，reduce很重要呀，但是总是用不好，刚好拿你开刀
 */
function flatten(arr) {
  arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
