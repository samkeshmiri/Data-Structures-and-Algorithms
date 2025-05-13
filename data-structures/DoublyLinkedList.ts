export class DoubleLinkedListNode {
  data: any;
  nextNode: DoubleLinkedListNode;
  previousNode: DoubleLinkedListNode;

  constructor(data: any) {
    this.data = data;
  }
}

export class  DoublyLinkedList {
  private firstNode: DoubleLinkedListNode;
  private lastNode: DoubleLinkedListNode;

  constructor(
    firstNode: DoubleLinkedListNode = null,
    lastNode: DoubleLinkedListNode = null
  ) {
    this.firstNode = firstNode;
    this.lastNode = lastNode;
  }

  readFirstNode() {
    return this.firstNode.data;
  }

  readLastNode() {
    return this.lastNode.data;
  }

  insertAtEnd(value: any) {
    const newNode: DoubleLinkedListNode = new DoubleLinkedListNode(value);

    if (!this.firstNode) {
      this.firstNode = newNode;
      this.lastNode = newNode;
    } else {
      newNode.previousNode = this.lastNode;
      this.lastNode.nextNode = newNode;
      this.lastNode = newNode;
    }
  }

  deleteFirstNode() {
    const firstNode = this.firstNode;
    this.firstNode = firstNode.nextNode;
    return firstNode;
  }

  logAllNodeDataReverse() {
    let currentNode = this.lastNode;
    if (!currentNode) {
      console.log("no nodes");
    }

    while (currentNode) {
      console.log(currentNode.data);
      if (currentNode.previousNode != undefined) {
        currentNode = currentNode.previousNode;
      } else {
        return;
      }
    }
  }
}

const node1 = new DoubleLinkedListNode("node_one");
const node2 = new DoubleLinkedListNode("node_two");
const node3 = new DoubleLinkedListNode("node_three");

node1.nextNode = node2;
node2.nextNode = node3;
node2.previousNode = node1;
node3.previousNode = node2;
const dl = new DoublyLinkedList(node1, node3);

dl.logAllNodeDataReverse();
