/**
 * JS继承主体可以分为四大类，其他的类别分别是在这四种类别上的拓展，我们一个一个来看
 */

/**
 * 1. 借助call继承对象
 * 缺点: 这么做虽然能够借助拿到父类的属性值
 * 但是存在的问题在于父类原型对象中存在的方法子类无法继承到
 */
function Parent1() {
  this.name = 'parent1';
}

function Child1() {
  Parent1.call(this);
  this.type = 'child1';
}
console.log(new Child1());

/**
 * 2. 借助原型链继承对象
 * 这样解决了子类无法继承父类方法的问题，但是问题在于多个子类共享父类对象
 * 修改一个子类对象会导致所有子类属性变化
 */
function Parent2() {
  this.name = 'parent2';
}

function Child2() {
  this.type = 'child2';
}
Child2.prototype = new Parent2();
console.log(new Child2());

/**
 * 3. 组合继承, 既然上述两种方法都存在一定的问题，那我两个结合一下就行了吧？
 * 这种方式已经比较完美了，但是还有一个小瑕疵在于父类构造函数会被执行两次，这是我们不愿意看到的
 */
function Parent3() {
  this.name = 'parent3';
}
function Child3() {
  Parent3.call(this);
  this.type = 'child3';
}
Child3.prototype = new Parent3();
console.log(new Child3());

/**
 * 4. 组合寄生模式，最完美的模式
 * 使用ES6的extend来完成，通过Babel我们会发现实际上使用的就是这种模式
 */
function Parent4() {
  this.name = 'parent4';
}
function Child4() {
  Parent4.call(this);
  this.type = 'child3';
}
Child4.prototype = Object.create(Parent4.prototype);
Child4.prototype.constructor = Child4;
