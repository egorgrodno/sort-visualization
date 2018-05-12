import { Subject } from 'rxjs';

import { Bar } from '../bar/bar';
import { swapArrayValues } from '../../shared/utils';
import { Algorithm, Action, ActionType } from './algorithm';

export class BubbleSort extends Algorithm {
  /**
   * Action (manipulation) history
   */
  public actions: Action[] = [];
  public currentAction: Action = null;
  public iteration = -1;

  /**
   * If an array was pristine, unmanipulated during current cycle
   */
  public isCleanCycle = true;
  public cycleLength = this.bars.length - 1;

  /**
   * Performs 1 algorithm iteration
   */
  public next(): boolean {
    if (this.isCompleted) {
      this.bars.forEach((bar) => bar.setState('completed'));
      return true;
    }

    this.increment();
    this.clearCurrentAction();

    this.currentAction = this.createAction();
    this.actions.push(this.currentAction);

    this.updateCleanCycle();
    this.handleAction();
    this.displayAction();
    this.updateCounters('increase');

    return false;
  }

  /**
   * Performs 1 algorithm iteration backwards
   */
  public previous(): boolean {
    if (this.isCompleted && this.bars[0].state === 'completed') {
      this.bars.forEach((bar) => bar.setState('default'));
      this.displayAction();
    } else {
      this.handleAction();
      this.clearCurrentAction();
      this.updateCounters('decrease');
      this.actions.pop();
      this.currentAction = this.getLastAction();

      if (this.actions.length === 0) {
        this.iteration = -1;
      } else {
        this.displayAction();
        this.iteration = this.currentAction.firstIndex;
      }

      if (this.isLastIteration) {
        this.updateCleanCycleBackwards();
      }
    }

    return this.actions.length === 0;
  }

  public get isLastIteration(): boolean {
    return this.iteration === this.bars.length - 2;
  }

  public get isCompleted(): boolean {
    return this.isLastIteration && this.isCleanCycle;
  }

  public updateCleanCycle(): void {
    if (this.currentAction.type === 'swap') {
      this.isCleanCycle = false;
    } else if (this.iteration === 0) {
      this.isCleanCycle = true;
    }
  }

  public updateCleanCycleBackwards(): void {
    const startIndex = this.actions.length - 1;
    const stopIndex = startIndex - this.cycleLength;

    for (let i = startIndex; i > stopIndex; i--) {
      if (this.actions[i].type !== 'check') {
        this.isCleanCycle = false;
      }
    }
  }

  public clearCurrentAction(): void {
    if (this.currentAction) {
      this.bars[this.currentAction.firstIndex].setState('default');
      this.bars[this.currentAction.secondIndex].setState('default');
    }
  }

  public createAction(): Action {
    const type: ActionType = this.bars[this.iteration].value > this.bars[this.iteration + 1].value
      ? 'swap'
      : 'check';

    return {
      type,
      firstIndex: this.iteration,
      secondIndex: this.iteration + 1,
    };
  }

  public updateCounters(updateType: 'increase' | 'decrease'): void {
    if (updateType === 'increase') {
      this.comparisonCount++;
      if (this.currentAction.type === 'swap') {
        this.swapCount++;
      }
    } else {
      this.comparisonCount--;
      if (this.currentAction.type === 'swap') {
        this.swapCount--;
      }
    }
  }

  public handleAction(): void {
    if (this.currentAction.type === 'swap') {
      swapArrayValues(this.bars, this.currentAction.firstIndex, this.currentAction.secondIndex);
    }
  }

  public displayAction(): void {
    if (this.currentAction.type === 'check') {
      this.bars[this.currentAction.firstIndex].setState('checking');
      this.bars[this.currentAction.secondIndex].setState('checking');
    } else if (this.currentAction.type === 'swap') {
      this.bars[this.currentAction.firstIndex].setState('swapping');
      this.bars[this.currentAction.secondIndex].setState('swapping');
    } else {
      throw new Error(`Unhandled action type (${this.currentAction.type})!`);
    }
  }

  public getLastAction(): Action {
    return this.actions[this.actions.length - 1] || null;
  }

  public increment(): void {
    this.iteration = (this.iteration + 1) % (this.bars.length - 1);
  }
}
