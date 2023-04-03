# 模拟实现new
<code>new</code>操作符在<code>c++</code>和<code>java</code>等流行语言中是超级常见的方法，一句话来说就是能够根据构造函数创造新的对象实例，不过在<code>js</code>中连对象都没有，所谓的对象继承我认为也是一种“委托”机制，对象之间的继承是通过原型链来完成的，所以哪来的对象概念呢？不过既然大家都面向对象，那我<code>js</code>也要面向对象，那么？该怎么实现呢？且听我给你道来：  
说起来也容易，我们上面不是说了吗，<code>js</code>实现<code>new</code>方法是通过<code>原型链</code>的方法来实现的，只要创建一个新的对象<code>obj</code>，然后通过<code>call</code>或者<code>apply</code>改变它的<code>this</code>指向就行了，不过需要注意一点就是new方法需要判断它返回的对象的数据类型，如果返回<code>object</code>类型，则需要返回改变了后的结果，否则该返回什么就是什么，听起来有点抽象，我们精炼一下就是以下三点：
- <code>new</code>方法内部创建新的对象<code>obj</code>，将<code>obj</code>的原型和传入的函数原型连接
- 将<code>obj</code>的this指向指向传入的函数原型，结果为ret
- 判断<code>obj</code>作为构造函数时返回的值的数据类型，如果返回的是<code>object</code>类型，则只返回该<code>object</code>类型的数据，否则就全部返回

直接看代码
```
function objFactory(func, ...args) {
  // 第一步
  let obj = Object.create(func.prototype);
  // 第二步
  let ret = func.apply(obj, args);
  // 第三步
  return typeof ret === 'object' ? ret : obj;
}
```
重点还是第三步，根据返回的结果来判断，如果是对象则只返回对象中的属性，如果返回一个基本类型的属性，则直接全部返回