import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { Instruction, InstructionType } from 'lib/sort'

@Component({
  selector: 'sv-algorithm-display',
  templateUrl: './algorithm-display.component.html',
  styleUrls: ['./algorithm-display.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmDisplayComponent {
  @Input()
  public arr: number[] = []

  @Input()
  public sorted: boolean | null = null

  @Input()
  public currentInstruction?: Instruction

  constructor() { }

  public getBarClass(index: number): string {
    if (!this.currentInstruction) {
      return this.sorted ? 'bar--sorted' : ''
    }

    switch (this.currentInstruction.type) {
      case InstructionType.Swap:
        return this.currentInstruction.i1 === index || this.currentInstruction.i2 === index
          ? 'bar--swapping'
          : ''

      case InstructionType.Compare:
        return this.currentInstruction.i1 === index || this.currentInstruction.i2 === index
          ? 'bar--comparing'
          : ''

      case InstructionType.SwapToShadow:
      case InstructionType.SwapFromShadow:
        return this.currentInstruction.i === index
          ? 'bar--swapping'
          : ''

      default:
        throw new Error('Unhandled instruction type')
    }
  }
}
