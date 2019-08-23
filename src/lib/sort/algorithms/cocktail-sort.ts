import { swapInPlace } from 'lib/utils'
import { InstructionModule } from '../instruction-module'

const cocktailSort = (arr: number[], instructionModule: InstructionModule): void => {
  const mutableArr = arr.slice()
  let leftBoundary = 0
  let rightBoundary = mutableArr.length - 1
  let sorted = true
  let i = 0
  let ltr = true

  while (leftBoundary < rightBoundary) {
    if (ltr && i === rightBoundary) {
      if (sorted) {
        break
      }

      rightBoundary--
      i = rightBoundary - 1
      ltr = false
      sorted = true
      continue
    } else if (!ltr && i === leftBoundary - 1) {
      if (sorted) {
        break
      }

      leftBoundary++
      i = leftBoundary
      ltr = true
      sorted = true
      continue
    }


    instructionModule.recordCompare(i, i + 1)
    if (mutableArr[i] > mutableArr[i + 1]) {
      swapInPlace(mutableArr, i, i + 1)
      instructionModule.recordSwap(i, i + 1)
      sorted = false
    }

    i = ltr ? i + 1 : i - 1
  }
}

export const cocktailSortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  cocktailSort(mutableArray, instructionModule)
  instructionModule.finalise()

  return instructionModule
}
