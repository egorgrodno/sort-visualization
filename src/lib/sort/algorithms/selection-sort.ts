import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const selectionSortInPlace = (arr: number[], instructionModule: InstructionModule): void => {
  const arrLength = arr.length
  let leftBoundary = 0
  let targetIndex = -1

  for (let i = leftBoundary; i < arrLength; i++) {
    if (i === leftBoundary) {
      targetIndex = i
      continue
    }

    instructionModule.recordCompare(i, targetIndex)
    if (arr[i] < arr[targetIndex]) {
      targetIndex = i
    }

    if (i === arrLength - 1) {
      swapInPlace(arr, targetIndex, leftBoundary)
      instructionModule.recordSwap(targetIndex, leftBoundary)
      i = leftBoundary++
    }
  }
}

export const selectionSortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  selectionSortInPlace(mutableArray.slice(), instructionModule)
  instructionModule.finalise()

  return instructionModule
}
