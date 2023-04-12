# 手写选择排序
选择排序基本思想是在未排序的数列中找到最小或者最大的数，然后将其放到数组的其实位置，然后继续从剩余未排序的元素中继续寻找最小或者最大的元素，然后放到已经排序的数组的末尾，以此类推，知道所有元素排序完毕
```
let arr = [2, 3, 5, 1, 6, 4];
function insertionSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    [arr[minIndex], arr[i]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
console.log(selectionSort(arr)); // [1, 2, 3, 4, 5, 6]
```