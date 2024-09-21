const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function missingLetter(sentence: string) {
  let map = new Map<string, true>();

  for (let s of sentence) {
    map.set(s, true);
  }

  for (let s of alphabet) {
    if (!map.has(s)) {
      return s;
    }
  }
}

console.log(missingLetter("the quick brown box jumps over a lazy dog"));
