import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

export class InsertionSort extends Algorithm {
  protected sortArray(array: Uint16Array): void {
    const arrayCopy = array.slice();
    const actions: ActionList = {};
    const cycleBoundaryTop = arrayCopy.length + 1;
    let currentElementIndex = 1;
    let actionIndex = -1;

    while (currentElementIndex !== cycleBoundaryTop) {
      for (let i = currentElementIndex - 1; i > 0; i--) {
        if (arrayCopy[i] < arrayCopy[i - 1]) {
          [ arrayCopy[i], arrayCopy[i - 1] ] = [ arrayCopy[i - 1], arrayCopy[i] ];
          actions[++actionIndex] = {
            firstIndex: i,
            secondIndex: i - 1,
            state: BarState.Swapping,
          };
        } else {
          actions[++actionIndex] = {
            firstIndex: i,
            secondIndex: i - 1,
            state: BarState.Checking,
          };
          break;
        }
      }

      currentElementIndex++;
    }

    actions[actionIndex + 1] = this.getCompletedAction();

    this.actions = actions;
    this.arraySize = arrayCopy.length;
  }
}
