/**
 * 实现四个常见的Promise静态方法：all、race、allSettled、any
 */

/**
 * Promise.all
 * Promise.all接收一个数组，这个数组包含一组promise对象，如果其中有一个promise返回reject，
 * 则promise.all返回reject，否则返回resolve，Promise.all多用于并行发送请求
 */
Promise.myAll = function (promises) {
  let count = 0;
  let arr = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          arr[index] = res;
          count++;
          if (count === promises.length) resolve(arr);
        })
        .catch(reject);
    });
  });
};

/**
 * Promise.any
 * Promise.any和Promise.all是反过来的，Promise.any在所有promise都返回reject的情况下才返回reject，
 * 否则返回resolve
 */
Promise.myAny = function (promises) {
  let count = 0;
  let arr = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          count++;
          arr[index] = { val: err, status: 'reject' };
          if (count === promises.length) reject(new Error(err));
        });
    });
  });
};

/**
 * Promise.race
 * Promise.race就是竞赛的意思，在一堆promise数组中，返回第一个转换状态的
 * Promise.race常常用来进行超时判定
 */
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
};

/**
 * Promise.allSettled
 * Promise.allSettled用于处理Promise.all和Promise.any的缺点
 * 从上文我们知道Promise.all存在如果有一个是reject则不管其他的状态
 * Promise.any也是一个道理，如果有一个resolve了则不管其他的状态
 * 如果我们想要知道所有请求的完成情况，这时候就需要Promise.allSettled
 */
Promise.myAllSettled = function (promises) {
  let arr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          arr[index] = res;
          count++;
          if (count === promises.length) resolve(arr);
        })
        .catch((err) => {
          arr[index] = { val: err, status: 'reject' };
          count++;
          if (count === promises.length) reject(new Error(arr));
        });
    });
  });
};
