/**
 * 给你一个不定长的异步请求，每个请求依赖于上一个结果，请问怎么请求？
 */

/**
 * 方法一：使用reduce同步完成异步请求
 */
let arr = [1, 2, 3, 4];
function concurrency(arr) {
  arr.reduce((prev, curr) => {
    prev.then(() => curr());
  }, Promise.resolve());
}

concurrency(arr);

/**
 * 方法二：使用async/await优雅的完成串行请求
 */
let arr1 = [1, 2, 3, 4];
async function concurrency(arr) {
  for (const promise of arr) {
    await promise();
  }
}
concurrency(arr1);
