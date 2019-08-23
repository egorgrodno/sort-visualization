/**
 * Returns random integer [0, n)
 */
export const random = (n: number): number =>
  // tslint:disable-next-line:no-bitwise
  Math.random() * n | 0

export const swapInPlace = (arr: number[], i1: number, i2: number): void => {
  const temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
}

const shuffleInPlace = (arr: number[]): void => {
  for (let i = 0, arrSize = arr.length; i < arrSize; i++) {
    swapInPlace(arr, i, random(arrSize))
  }
}

export const makeIntArr = (size: number, conf: { shuffle?: boolean } = {}): number[] => {
  const arr = Array
    .from({ length: size })
    .map((_, index) => index + 1)

  if (conf.shuffle) {
    shuffleInPlace(arr)
  }

  return arr
}
