# 手写红包分配算法
我们平常过年过节总爱发红包，但是这个底层的原理是什么样子呢？  首先来看看红包算法的主要要求吧，第一：我们要求随机出来的顺序足够`随机`，这一点很重要，我们等下细讲，第二：我们需要根据给定的红包金额和分配红包个数以及红包上限来随机分配红包。
综上，我们只需要几个前置条件即可：
- 洗牌算法：`shuffle`
- 根据阈值`threshold`设定红包上限

总体上就是这2点，很简单，主要是其中的细节我们需要一一处理：
## 洗牌算法
不知道大家注意到没有，我们平常使用的`Math.random()`其实是一种`伪随机`，我们只要给定固定的种子就能得到一样结果，因此如果我们用`Math.random()`来对红包金额结果进行乱序可能得到的效果并不好，所以我们需要手写一种真正意义上的随机算法：`Fisher–Yates`  
原理也很简单，就是遍历数组，然后将当前元素和以后随机位置的元素进行交换，这样随机的会更加随机，话不多说，看看代码吧。
```
function shuffle(arr) {
  const len = arr.length;
  for(let i = len; i; i--) {
    const index = Math.floor(Math.random() * i);
    [arr[index], arr[i - 1]] = [arr[i - 1], arr[index]];
  }
  return arr;
}
```
就是这么简单就完成一个乱序操作了，那么我们要进入本次的主题了，红包分配
## 红包分配
首先我们需要一个能够在设定的红包上下限之间生成一个红包金额，具体实现如下：
```
function generateRandom(min, max) {
  return parseFloat(Math.random() * (max - min) + min).toFixed(2);
}
```
我们能够根据`min`和`max`在他们两个中间随机选出一个合理的金额，由于设置为浮点数，所以需要固定位数，这里我们选择`toFixed(2)`保留后两位  
终于到了激动人心的时刻，根据给定的金额、红包份数、单个红包上限分配红包了：
```
// 乱序
function shuffle(arr) {
  const len = arr.length;
  for(let i = len; i; i--) {
    const index = Math.floor(Math.random() * i);
    [arr[index], arr[i - 1]] = [arr[i - 1], arr[index]];
  }
  return arr;
}

// 生成随机金额的红包
function generateRandom(min, max) {
  return parseFloat(Math.random() * (max - min) + min).toFixed(2);
}

// 红包分配
function redPacket(money, count, threshold = 0.618) {
  // 保存结果
  let res = [];
  for(let i = 0; i < count; i++) {
    const value = generateRandom(0.01, money * threshold);
    res.push(value);
    money -= value;
  }
  return shuffle(res);
}
// 红包总金额设定为10，一共10份
console.log(redPacket(10, 10));
```