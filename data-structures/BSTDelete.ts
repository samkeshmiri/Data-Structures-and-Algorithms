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

function deleteNode(valueToDelete: number, node: TreeNode) {
  if (!node) return undefined;

  if (valueToDelete > node.value) {
    node.rightChild = deleteNode(valueToDelete, node.rightChild);
    return node;
  }

  if (valueToDelete < node.value) {
    node.leftChild = deleteNode(valueToDelete, node.leftChild);
    return node;
  }

  if (node.value === valueToDelete) {
    if (!node.leftChild) {
      return node.rightChild;
    }

    if (!node.rightChild) {
      return node.leftChild;
    }

    node.rightChild = lift(node.rightChild, node);
  }
}

function lift(node: TreeNode, nodeToDelete: TreeNode): TreeNode {
  if (!node) return node;

  if (node.leftChild) {
    node.leftChild = lift(node.leftChild, nodeToDelete);
    return node;
  } else {
    // no more left children so this is the node we place in the node to delete
    // Replace nodeToDelete's value with the in-order successor's value
    nodeToDelete.value = node.value;
    // Return the right child of the in-order successor
    return node.rightChild;
  }
}

const treeNode1 = new TreeNode(1);
const treeNode3 = new TreeNode(5);
const treeNode2 = new TreeNode(2, undefined, treeNode3);
const root = new TreeNode(3, treeNode1, treeNode2);

console.log(deleteNode(5, root));
