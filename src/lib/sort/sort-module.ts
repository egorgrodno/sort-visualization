import { makeIntArr } from 'lib/utils'
import { algorithmMap, AlgorithmType } from './algorithm'
import { Instruction } from './instruction'
import { InstructionModule } from './instruction-module'

export class SortModule {
  private originArr: number[] = []
  private mutableArr: number[] = []

  private instructionModule = this.recordSortInstructions()

  constructor(
    private algorithm: AlgorithmType,
    private arraySize: number,
  ) {
    this.setArraySize(this.arraySize)
  }

  private recordSortInstructions(): InstructionModule {
    // tslint:disable-next-line:no-non-null-assertion
    return algorithmMap.get(this.algorithm)!.fn(this.mutableArr)
  }

  private setOriginArr(arr: number[]): void {
    this.originArr = arr
    this.setMutableArr(arr)
  }

  private setMutableArr(arr: number[]): void {
    this.mutableArr = arr.slice()
    this.instructionModule = this.recordSortInstructions()
  }

  // Public API
  public getAlgorithm(): AlgorithmType {
    return this.algorithm
  }

  public setAlgorithm(algorithm: AlgorithmType): void {
    this.algorithm = algorithm
    this.setMutableArr(this.originArr)
  }

  public getArraySize(): number {
    return this.arraySize
  }

  public setArraySize(size: number): void {
    this.arraySize = size
    this.setOriginArr(makeIntArr(size, { shuffle: true }))
  }

  public getArray(): number[] {
    return this.mutableArr
  }

  public reset(): void {
    this.setMutableArr(this.originArr)
  }

  public shuffle(): void {
    this.setOriginArr(makeIntArr(this.arraySize, { shuffle: true }))
  }

  public sort(): void {
    this.setOriginArr(makeIntArr(this.arraySize))
  }

  public reverse(): void {
    this.setOriginArr(this.originArr.slice().reverse())
  }

  // Instructions
  public prev(): boolean {
    return this.instructionModule.prev()
  }

  public next(): boolean {
    return this.instructionModule.next()
  }

  public getCurrentInstruction(): Instruction | undefined {
    return this.instructionModule.getCurrentInstruction()
  }

  public getComparisonCount(): number {
    return this.instructionModule.getComparisonCount()
  }

  public getSwapCount(): number {
    return this.instructionModule.getSwapCount()
  }
}
