import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

export class QuickSort extends Algorithm {
  private actionIndex: number;

  protected sortArray(array: Uint16Array): void {
    this.actionIndex = -1;

    const arrayCopy = array.slice();
    const actions: ActionList = {};

    this.quickSort(arrayCopy, actions, 0, arrayCopy.length);

    actions[this.actionIndex + 1] = this.getCompletedAction();

    this.actions = actions;
    this.arraySize = arrayCopy.length;
  }

  private quickSort(array: Uint16Array, actions: ActionList, from: number, to: number): void {
    if (to - from < 2) {
      return;
    }

    const pivotIndex = to - 1;
    const pivot = array[pivotIndex];
    let wallIndex = from;

    for (let i = from; i < to; i++) {
      if (i === pivotIndex) {
        actions[++this.actionIndex] = {
          state: BarState.Swapping,
          firstIndex: pivotIndex,
          secondIndex: wallIndex,
        };
        [ array[pivotIndex], array[wallIndex] ] = [ array[wallIndex], array[pivotIndex] ];
      } else if (array[i] < pivot) {
        actions[++this.actionIndex] = {
          state: BarState.Swapping,
          firstIndex: i,
          secondIndex: wallIndex,
        };
        [ array[i], array[wallIndex] ] = [ array[wallIndex], array[i] ];
        wallIndex++;
      } else {
        actions[++this.actionIndex] = {
          state: BarState.Checking,
          firstIndex: i,
          secondIndex: pivotIndex,
        };
      }
    }

    this.quickSort(array, actions, from, wallIndex);
    this.quickSort(array, actions, wallIndex+1, to);
  }
}
