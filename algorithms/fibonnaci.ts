function fib(n: number, memo: {}) {
  if (n === 1 || n === 0) {
    return n;
  }

  if (memo[n]) {
    return memo[n];
  } else {
    memo[n] = fib(n - 2, memo) + fib(n - 1, memo);
  }

  return memo[n];
}

console.log(fib(6, {}));
