import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const insertionSortInPlace = (arr: number[], instructionModule: InstructionModule): void => {
  for (let i = 1; i < arr.length; i++) {
    for (let k = i; k > 0; k--) {
      instructionModule.recordCompare(k, k - 1)
      if (arr[k - 1] > arr[k]) {
        instructionModule.recordSwap(k, k - 1)
        swapInPlace(arr, k, k - 1)
      } else {
        break
      }
    }
  }
}

export const insertionSortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  insertionSortInPlace(mutableArray.slice(), instructionModule)
  instructionModule.finalise()

  return instructionModule
}
