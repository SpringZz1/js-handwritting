# 手写ajax
首先，我们本着知其然知其所以然的精神，首先我们要知道什么是`ajax`？`ajax`的原理是什么？  
`ajax`全称(Async JavaScript and XML)，其实就是异步的`JavaScript`和`XML`，是一种创建交互式网页应用的网页开发技术，可以在不重新加载网页的情况下与服务器交换数据，并且更新部分网页。  
`ajax`的原理简单来说就是通过XmlHttpRequest对象来对服务器发送异步请求，从服务获得数据然后用`JavaScript`来操作`DOM`而更新页面  
## ajax流程大致如下
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2535f559af934e9f976d259fcd1135d8~tplv-k3u1fbpfcp-watermark.image?)

## 实现过程
实现`ajax`异步交互需要服务器进行配合，整体流程可以分为以下几步：
- 创建`ajax`的核心对象：`XMLHttpRequest`
- 通过`XMLHttpRequest`对象的`open()`方法和服务端建立链接
- 构建请求所需的数据内容，然后通过`XMLHttpRequest`对象的`send()`方法发送请求给服务器
- 通过`XMLHttpRequest`提供的`onreadystatechange`时间监听服务器的通信状态
- 接收并处理服务端向客户端响应的数据结果
- 将处理结果更新到`HTML`页面中

### 创建`XMLHttpRequest`对象
```
const xhr = new XMLHttpRequest();
```
### 与服务器建立连接
```
xhr.open(method, url, [async], [user], [password])
```
参数说明：
`method`： 请求方法，例如`POST`,`GET`等  
`url`： 请求的服务器地址  
`async`：boolean类型，表示是否执行异步操作，默认为`true`  
`user`：可选的用户名用于身份认证，默认为`null`  
`password`：可选的密码用于身份认证，默认为`null`  
### 给服务端发送数据
```
xhr.send([body])
```
`body`：在`xhr`请求中需要发送的请求体，不传则为`null`，注意：`POST`请求中不需要发送请求体，而是直接将请求内容通过`?`拼接在`url`中  
### 绑定onreadystatechange事件
`onreadystatechange`事件用于监听服务端的通信状态，主要监听属性为`XMLHttpRequest.readyState`,`XMLHttpRequest.readyState`主要有5个状态：  
`0`:`open()`方法还没被调用  
`1`:`open()`方法已经被调用，但是`send()`方法还没被调用  
`2`:`open()`方法已经被调用，响应头和响应体已经返回  
`3`:响应体正在下载中，`requestText`已经获取部分数据  
`4`:整个请求过程已经完成

### 封装
讲了半天，进入实操环节
```
function ajax(options) {
  // 创建XMLHttpRequest对象
  let xhr = new XMLHttpRequest();

  // 初始化参数内容
  options.type = (option.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  const params = options.data;

  // 发送请求
  if(options.type === 'GET') {
    xhr.open('GET', options.url + '?' + params, true);
    xhr.send(null);
  }
  if(options.type === 'POST') {
    xhr.open('POST', options.url, true);
    xhr.send(params);
  }

  // 接收请求
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      let status = xhr.status;
      if(status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      } else {
        option.fail && options.fail(status);
      }
    }
  }
}
```
请求方式如下：
```
ajax({
  type: 'post',
  dataType: 'json',
  data: {},
  url: 'https://xxx',
  success: function(text, xml){ // 成功时的回调
    console.log(text)
  }
  fail: function(status) { // 失败时的回调
    console.log(status);
  }
})
```
