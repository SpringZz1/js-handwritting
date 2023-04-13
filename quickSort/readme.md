# 手写快速排序
快排也是典中典了，要好好记一下；快排有以下几个特点：
- 速度快，人家都叫快速排序了
- 分而治之，和归并算法一样分治
- 不稳定
```
let arr = [2, 3, 5, 1, 6, 4];
function quickSort(arr) {
  quick(arr, 0, arr.length - 1);
  return arr;

  function quick(arr, start, end) {
    if(start < end) {
      let mid = sort(arr, start, end);
      quick(arr, 0, mid - 1);
      quick(arr, mid + 1, end);
    }
  }

  function sort(arr, start, end) {
    let pivot = arr[start];
    let left = start;
    let right = end;
    while(left < right) {
      while(left < right && arr[right] > pivot) {
        right--;
      }
      arr[left] = arr[right];
      while(left < right && arr[left] < pivot) {
        left++;
      }
    }
    arr[left] = pivot;
    return left;
  }
}

console.log(quickSort(arr)); // [1, 2, 3, 4,, 5, 6]
```