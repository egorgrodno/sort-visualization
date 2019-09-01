import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const getParentIndex = (i: number): number => Math.floor(i / 2)

const siftDown = (arr: number[], start: number, end: number, instructionModule: InstructionModule): void => {
  let root = start

  while (root * 2 <= end) {
    const child = root * 2
    let swap = root

    instructionModule.recordCompare(swap, child)
    if (arr[swap] < arr[child]) {
      swap = child
    }
    if (child + 1 <= end) {
      instructionModule.recordCompare(swap, child + 1)
      if (arr[swap] < arr[child + 1]) {
        swap = child + 1
      }
    }

    if (swap === root) {
      return
    } else {
      instructionModule.recordSwap(root, swap)
      swapInPlace(arr, root, swap)
      root = swap
    }
  }
}

const heapify = (arr: number[], instructionModule: InstructionModule): void => {
  const arrLength = arr.length
  const start = getParentIndex(arrLength - 1)

  for (let i = start; i >= 0; i--) {
    siftDown(arr, i, arrLength - 1, instructionModule)
  }
}

const heapsort = (arr: number[], instructionModule: InstructionModule): void => {
  let end = arr.length - 1
  heapify(arr, instructionModule)

  while (end > 0) {
    instructionModule.recordSwap(0, end)
    swapInPlace(arr, 0, end)
    end--
    siftDown(arr, 0, end, instructionModule)
  }
}

export const heapsortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  heapsort(mutableArray.slice(), instructionModule)
  instructionModule.finalise()

  return instructionModule
}
