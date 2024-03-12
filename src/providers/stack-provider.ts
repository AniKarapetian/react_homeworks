class Stack<T> {
  private stack: T[];

  constructor() {
    this.stack = [];
  }

  push(item: T): void {
    this.stack.push(item);
  }

  pop(): T | undefined {
    return this.stack.pop();
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    const element: any = this.pop();
    element !== undefined && this.push(element);
    return element === undefined;
  }

  size(): number {
    let elements = [];
    while (!this.isEmpty()) {
      elements.push(this.pop());
    }
    elements.forEach((el: any) => {
      this.push(el);
    });
    return elements.length;
  }

  clear(): void {
    let element = null;
    do {
      element = this.pop();
    } while (element !== undefined);
  }

  getMax(): any {
    let elements = [];
    while (!this.isEmpty()) {
      elements.push(this.pop());
    }
    elements.forEach((el: any) => {
      this.push(el);
    });
    return elements.sort((a: any, b: any) => a - b)[elements.length - 1];
  }
}

export const stack = new Stack<number>();
