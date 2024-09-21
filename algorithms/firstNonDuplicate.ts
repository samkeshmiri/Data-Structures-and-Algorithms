export function nonDuplicate(str: string) {
  let map = new Map<string, number>();

  for (let i = 0; i < str.length; i++) {
    if (map.has(str[i])) {
      const count = map.get(str[i]);
      if (count) {
        map.set(str[i], count + 1);
      }
    } else {
      map.set(str[i], 1);
    }
  }

  for (const letter of str) {
    if (map.get(letter) == 1) {
      return letter;
    }
  }

  return "all duplicate letters";
}

console.log(nonDuplicate("minimum"));


