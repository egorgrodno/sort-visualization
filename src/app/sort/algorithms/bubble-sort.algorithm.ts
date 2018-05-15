import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

export class BubbleSort extends Algorithm {
  protected arraySize: number;

  protected sortArray(array: Uint16Array): void {
    const arrayCopy = array.slice();
    const actions: ActionList = {};
    const cycleBoundaryTop = arrayCopy.length - 2;
    let actionIndex = -1;
    let arrayIndex = -1;
    let isCyclePristine = true;
    let isSorted = false;

    while (!isSorted) {
      arrayIndex++;
      actionIndex++;

      if (arrayCopy[arrayIndex] > arrayCopy[arrayIndex + 1]) {
        isCyclePristine = false;
        [ arrayCopy[arrayIndex], arrayCopy[arrayIndex + 1] ] = [ arrayCopy[arrayIndex + 1], arrayCopy[arrayIndex] ];
        actions[actionIndex] = {
          firstIndex: arrayIndex,
          secondIndex: arrayIndex + 1,
          state: BarState.Swapping,
        };
      } else {
        actions[actionIndex] = {
          firstIndex: arrayIndex,
          secondIndex: arrayIndex + 1,
          state: BarState.Checking,
        };
      }

      if (arrayIndex === cycleBoundaryTop) {
        if (isCyclePristine) {
          isSorted = true;
        } else {
          isCyclePristine = true;
          arrayIndex = -1;
        }
      }
    }

    actions[actionIndex + 1] = {
      firstIndex: -1,
      secondIndex: -1,
      state: BarState.Completed,
    };

    this.actions = actions;
    this.arraySize = arrayCopy.length;
  }
}
