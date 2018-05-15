import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

export class CocktailSort extends Algorithm {
  protected sortArray(array: Uint16Array): void {
    const arrayCopy = array.slice();
    const actions: ActionList = {};
    let cycleBoundaryTop = arrayCopy.length - 2;
    let cycleBoundaryBottom = 0;
    let actionIndex = -1;
    let arrayIndex = -1;
    let isSorted = false;
    let lastSwapInCycleIndex = -1;
    let order = 1;

    while (!isSorted) {
      arrayIndex += order;

      if (arrayCopy[arrayIndex] > arrayCopy[arrayIndex + 1]) {
        [ arrayCopy[arrayIndex], arrayCopy[arrayIndex + 1] ] = [ arrayCopy[arrayIndex + 1], arrayCopy[arrayIndex] ];
        lastSwapInCycleIndex = arrayIndex;
        actions[++actionIndex] = {
          firstIndex: arrayIndex,
          secondIndex: arrayIndex + 1,
          state: BarState.Swapping,
        };
      } else {
        actions[++actionIndex] = {
          firstIndex: arrayIndex,
          secondIndex: arrayIndex + 1,
          state: BarState.Checking,
        };
      }

      if (arrayIndex >= cycleBoundaryTop && order === 1) {
        if (lastSwapInCycleIndex !== -1) {
          cycleBoundaryTop = lastSwapInCycleIndex - 1;
          arrayIndex = lastSwapInCycleIndex;
          order = -1;
        } else {
          isSorted = true;
        }
      } else if (arrayIndex <= cycleBoundaryBottom && order === -1) {
        if (lastSwapInCycleIndex !== -1) {
          cycleBoundaryBottom = lastSwapInCycleIndex + 1;
          arrayIndex = lastSwapInCycleIndex;
          order = 1;
          lastSwapInCycleIndex = -1;
        } else {
          isSorted = true;
        }
      }
    }

    actions[actionIndex + 1] = this.getCompletedAction();

    this.actions = actions;
    this.arraySize = arrayCopy.length;
  }
}