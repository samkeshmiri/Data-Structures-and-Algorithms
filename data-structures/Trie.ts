import * as readline from "node:readline";

class TrieNode {
  children: Record<string, TrieNode>;

  constructor(children: Record<string, TrieNode> = {}) {
    this.children = children;
  }
}

class Trie {
  rootNode: TrieNode;

  constructor(rootNode: TrieNode = new TrieNode()) {
    this.rootNode = rootNode;
  }
}

const trie = new Trie(
  new TrieNode({
    c: new TrieNode({
      a: new TrieNode({
        t: new TrieNode({ "*": new TrieNode() }), // adding the * means when we come to collect all words the * indicates that it is the end of the word and all the previous letters can be pushed into the words array
        b: new TrieNode({ "*": new TrieNode() }),
      }),
    }),
  })
);

function search(node: TrieNode, str: string): TrieNode {
  let currentNode = node;

  for (const char of str) {
    if (currentNode.children[char]) {
      currentNode = currentNode.children[char];
    } else {
      return null;
    }
  }

  return currentNode;
}

function insert(rootNode: TrieNode, str: string) {
  let currentNode = rootNode;

  for (const char of str) {
    if (currentNode.children[char]) {
      currentNode = currentNode.children[char];
    } else {
      currentNode.children[char] = new TrieNode(); // set the new key (which doesn't exist) to be char 'o' in this case
      currentNode = currentNode.children[char]; // follow new node. i.e. o's children: ugh
    }
  }

  currentNode.children["*"] = null;

  return rootNode;
}

function collectAllWords(
  node: TrieNode,
  word: string = "", // when a string is modified, it creates a new word instead of modifying the original string. so on each call in the stack it only has access to the original string. when we unravel the chain
  words: string[] = [] // an array can be passed up and down a call stack because it remains the same object in memory even when we add new values to it. (same for hash tables)
) {
  let currentNode = node;

  for (const key in currentNode.children) {
    // loop through Record keys using for... in
    const node = currentNode.children[key];
    if (key === "*") {
      // end of word
      words.push(word);
    } else {
      // if in middle of word
      collectAllWords(node, word + key, words); // recursion on the child node
    }
  }

  return words;
}

function autocomplete(rootNode: TrieNode, prefix: string) {
  // e.g. search 'ca' // return ['t', 'b']
  let currentNode = search(rootNode, prefix); // returns the 'a' node

  if (!currentNode) {
    return undefined;
  } else {
    return collectAllWords(currentNode); // return all the 'words' (which are prefixes, because our starting word is 'ca') starting from the 'a' node
  }
}
// console.log(search(trie.rootNode, "cab"));
// console.log(JSON.stringify(insert(trie.rootNode, "cough"), null, 2));
// console.log(collectAllWords(trie.rootNode));
// console.log(autocomplete(trie.rootNode, "ca"));

function traverse(node: TrieNode) {
  let currentNode = node;

  for (const key in currentNode.children) {
    console.log(key);

    traverse(currentNode.children[key]);
  }
}

// traverse(trie.rootNode);

function autocorrect(node: TrieNode, searchTerm: string) {
  let wordFoundSoFar = "";
  let currentNode = node;

  for (const char of searchTerm) {
    if (node.children[char]) {
      wordFoundSoFar += char;
      currentNode = node.children[char];
    } else {
      return wordFoundSoFar + collectAllWords(currentNode)[0];
    }
  }

  return searchTerm;
}

console.log(autocorrect(trie.rootNode, "cax"));

function commandLineAutoComplete() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
  });

  rl.prompt();
  let currentInput = "";

  rl.on("line", (line) => {
    currentInput = line.trim();
    console.log(`You entered: ${currentInput}`);
    rl.prompt();
  });

  process.stdin.setRawMode(true);
  // process.stdin.resume();
  // process.stdin.setEncoding("utf8");

  process.stdin.on("data", (char: string) => {
    // Handle backspace
    if (char === "\u0008" || char === "\u007f") {
      currentInput = currentInput.slice(0, -1);
    }

    currentInput += char;

    // Fetch and display suggestions
    const suggestions = autocomplete(trie.rootNode, currentInput);
    if (suggestions.length > 0) {
      console.clear();
      console.log(
        `Suggestions for "${currentInput}": ${suggestions.join(", ")}`
      );
    }

    // Keep the prompt visible
    rl.prompt(true);
  });
}

// commandLineAutoComplete();
