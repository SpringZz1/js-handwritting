# 手写数组扁平化
数组扁平化，顾名思义，就是让多层包裹的数组变成只有一层包裹的数组结构，假如我们有以下结构的数组`[1, [2, [3, 4]]]`，通过数组扁平化，我们能变成这个样子`[1, 2, 3, 4]`。  
接下来介绍几种扁平化方法：
- `递归`
- `reduce`
- `ES6`的`...`拓展符号
## 递归
不是要解构吗？那我每次遇到嵌套的数组解构就开始`递归`到不是数组形式即可，这么说有点抽象，看下代码怎么说：
```
let a = [1, [2, [3, 4]]];

function flatten(arr) {
  let res = [];
  for(let i = 0; i < arr.length; i++) {
    // 如果是数组解构，则递归
    if(Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
```
是不是还可以？确实就是如此
## reduce
`reduce`一直是我需要加强的地方，很多地方都能够用到reduce，还是需要多学多做  
```
let a = [1, [2, [3, 4]]];

function flatten(arr) {
  arr.reduce((prev, cur) =>{
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
  },[])
}
```

## ES6的...运算符
`ES6`的`...`运算符是新的特性，有一个作用就是能够取出参数对象的所有可遍历属性，拷贝到当前对象之中，但是`...`运算符只能扁平一层，不过我们还能利用`some`来判断是否还是数组类型
```
let a = [1, [2, [3, 4]]];

function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].conat(...arr);
  }
  return arr;
}
```
这个`...`运算符来进行数组扁平化还是挺帅的，要好好学习一下