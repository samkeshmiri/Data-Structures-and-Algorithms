export class Stack {
  private items: any[];

  constructor() {
    this.items = [];
  }

  push(item: any) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  read() {
    return this.items[this.items.length - 1];
  }
}
