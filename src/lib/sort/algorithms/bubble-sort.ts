import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const bubbleSort = (arr: number[], instructionModule: InstructionModule): void => {
  const mutableArr = arr.slice()
  let rightBoundary = mutableArr.length - 1
  let sorted = true

  for (let i = 0; i <= rightBoundary; i++) {
    if (i === rightBoundary) {
      if (sorted) {
        break
      }

      i = -1
      sorted = true
      rightBoundary--
      continue
    }

    instructionModule.recordCompare(i, i + 1)
    if (mutableArr[i] > mutableArr[i + 1]) {
      swapInPlace(mutableArr, i, i + 1)
      instructionModule.recordSwap(i, i + 1)
      sorted = false
    }
  }
}

export const bubbleSortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  bubbleSort(mutableArray, instructionModule)
  instructionModule.finalise()

  return instructionModule
}
