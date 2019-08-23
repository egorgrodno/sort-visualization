import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const partition = (arr: number[], fromIndex: number, toIndex: number, instructionModule: InstructionModule): number => {
  const pivotIndex = toIndex
  const pivot = arr[pivotIndex]
  let wallIndex = fromIndex

  for (let i = fromIndex; i <= toIndex; i++) {
    const item = arr[i]

    if (i === pivotIndex) {
      swapInPlace(arr, pivotIndex, wallIndex)
      instructionModule.recordSwap(pivotIndex, wallIndex)
    } else {
      instructionModule.recordCompare(i, pivotIndex)

      if (item <= pivot) {
        swapInPlace(arr, i, wallIndex)
        instructionModule.recordSwap(i, wallIndex)
        wallIndex++
      }
    }
  }

  return wallIndex
}

const quickSortInPlace = (arr: number[], fromIndex: number, toIndex: number, instructionModule: InstructionModule): void => {
  if (toIndex - fromIndex < 1) {
    return
  }

  const partitionIndex = partition(arr, fromIndex, toIndex, instructionModule)

  quickSortInPlace(arr, fromIndex, partitionIndex - 1, instructionModule)
  quickSortInPlace(arr, partitionIndex, toIndex, instructionModule)
}

export const quickSortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  quickSortInPlace(mutableArray.slice(), 0, mutableArray.length - 1, instructionModule)
  instructionModule.finalise()

  return instructionModule
}
