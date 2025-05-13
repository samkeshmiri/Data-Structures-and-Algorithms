function maximum(arr: number[]) {
  if (arr.length == 1) {
    return arr[0];
  }

  const maxRemainder = maximum(arr.slice(1, arr.length));

  if (arr[0] > maxRemainder) {
    return arr[0];
  } else {
    return maxRemainder;
  }
}

console.log(maximum([1, 20, 3, 4]));
