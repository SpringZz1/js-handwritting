/**
 * 插入排序
 */
let arr = [2, 3, 5, 1, 6, 4];
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let preIndex = i - 1;
    let cur = arr[i];
    while (preIndex >= 0 && cur < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = cur;
  }
  return arr;
}
console.log(insertionSort(arr));
