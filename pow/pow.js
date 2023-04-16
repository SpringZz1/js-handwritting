/**
 * 面试官：请实现一个m的n次方
 */

/**
 * 时间复杂度O(n)
 */
function pow(m, n) {
  return Math.pow(m, n);
}

// console.log(pow(2, 10));

/**
 * 优化一次，时间复杂度O(n / 2)
 */
function pow(m, n) {
  let index = Math.floor(n / 2);
  let temp = m * m;
  let res = 1;
  for (let i = 0; i < index; i++) {
    res *= temp;
  }
  if (n % 2 !== 0) {
    res *= m;
  }
  return res;
}

/**
 * 再优化一次
 */
function pow(m, n) {
  let res = 1;
  let base = m;
  while (n !== 0) {
    if (n % 2 !== 0) {
      res *= base;
    }
    base *= base;
    n = Math.floor(n / 2);
  }
  return res;
}
console.log(pow(2, 10));
