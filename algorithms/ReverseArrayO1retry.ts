const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function reverse() {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    start++;
    end--;
  }
  console.log(arr);
}

reverse();
