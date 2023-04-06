/**
 * 请你实现一个微信发红包程序，能够根据设定的阈值随机分配红包，注意需要乱序
 */

// 乱序
let arr = [1, 3, 4, 2];
function shuffle(arr) {
  let len = arr.length;
  for (let i = len; i; i--) {
    const index = Math.floor(Math.random() * i);
    // console.log(index);
    [arr[index], arr[i - 1]] = [arr[i - 1], arr[index]];
  }
  return arr;
}

// 根据最大最小值选出红包金额
function generateRange(min, max) {
  return parseFloat(Math.random() * (max - min) + min).toFixed(2);
}

// 红包生成器
function redPacketGenerate(money, count, threshold = 0.68) {
  let res = [];
  if (threshold < 0 || threshold > 1) return;
  for (let i = 0; i < count; i++) {
    const value = generateRange(0.01, money * threshold);
    money -= value;
    res.push(value);
  }
  return shuffle(res);
}

let res = redPacketGenerate(10, 10);
let sum = res.map(Number).reduce((prev, cur) => {
  return (prev += cur);
}, 0);
console.log('经过洗牌之后的结果', res);
