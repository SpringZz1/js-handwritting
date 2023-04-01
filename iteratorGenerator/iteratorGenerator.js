/**
 * generator使用
 */
function* iteratorGenerator() {
  yield '1st', yield '2nd', yield '3rd';
}

const iterator = iteratorGenerator();

iterator.next(); // {value: '1st', done: false}
iterator.next(); // {value: '2nd', done: false}
iterator.next(); // {value: '3rd', done: true}

/**
 * 总结, generator能够暂停函数执行，返回任意表达式的值，主要应用场景在于:
 * 1. 异步操作的同步化表达
 * 2. 控制流管理
 * 3. 配置iterator接口
 */

/**
 * 手动实现一个iterator
 */

function iteratorGenerator(list) {
  // 用于最终遍历到哪儿了
  let index = 0;
  let len = list.length;
  return {
    // next()函数
    next() {
      // done表示遍历位置, 遍历到终点则done为true, 否则为false
      let done = index >= len;
      let value = !done ? list[index++] : undefined;
      return {
        value: value,
        done: done,
      };
    },
  };
}
function iteratorGenerator(list) {
  let index = 0;
  let len = list.length;
  return {
    next() {
      let done = index >= len;
      let value = !done ? list[index++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
  };
}
