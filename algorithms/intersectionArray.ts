const a = ["a", "b", "c"];
const b = ["a", "e"];

const hashmap = new Map<string, true>();
a.forEach((e) => hashmap.set(e, true));

export function intersection() {
  let intersection: string[] = [];
  b.forEach((e) => {
    if (hashmap.has(e)) intersection.push(e);
  });
  console.log(intersection);
}

intersection();
