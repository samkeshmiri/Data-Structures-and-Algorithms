const a = ["a", "b", "c"];
const b = ["a", "b", "c", "d"];

const hashmap = new Map<string, boolean>();

a.forEach((v) => {
  hashmap.set(v, true);
});

function c() {
  return b.every((v) => hashmap.has(v));
}

console.log(c());

export {};
