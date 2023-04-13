/**
 * 快速排序
 */
let arr = [2, 3, 5, 1, 6, 4];
function quickSort(arr) {
  quick(arr, 0, arr.length - 1);
  return arr;

  function quick(arr, start, end) {
    if (start < end) {
      let mid = sort(arr, start, end);
      quick(arr, 0, mid - 1);
      quick(arr, mid + 1, end);
    }
  }
  function sort(arr, start, end) {
    let pivot = arr[start];
    let left = start,
      right = end;
    while (left !== right) {
      while (left < right && pivot <= arr[right]) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && pivot >= arr[left]) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
  }
}

console.log(quickSort(arr));
