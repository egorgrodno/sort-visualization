export interface LinkedListNode<T, N> {
  data: T
  next: N | null
}

export class LinkedList<T, N extends LinkedListNode<T, N>> {
  private head: N | null = null
  private tail: N | null = null
  private length = 0

  constructor(private createNode: (data: T) => N) {}

  public append(data: T): this {
    const node = this.createNode(data)
    this.length++

    if (!this.head || !this.tail) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }

    return this
  }

  private *iterator(): IterableIterator<T> {
    let currentNode = this.head

    while (currentNode) {
      yield currentNode.data
      currentNode = currentNode.next
    }
  }

  public toArray(): T[] {
    const data: T[] = Array.from({ length: this.length })
    let i = 0

    for (const value of this.iterator()) {
      data[i++] = value
    }

    return data
  }
}
