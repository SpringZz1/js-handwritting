/**
 * 思路
 * AJAX就是异步JavaScript和XML，是一种一种创建交互式网页应用的网页开发技术，可以在不重新加载网页的情况下，与服务器交换数据并更新部分网页
 * 具体实现主要分为四步
 * 1. 创建xhr实例
 * 2. 设置xhr实例的open属性，主要属性包括请求方式，例如GET、POST等，以及请求的url
 * 3. 设置完open()之后就开始send()
 * 4. 使用onReadyState()监听state变化，如果变为4则请求完成
 */

// 封装一个ajax请求
function ajax(options) {
  // 1. 创建xhr实例
  const xhr = new XMLHttpRequest();

  // 2. 初始化请求参数
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  const params = options.data;

  // 3. 发送请求, send()
  if (options.type === 'GET') {
    // get请求请求头拼接即可
    xhr.open('GET', options.url + '?' + params, true);
    // get请求不需要发送请求体
    xhr.send(null);
  }
  if (options.type === 'POST') {
    xhr.open('POST', options.url, true);
    xhr.send({ params });
  }

  // 接收请求
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        // 成功则接收相应内容
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
}

/**
 * 用法:
 *
 */
ajax({
  type: 'post',
  dataType: 'json',
  data: {},
  url: 'http://xxxx',
  success: function (text, xml) {
    console.log(text);
  },
  fail(status) {
    console.log(status);
  },
});
