import { env } from 'environments/environment'
import { swapInPlace } from 'lib/utils'
import { Instruction, InstructionType, InstructionList } from './instruction'

export class InstructionModule {
  private instructionList = new InstructionList()
  private instructionArr: Instruction[] = []
  private instructionCount = 0
  private index = -1
  private comparisonCount = -1
  private swapCount = -1

  constructor(private mutableArr: number[]) {}

  public recordSwap(i1: number, i2: number): void {
    this.instructionList.append({ type: InstructionType.Swap, i1, i2 })
  }

  public recordCompare(i1: number, i2: number): void {
    this.instructionList.append({ type: InstructionType.Compare, i1, i2 })
  }

  public recordSwapToShadow(i: number): void {
    this.instructionList.append({ type: InstructionType.SwapToShadow, i })
  }

  public recordSwapFromShadow(i: number, value: number, shadowValue: number): void {
    this.instructionList.append({ type: InstructionType.SwapFromShadow, i, value, shadowValue })
  }

  public finalise(): void {
    this.instructionArr = this.instructionList.toArray()
    this.instructionCount = this.instructionArr.length
    this.comparisonCount = this.swapCount = 0
  }

  private applyInstruction(instruction: Instruction): void {
    switch (instruction.type) {
      case InstructionType.Compare:
        this.comparisonCount++
        break

      case InstructionType.Swap:
        swapInPlace(this.mutableArr, instruction.i1, instruction.i2)
        this.swapCount++
        break

      case InstructionType.SwapToShadow:
        this.swapCount++
        break

      case InstructionType.SwapFromShadow:
        this.mutableArr[instruction.i] = instruction.shadowValue
        this.swapCount++
        break

      default:
        throw new Error('Unhandled instruction')
    }
  }

  private reverseInstruction(instruction: Instruction): void {
    switch (instruction.type) {
      case InstructionType.Compare:
        this.comparisonCount--
        break

      case InstructionType.Swap:
        swapInPlace(this.mutableArr, instruction.i1, instruction.i2)
        this.swapCount--
        break

      case InstructionType.SwapToShadow:
        this.swapCount--
        break

      case InstructionType.SwapFromShadow:
        this.mutableArr[instruction.i] = instruction.value
        this.swapCount--
        break

      default:
        throw new Error('Unhandled instruction')
    }
  }

  public getCurrentInstruction(): Instruction | undefined {
    return this.instructionArr[this.index]
  }

  public getComparisonCount(): number {
    return this.comparisonCount
  }

  public getSwapCount(): number {
    return this.swapCount
  }

  public next(): boolean {
    if (this.index < this.instructionCount) {
      if (++this.index < this.instructionCount) {
        this.applyInstruction(this.instructionArr[this.index])
      }
    } else if (!env.production) {
      console.warn('Trying to apply instruction when index equals instruction count ')
    }

    return this.index < this.instructionCount
  }

  public prev(): boolean {
    if (this.index > -1) {
      if (this.index < this.instructionCount) {
        this.reverseInstruction(this.instructionArr[this.index])
      }
      this.index--
    } else if (!env.production) {
      console.warn('Trying to reverse instruction when index is -1 ')
    }

    return this.index > -1
  }
}
