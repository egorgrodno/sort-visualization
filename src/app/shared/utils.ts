export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function swapArrayValues(arr: any[], i1: number, i2: number): void {
  [ arr[i1], arr[i2] ] = [ arr[i2], arr[i1] ];
}
