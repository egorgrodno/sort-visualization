import { Component, OnInit } from '@angular/core';

import { filter, map, takeUntil }from 'rxjs/operators';
import { BehaviorSubject, Subject, interval } from 'rxjs';

import { getRandomInt, swapArrayValues } from '../../shared/utils';
import { Bar } from '../bar/bar';
import { Algorithm, ALGORITHMS } from '../algorithms';
import { AppService } from '../../shared/app.service';

export type SortStateType = 'pristine' | 'paused' | 'automatic' | 'completed';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  public array: Bar[];

  public state = new BehaviorSubject<SortStateType>('pristine');
  public delay = 45;
  public arraySize = 35;
  public aglorithmIndex = 0;

  public algorithms = ALGORITHMS;
  public currentAlgorithm: Algorithm;

  constructor(
    private _appService: AppService,
  ) { }

  ngOnInit() {
    this.onAlgorithmIndexChange(true);
  }

  /**
   * Array manipulation functions
   */
  public createArray(): Bar[] {
    Bar.counter = this.arraySize;
    const array = new Array(this.arraySize) as Bar[];

    for (let i = 0; i < this.arraySize; i++) {
      array[i] = new Bar(i + 1);
    }

    return array;
  }

  public shuffleArray(array: Bar[]): Bar[] {
    const arrayCopy = array.slice();

    for (let i = 0; i < this.arraySize; i++) {
      swapArrayValues(arrayCopy, i, getRandomInt(0, this.arraySize));
    }

    return arrayCopy;
  }

  public sortArray(array: Bar[]): Bar[] {
    return array.sort((b1, b2) => b1.value > b2.value ? 1 : b1.value < b2.value ? -1 : 0);
  }


  /**
   * User event handler functions:
   * - sort player handler functions
   */
  public onStartClick(): void {
    this.state.next('automatic');
    interval(this.delay)
      .pipe(
        takeUntil(
          this.state.pipe(filter((state) => state !== 'automatic')),
        ),
        map(() => this.currentAlgorithm.next()),
        filter((isCompleted) => isCompleted)
      )
      .subscribe(() => this.state.next('completed'));
  }

  public onPauseClick(): void {
    this.state.next('paused');
  }

  public onPreviousClick(): void {
    const isPristine = this.currentAlgorithm.previous();
    if (isPristine) {
      this.state.next('pristine');
    } else if (this.state.value !== 'paused') {
      this.state.next('paused');
    }
  }

  public onNextClick(): void {
    const isCompleted = this.currentAlgorithm.next();
    if (isCompleted) {
      this.state.next('completed');
    } else if (this.state.value !== 'paused') {
      this.state.next('paused');
    }
  }


  /**
   * - configuration handler functions
   */
  public onAlgorithmIndexChange(isFirstChange = false) {
    this._appService.setTitle(this.algorithms[this.aglorithmIndex].name);

    if (isFirstChange) {
      this.array = this.shuffleArray(this.createArray());
    } else {
      this.array = this.shuffleArray(this.array);
      this.currentAlgorithm.reset();
    }

    this.state.next('pristine');
    this.currentAlgorithm = new (this.algorithms[this.aglorithmIndex].useClass as any)(this.array);
  }

  /**
   * - data management handler functions
   */
  public onArraySizeChange() {
    if (this.state.value !== 'pristine') {
      this.state.next('pristine');
    }
    this.array = this.shuffleArray(this.createArray());
    this.currentAlgorithm = new (this.algorithms[this.aglorithmIndex].useClass as any)(this.array);
  }

  public onResetClick(): void {
    if (this.state.value !== 'pristine') {
      this.state.next('pristine');
    }
    this.array = this.shuffleArray(this.array);
    this.currentAlgorithm.reset(this.array);
  }

  public onInstantSortClick(): void {
    if (this.state.value !== 'pristine') {
      this.state.next('pristine');
    }
    this.array = this.sortArray(this.array);
    this.currentAlgorithm.reset(this.array);
  }

  public onReverseClick(): void {
    if (this.state.value !== 'pristine') {
      this.state.next('pristine');
    }
    this.array = this.array.slice().reverse();
    this.currentAlgorithm.reset(this.array);
  }
}
