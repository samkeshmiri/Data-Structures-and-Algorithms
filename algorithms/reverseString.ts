import { Stack } from "../DataStructures/Stack";

function reverseString(str: string) {
  const stack = new Stack();

  for (const char of str) {
    stack.push(char);
  }

  let reverse = "";
  while (stack.read()) {
    reverse += stack.pop();
  }

  console.log(reverse);
}

reverseString("abcde");
