import { Subject } from 'rxjs';

import { Bar, BarState } from '../bar/bar';
import { getRandomInt } from '../../shared/utils';

export class BarList {
  private array: Uint16Array;
  public bars: Bar[];

  public onChange$ = new Subject<void>();

  /**
   * Returnes current array
   */
  public getArray(): Uint16Array {
    return this.array;
  }

  /**
   * Returns current array size
   */
  public getArraySize(): number {
    return this.array.length;
  }

  /**
   * Creates array and bars of given size
   */
  public setArraySize(arraySize: number): void {
    const array = this.createArray(arraySize);
    this.shuffleArray(array);

    const bars = this.createBars(array);

    this.array = array;
    this.bars = bars;
  }

  /**
   * Resets bars to default (current array)
   */
  public reset(): void {
    this.resetBars(this.bars, this.array);
  }

  /**
   * Shuffles current array and updates bars
   */
  public shuffle(): void {
    this.shuffleArray(this.array);
    this.resetBars(this.bars, this.array);
  }

  /**
   * Sorts current array and updates bars
   */
  public sort(): void {
    this.sortArray(this.array);
    this.resetBars(this.bars, this.array);
  }

  /**
   * Reverses current array and updates bars
   */
  public reverse(): void {
    this.reverseArray(this.array);
    this.resetBars(this.bars, this.array);
  }

  /**
   * Sets bar state
   */
  public setBarState(index: number, newBarState: BarState): void {
    this.bars[index].setState(newBarState);
  }

  /**
   * Transforms value to barValue and sets it
   */
  public setBarValue(index: number, newBarValue: number): void {
    this.bars[index].setValue(newBarValue / this.bars.length * 100);
  }

  /**
   * Swaps bar values
   */
  public swapBarValues(i1: number, i2: number): void {
    const temp = this.bars[i1].getValue();
    this.bars[i1].setValue(this.bars[i2].getValue())
    this.bars[i2].setValue(temp);
  }

  /**
   * Triggers change detector
   */
  public triggerChange(): void {
    this.onChange$.next();
  }

  /**
   * Creates an array of given size and sets its values [1, .. , n]
   */
  private createArray(arraySize: number): Uint16Array {
    const array = new Uint16Array(arraySize);

    for (let i = 0; i < arraySize; i++) {
      array[i] = i + 1;
    }

    return array;
  }

  /**
   * Shuffles given array
   */
  private shuffleArray(array: Uint16Array): void {
    for (let i = 0, arraySize = array.length; i < arraySize; i++) {
      const randomInt = getRandomInt(0, arraySize);
      [ array[i], array[randomInt] ] = [ array[randomInt], array[i] ];
    }
  }

  /**
   * Reverses given array
   */
  private reverseArray(array: Uint16Array): void {
    const arraySize = array.length;
    for (let i = 0, half = Math.floor(arraySize / 2); i < half; i++) {
      const targetIndex = arraySize - i - 1;
      [ array[i], array[targetIndex] ] = [ array[targetIndex], array[i] ];
    }
  }

  /**
   * Sorts given array
   */
  private sortArray(array: Uint16Array): void {
    array.sort((v1, v2) => v1 > v2 ? 1 : v1 < v2 ? -1 : 0);
  }

  /**
   * Creates bars for given array
   */
  private createBars(array: Uint16Array): Bar[] {
    const arraySize = array.length;
    const bars = new Array(arraySize);

    for (let i = 0; i < arraySize; i++) {
      bars[i] = new Bar(array[i] / arraySize * 100);
    }

    return bars;
  }

  /**
   * Resets bar values (to reflect an array)
   */
  private resetBars(bars: Bar[], array: Uint16Array): void {
    for (let i = 0, arraySize = array.length; i < arraySize; i++) {
      bars[i].setValue(array[i] / arraySize * 100);
      bars[i].setState(BarState.Default);
    }
  }
}
