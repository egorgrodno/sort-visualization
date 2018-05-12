import { Subject } from 'rxjs';

import { Bar } from '../bar/bar';

export abstract class Algorithm {
  abstract next(): boolean;
  abstract previous(): boolean;
  abstract reset(bars?: Bar[]): void;

  public comparisonCount = 0;
  public swapCount = 0;

  constructor(
    public bars: Bar[],
  ) { }
}

export type ActionType = 'check' | 'swap';

export interface Action {
  type: ActionType;
  firstIndex: number;
  secondIndex: number;
}
