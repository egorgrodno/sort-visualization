import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const partition = (arr: number[], start: number, end: number, instructionModule: InstructionModule): number => {
  const pivotIndex = end
  const pivot = arr[pivotIndex]
  let wallIndex = start

  for (let i = start; i <= end; i++) {
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

const quicksortInPlace = (arr: number[], start: number, end: number, instructionModule: InstructionModule): void => {
  if (end - start < 1) {
    return
  }

  const partitionIndex = partition(arr, start, end, instructionModule)

  quicksortInPlace(arr, start, partitionIndex - 1, instructionModule)
  quicksortInPlace(arr, partitionIndex, end, instructionModule)
}

export const quicksortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  quicksortInPlace(mutableArray.slice(), 0, mutableArray.length - 1, instructionModule)
  instructionModule.finalise()

  return instructionModule
}
