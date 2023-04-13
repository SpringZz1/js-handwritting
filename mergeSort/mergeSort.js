/**
 * 归并算法
 */
let arr = [2, 3, 5, 1, 6, 4];
function mergeSort(arr) {
  if (arr.length > 1) {
    let mid = Math.floor(arr.length / 2);

    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid, arr.length));

    arr = merge(left, right);
  }
  return arr;

  function merge(left, right) {
    let i = 0,
      j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
      result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return result.concat(left.length > i ? left.slice(i) : right.slice(j));
  }
}

console.log(mergeSort(arr));
