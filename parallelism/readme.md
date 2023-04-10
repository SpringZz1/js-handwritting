# 手写并发处理
这是一道很考综合能力的题，很经典，个人认为面试靠这种题才算是有意思，天天让你做算法属实无聊，只会把人锻练成做题机器，但还是现在僧多肉少大家都是乱卷，难顶-_-  
题目：给你一些并发请求，请你并发发送请求，但是请注意，并发量是有上限的，并不是让你全部都一次并发请求  
思路：并发请求简单，我们直接拿到请求开始遍历即可，那这个并发上限怎么办呢？也简单，我们用一个并发池来记录当前并发量，如果超过了设置的并发量，则我们使用Promise.race来一个一个的发送请求即可，大致思路就是如此，详细的大家可以看下代码：
```
// 异步请求
function request(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`任务${url}完成`);
    }, 1000);
  }).then((res) => {
    console.log(`外部逻辑`, res);
  })
}

let urls = [
  'bytedance.com',
  'tencent.com',
  'alibaba.com',
  'microsoft.com',
  'apple.com',
  'hulu.com',
  'amazon.com',
]; // 请求地址

async function parallelism(urls) {
  // 并发池
  let pool = [];
  // 控制并发上限
  let max = 3;
  for(const url of urls) {
    let task = request(url);
    // 加入并发池
    pool.push(task);
    task.then(() => {
      console.log(`task${task}完成`);
      // 任务完成出并发池
      pool.splice(pool.indexOf(task), 1);
    });
    // 如果并发池超过上限
    if(pool.length >= max) {
      await Promise.race(pool);
    }
  }
}

parallelism();
```
这道题考察的内容比较多，也比较有意思，是需要慢慢看，慢慢理解的题目，我们能够学到Promise.race的具体用法