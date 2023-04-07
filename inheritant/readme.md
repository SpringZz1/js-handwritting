# 手写继承方法
`JavaScript`最让人无语的一个地方就是它没有继承，不过人家一开始也没想到自己能有光宗耀祖的一天，我一个10天被发明出来的`脚本`语言居然能有这么一天，发展出了`前端工程师`这个职业呢？说好的前端是只鸡撒把米都能学呢？没办法，既然大家的热情这么高，那我`JavaScript`今天也要继承！不过这也只能让社区大佬做贡献了，多亏了社区，让`JavaScript`逐渐完善，不过也是因为`JavaScript`自身的问题，带来了许许多多的库，导致做项目的时候面对多个库管理也是件麻烦事情，不过这也是后话了，还是来看看今天的主角，`JavaScript`继承方法。  
`JavaScript`继承可以分为四大类：
- 借助`call()`继承
- 借助`原型链`继承
- `组合式`继承
- `寄生组合式`继承

## 借助`call()`继承
借助`call()`继承也称为`借用构造函数`继承，我们先看实现再来谈谈他的优缺点：
```
function Parent() {
  this.names = ['kevin', 'daisy'];
}

function Child() {
  Parent.call(this);
  this.type = 'child';
}

let child = new Child();
let child1 = new Child();

child.names.push('test');
console.log(child.names); // ['kevin', 'daisy', 'test']
console.log(child1.names); // ['kevin', 'daisy']
```
可以看到我们使用`call()`的好处在于子类修改引用属性不会对其他子类造成影响，并且子类能够向父类传参，但是缺点在于方法都在构造函数中定义，每次创建一个新的实例都要创建一个方法
## 借助`原型链`继承
```
function Parent() {
  this.names = ['kevin', 'daisy'];
}

function Child() {
  this.type = 'child';
}

Child.prototype = new Parent();

let child = new Child();
let child1 = new Child();

child.names.push('test');
console.log(child.names); // ['kevin', 'daisy', 'test']
console.log(child1.names); // ['kevin', 'daisy', 'test']
```
可以看到使用`原型链`继承能够避免每次创建实例的时候都重新创建方法的问题，但是带来了一个新的问题，通过原型链继承时所有的实例都共享一个原型，导致实例修改一个引用类型的数据时会让所有的属性发生变化，这明显是我们不想看到的，同时，这种方法在创建Child的实例时，不能向Parent传参
## `组合式`继承
上述两种方法好像都有彼此的缺点，那我们试试看把他们两个组合一下？其实还真就是这么做
```
function Parent() {
  this.names = ['kevin', 'daisy'];
}

function Child() {
  Parent.call(this);
  this.type = 'child';
}

Child.prototype = new Parent();

let child = new Child();
let child1 = new Child();

child.names.push('test');
console.log(child.names); // ['kevin', 'daisy', 'test']
console.log(child1.names); // ['kevin', 'daisy']
```
这样就没问题了，融合了`原型链`继承和`call`继承的优点，既能够在初始化的时候传参，也避免了实例共享引用数据类型的问题，但是还是难免的要多次创建函数

## `寄生组合式`继承
`组合式`继承的问题在于创建实例的时候会调用两次父类构造函数，那我们应该怎么避免这个问题呢？这时候`Object.create`闪亮登场，通过中转的方式来避免多次创建父类构造函数的问题
```
function Parent() {
  this.names = ['kevin', 'daisy'];
}

function Child() {
  Parent.call(this);
  this.type = 'child';
}
// 通过Object.create来中转
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```
就是这么简单，一个简单的trick就能更完美的实现继承，引用《JavaScript高级程序设计》中对`寄生组合式`继承的夸赞：  
这种方法的高效率体现在它只调用了一次Parent构造函数，而且因此避免了Parent.prototype上面创建不必要、不多余的属性。与此同时，原型链还能保持不变；因此，还能正常的使用instanceof和isPrototypeOf。是目前开发人员公认的最理想的继承范式。  
同时，大家都知道`ES6`新增的`class`语法，实际上就是语法糖，而`class`语法中的继承`extends`如果我们用`Babel`进行编译，你就会发现实际上就是我们上文写的`寄生组合式`继承，可见其优秀