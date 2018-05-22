import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

export class SelectionSort extends Algorithm {
  protected sortArray(array: Uint16Array): void {
    const arrayCopy = array.slice();
    const actions: ActionList = {};
    const cycleBoundaryTop = arrayCopy.length - 1;
    let cycleBoundaryBottom = 0;
    let actionIndex = -1;
    let lowestElementIndex = cycleBoundaryBottom;

    while (cycleBoundaryBottom !== cycleBoundaryTop) {
      for (let i = cycleBoundaryBottom + 1; i <= cycleBoundaryTop; i++) {
        actions[++actionIndex] = {
          firstIndex: lowestElementIndex,
          secondIndex: i,
          state: BarState.Checking,
        };

        if (arrayCopy[lowestElementIndex] > arrayCopy[i]) {
          lowestElementIndex = i;
        }
      }

      if (lowestElementIndex !== cycleBoundaryBottom) {
        actions[++actionIndex] = {
          firstIndex: lowestElementIndex,
          secondIndex: cycleBoundaryBottom,
          state: BarState.Swapping,
        };
        [arrayCopy[lowestElementIndex], arrayCopy[cycleBoundaryBottom]] = [
          arrayCopy[cycleBoundaryBottom],
          arrayCopy[lowestElementIndex],
        ];
      }

      cycleBoundaryBottom++;
      lowestElementIndex = cycleBoundaryBottom;
    }

    actions[actionIndex + 1] = this.getCompletedAction();

    this.actions = actions;
    this.arraySize = arrayCopy.length;
  }
}
