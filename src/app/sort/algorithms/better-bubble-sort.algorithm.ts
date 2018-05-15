import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

export class BetterBubbleSort extends Algorithm {
  protected arraySize: number;

  protected sortArray(array: Uint16Array): void {
    const arrayCopy = array.slice();
    const actions: ActionList = {};
    let cycleBoundaryTop = arrayCopy.length - 2;
    let actionIndex = -1;
    let arrayIndex = -1;
    let isSorted = false;
    let lastSwapInCycleIndex = -1;

    while (!isSorted) {
      arrayIndex++;
      actionIndex++;

      if (arrayCopy[arrayIndex] > arrayCopy[arrayIndex + 1]) {
        [ arrayCopy[arrayIndex], arrayCopy[arrayIndex + 1] ] = [ arrayCopy[arrayIndex + 1], arrayCopy[arrayIndex] ];
        lastSwapInCycleIndex = arrayIndex;
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
        if (lastSwapInCycleIndex > 0) {
          cycleBoundaryTop = lastSwapInCycleIndex - 1;
          arrayIndex = -1;
          lastSwapInCycleIndex = -1;
        } else {
          isSorted = true;
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
