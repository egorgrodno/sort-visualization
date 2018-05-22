import { ActionList, Algorithm } from './algorithm';
import { BarState } from '../bar/bar';

interface Partition {
  from: number;
  to: number;
}

export class MergeSort extends Algorithm {
  private actionIndex: number;

  protected sortArray(array: Uint16Array): void {
    const arrayCopy = array.slice();
    this.actionIndex = -1;

    const actions: ActionList = {};
    this.mergeSort(array.slice(), actions, { from: 0, to: array.length });

    actions[this.actionIndex + 1] = this.getCompletedAction();

    this.actionIndex = null;
    this.actions = actions;
    this.arraySize = arrayCopy.length;
  }

  private mergeSort(array: Uint16Array, actions: ActionList, partition: Partition): Partition {
    if (partition.to - partition.from < 2) {
      return partition;
    }

    const halfIndex = Math.floor((partition.from + partition.to + 1) / 2);

    return this.merge(
      array,
      actions,
      this.mergeSort(array, actions, { from: partition.from, to: halfIndex }),
      this.mergeSort(array, actions, { from: halfIndex, to: partition.to }),
    );
  }

  private merge(
    array: Uint16Array,
    actions: ActionList,
    partition1: Partition,
    partition2: Partition,
  ): Partition {
    const arrayLength1 = partition1.to;
    const arrayLength2 = partition2.to;
    let arrayIndex1 = partition1.from;
    let arrayIndex2 = partition2.from;

    const sortedArrayLength = arrayLength1 + arrayLength2;
    const sortedArray = new Uint16Array(sortedArrayLength);
    let sortedArrayIndex = 0;

    while (arrayIndex1 < arrayLength1 && arrayIndex2 < arrayLength2) {
      actions[++this.actionIndex] = {
        state: BarState.Checking,
        firstIndex: arrayIndex1,
        secondIndex: arrayIndex2,
      };
      if (array[arrayIndex1] < array[arrayIndex2]) {
        actions[++this.actionIndex] = {
          state: BarState.SwappingToShadowArray,
          index: arrayIndex1,
        };
        sortedArray[sortedArrayIndex] = array[arrayIndex1];
        sortedArrayIndex++;
        arrayIndex1++;
      } else {
        actions[++this.actionIndex] = {
          state: BarState.SwappingToShadowArray,
          index: arrayIndex2,
        };
        sortedArray[sortedArrayIndex] = array[arrayIndex2];
        sortedArrayIndex++;
        arrayIndex2++;
      }
    }

    while (arrayIndex1 < arrayLength1) {
      actions[++this.actionIndex] = {
        state: BarState.SwappingToShadowArray,
        index: arrayIndex1,
      };
      sortedArray[sortedArrayIndex] = array[arrayIndex1];
      sortedArrayIndex++;
      arrayIndex1++;
    }

    while (arrayIndex2 < arrayLength2) {
      actions[++this.actionIndex] = {
        state: BarState.SwappingToShadowArray,
        index: arrayIndex2,
      };
      sortedArray[sortedArrayIndex] = array[arrayIndex2];
      sortedArrayIndex++;
      arrayIndex2++;
    }

    let insertSortedArrayIndex = 0;
    for (let i = partition1.from; i < arrayLength2; i++) {
      actions[++this.actionIndex] = {
        state: BarState.SwappingFromShadowArray,
        index: i,
        value: array[i],
        newValue: sortedArray[insertSortedArrayIndex],
      };
      array[i] = sortedArray[insertSortedArrayIndex];
      insertSortedArrayIndex++;
    }

    return { from: partition1.from, to: partition2.to };
  }
}
