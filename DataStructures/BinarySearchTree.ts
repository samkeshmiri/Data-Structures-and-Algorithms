class TreeNode {
  value: number;
  leftChild?: TreeNode;
  rightChild?: TreeNode;

  constructor(value: number, leftChild?: TreeNode, rightChild?: TreeNode) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

function search(
  node: TreeNode | undefined,
  searchValue: number
): TreeNode | undefined {
  if (!node) return undefined;

  if (node.value == searchValue) return node;

  let foundNode: TreeNode | undefined;
  if (searchValue < node.value) {
    if (node.leftChild) {
      foundNode = search(node.leftChild, 5);
    }
  } else {
    if (node.rightChild) {
      foundNode = search(node.rightChild, 5);
    }
  }

  return foundNode;
}

// good for unsorted arrays
function insert(node: TreeNode, insertionNode: TreeNode) {
  if (node.value == insertionNode.value) return node;

  if (insertionNode.value > node.value) {
    insert(node.rightChild!, insertionNode);
  } else {
    node.rightChild = insertionNode;
    return insertionNode;
  }

  if (insertionNode.value < node.value) {
    insert(node.leftChild!, insertionNode);
  } else {
    node.leftChild = insertionNode;
    return insertionNode;
  }

  return undefined;
}

// no child deletion:
// if the node being deleted has no children, delete it
// one child deletion:
// if the node has one child delete the node and plug child into the spot where deleted node was
// two child deletion:
// replace with the successor node, whose value is the least of all values greater than the deleted node
// visit right child of deleted value, then keep visiting the left child of each subsequent child until no more left children
// if successor has a right child, take the former right child of the successor and make it the left child of the former parent of successor
function deleteNode(valueToDelete: number, node: TreeNode) {
  if (!node) return undefined;

  // search for the node to delete
  if (valueToDelete < node.value) {
    if (node.leftChild) {
      node.leftChild = deleteNode(valueToDelete, node.leftChild);
      return node;
    }
  }

  if (valueToDelete > node.value) {
    if (node.rightChild) {
      node.rightChild = deleteNode(valueToDelete, node.rightChild);
      return node;
    }
  }

  // node to delete is found
  if (valueToDelete == node.value) {
    // handle the three cases
    // case 0 and 1 (0 or 1 child)
    if (!node.leftChild) {
      return node.rightChild; // either the right child or null (i.e. node is a leaf node) will be returned
    }
    if (!node.rightChild) {
      return node.leftChild;
    }
    // case 2 (2 children)
    node.rightChild = lift(node.rightChild, node);
    return node;
  }
}

function lift(node: TreeNode, nodeToDelete: TreeNode) {
  if (!node) return node;

  if (node.leftChild) {
    node.leftChild = lift(node.leftChild, nodeToDelete);
    return node;
  } else {
    // Replace nodeToDelete's value with the in-order successor's value
    nodeToDelete.value = node.value;
    // Return the right child of the in-order successor
    return node.rightChild;
  }
}

function traverse(node: TreeNode) {
  if (!node) {
    return;
  }
  traverse(node.leftChild!);
  console.log(node.value);
  traverse(node.rightChild!);
}

const treeNode1 = new TreeNode(1);
const treeNode3 = new TreeNode(3);
const root = new TreeNode(2, treeNode1, treeNode3);
console.log(root);
// console.log(search(root, 5));
// console.log(insert(root, new TreeNode(10)));

traverse(root);
