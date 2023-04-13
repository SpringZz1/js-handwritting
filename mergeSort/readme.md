# 手写归并排序
`归并排序`是建立在归并操作上的一种有效、稳定的排序方法，也是使用分而治之的典型应用。  
将已有序的子序列合并，得到完全有序的序列，即先让每个子序列有序，再使子序列间段之间有序
## 实现思路
- 先选出中间点，`mid = Math.floor(arr.length / 2)`
- 将数组分为左边和右边来分别归并排序`arr.slice(0, mid), arr.slice(mid, arr.length)`
- 将排序好的左右两个有序子序列进行合并，让他们之间形成子序列段有序
- 不断重复上述步骤直到整个序列有序

```
let arr = [2, 3, 5, 1, 6, 4];
function mergeSort(arr) {
  if(arr.length > 1) {
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid, arr.length));

    merge(left, right);
  }
  return arr;

  function merge(left, right) {
    let res = [];
    let i = 0, j = 0;
    while(i < left.length && j < right.length) {
      res.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return res.concat(i < left.length ? left.slice(i) : right[j]);
  }
}

console.log(mergeSort(arr)); // [1, 2, 3, 4, 5, 6]
```