/**
 * 给你一组异步请求，请你并行发送这些请求，但是请注意，我们限制一次最多3个请求并发
 * 思路：这是一道典型的考察Promise处理问题，可以用Promise.race()来解决
 */
// 异步请求制造函数
function request(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`任务${url}完成`);
    }, 1000);
  }).then((res) => {
    console.log('外部逻辑', res);
  });
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
  // 控制最大并发数
  let max = 3;
  for (const url of urls) {
    let task = request(url);
    pool.push(task);
    task.then(() => {
      console.log(`task: ${task}完成`);
      pool.splice(pool.indexOf(task), 1);
    });
    // 如果超出设定上线
    if (pool.length >= max) {
      await Promise.race(pool);
    }
  }
}
parallelism();
