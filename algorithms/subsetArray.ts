const hashmap = new Map<string, boolean>();
["a", "b", "c"].forEach((i) => hashmap.set(i, true));

console.log(["a", "b", "c", "d"].every((v) => hashmap.has(v)));
