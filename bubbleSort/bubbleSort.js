/**
 * 冒泡排序
 */
let arr = [2, 3, 5, 1, 6, 4];
// function bubbleSort(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }
//   return arr;
// }

/**
 * 优化版冒泡
 */
function bubbleSort(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let post = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        post = j;
      }
    }
    post = i;
  }
  return arr;
}

console.log(bubbleSort(arr));
