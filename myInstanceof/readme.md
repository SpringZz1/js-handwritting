# 手写instanceof
`instanceof`和`typeof`都能用于类型判断，不过与`typeof`不同，`instanceof`只能用于对象类型判断，比如`Array`、`Function`等等，`instanceof`的原理就是根据`原型链`进行向上搜索原型。  
其实说了这么多，也差不多把实现方法说起来了，很简单，就是我们通过原型链进行类型查找。  
```
function myInstanceof(left, right) {
  if(typeof left !== 'object' || typeof left !== 'function' || right === null) {
    throw new Error('不是对象类型数据');
  }
  // getPrototypeOf()能够找到对象的原型
  let proto = Object.getPrototypeOf(left);
  while(true) {
    if(proto === null) return false;
    if(proto = right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function A() {}
const a = new A();
console.log(myInstanceof(a, A)); // true
console.log(myInstanceof(1, A)); // false
```