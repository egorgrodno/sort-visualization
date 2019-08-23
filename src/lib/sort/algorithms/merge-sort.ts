import { InstructionModule } from '../instruction-module'

const merge = (arr1: number[], arr2: number[], iOffset1: number, iOffset2: number, instructionModule: InstructionModule): number[] => {
  const result: number[] = []
  let i1 = 0
  let i2 = 0

  while (i1 < arr1.length && i2 < arr2.length) {
    instructionModule.recordCompare(i1 + iOffset1, i2 + iOffset2)

    if (arr1[i1] < arr2[i2]) {
      instructionModule.recordSwapToShadow(i1 + iOffset1)
      result.push(arr1[i1])
      i1++
    } else {
      instructionModule.recordSwapToShadow(i2 + iOffset2)
      result.push(arr2[i2])
      i2++
    }
  }

  while (i1 < arr1.length) {
    instructionModule.recordSwapToShadow(i1 + iOffset1)
    result.push(arr1[i1])
    i1++
  }

  while (i2 < arr2.length) {
    instructionModule.recordSwapToShadow(i1 + iOffset2)
    result.push(arr2[i2])
    i2++
  }

  for (let i = 0; i < result.length; i++) {
    const value = i < arr1.length
      ? arr1[i]
      : arr2[i - arr1.length]
    instructionModule.recordSwapFromShadow(i + iOffset1, value, result[i])
  }

  return result
}

const mergeSort = (arr: number[], indexOffset: number, instructionModule: InstructionModule): number[] => {
  if (arr.length < 2) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const leftPartition = arr.slice(0, middle)
  const rightPartition = arr.slice(middle)

  return merge(
    mergeSort(leftPartition, indexOffset, instructionModule),
    mergeSort(rightPartition, indexOffset + middle, instructionModule),
    indexOffset,
    indexOffset + middle,
    instructionModule,
  )
}

export const mergeSortAlgorithm = (mutableArray: number[]): InstructionModule => {
  const instructionModule = new InstructionModule(mutableArray)
  mergeSort(mutableArray, 0, instructionModule)
  instructionModule.finalise()

  return instructionModule
}
