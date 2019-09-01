import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const bubbleSort = (arr: number[], instructionModule: InstructionModule): void => {
  const mutableArr = arr.slice()
  let end = mutableArr.length - 1
  let sorted = true

  for (let i = 0; i <= end; i++) {
    if (i === end) {
      if (sorted) {
        break
      }

      i = -1
      sorted = true
      end--
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
