const a = ["a", "b", "c", "d", "c", "a"];

// iterate and add to hashmap <string, num> if value is > 1 return value

export function duplicates(arr: string[]) {
  let map: Map<string, boolean> = new Map();

  for (let letter of arr) {
    if (map.has(letter)) {
      return letter;
    }
    map.set(letter, true);
  }
}

console.log(duplicates(a));
