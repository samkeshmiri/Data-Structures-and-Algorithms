export function nonDuplicateObj(str: string) {
  let map = {};

  for (let i = 0; i < str.length; i++) {
    if (map[str[i]]) {
      map[str[i]]++;
    } else {
      map[str[i]] = 1;
    }
  }

  console.log(map);

  for (const letter of str) {
    if (map[letter] == 1) {
      return letter;
    }
  }

  return "all duplicate letters";
}

console.log(nonDuplicateObj("minimum"));
