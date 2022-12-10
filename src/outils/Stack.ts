interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

export class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Stack has reached max capacity, you cannot add more items');
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  iterate(callback: (value: T, index: number) => void): void {
    for (let i = 0; i < this.size(); i++) {
      callback(this.storage[i], i);
    }
  }

  toArray(): T[] {
    return this.storage;
  }

  size(): number {
    return this.storage.length;
  }
}
