import { LinkedList, LinkedListNode } from 'lib/linked-list'

export enum InstructionType {
  Swap,
  Compare,
  SwapToShadow,
  SwapFromShadow,
}

interface SwapInstruction {
  type: InstructionType.Swap
  i1: number
  i2: number
}

interface CompareInstruction {
  type: InstructionType.Compare
  i1: number
  i2: number
}

interface SwapToShadowInstruction {
  type: InstructionType.SwapToShadow
  i: number
}

interface SwapFromShadowInstruction {
  type: InstructionType.SwapFromShadow
  i: number
  value: number
  shadowValue: number
}

export type Instruction =
  | SwapInstruction
  | CompareInstruction
  | SwapToShadowInstruction
  | SwapFromShadowInstruction

interface InstructionNode extends LinkedListNode<Instruction, InstructionNode> {}

export class InstructionList extends LinkedList<Instruction, InstructionNode> {
  constructor() {
    super(data => ({ data, next: null }))
  }
}
