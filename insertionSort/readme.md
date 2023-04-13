# 手写插入排序
插入排序是一种稳定的排序算法，它的主要思路是将数组默认为部分有序部分无序，将无序的部分中选择出最大或者最小的插入到有序部分的位置
```
let arr = [2, 3, 5, 1, 6, 4];
function insertionSort(arr) {
  for(let i = 1; i < arr.length; i++) {
    let preIndex = i - 1;
    let cur = arr[i];
    while(preIndex >= 0 && arr[preIndex] > cur)  {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = cur;
  }
  return arr;
}

console.log(insertionSort(arr)); // [1, 2, 3, 4, 5, 6]
```