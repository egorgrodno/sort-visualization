import { Action } from './algorithm';
import { BubbleSort } from './bubble-sort.algorithm';

export class BetterBubbleSort extends BubbleSort {
  public updateCleanCycleBackwards(): void {
    const startIndex = this.actions.length - 1;
    const stopIndex = startIndex - this.cycleLength;

    for (let i = startIndex; i > stopIndex; i--) {
      if (this.actions[i].type !== 'check') {
        this.isCleanCycle = false;
      }
    }

    if (this.cycleLength < this.bars.length - 1) {
      this.cycleLength++;
    }
  }

  public getLastSwapActionInCurrentCycle(): Action {
    const startIndex = this.actions.length - 1;
    const stopIndex = startIndex - this.cycleLength;

    for (let i = startIndex; i > stopIndex; i--) {
      if (this.actions[i].type === 'swap') {
        return this.actions[i];
      }
    }

    return null;
  }

  public increment(): void {
    this.iteration++;

    console.log(this.iteration, this.cycleLength);
    if (this.iteration >= this.cycleLength) {
      const lastSwapActionInCurrentCycle = this.getLastSwapActionInCurrentCycle();

      if (lastSwapActionInCurrentCycle) {
        this.cycleLength = lastSwapActionInCurrentCycle.firstIndex;
      } else {
        this.cycleLength--;
      }

      if (this.cycleLength < 1) {
        this.cycleLength = 1;
      }

      this.iteration = 0;
    }
  }
}
