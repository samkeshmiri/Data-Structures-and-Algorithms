import { DoubleLinkedListNode, DoublyLinkedList } from "./DoublyLinkedList";

export class Queue {
  private queue: DoublyLinkedList;

  constructor() {
    this.queue = new DoublyLinkedList();
  }

  enqueue(node: DoubleLinkedListNode) {
    this.queue.insertAtEnd(node);
  }

  dequeue() {
    return this.queue.deleteFirstNode().data;
  }

  read() {
    return this.queue.readFirstNode();
  }
}
