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
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  public bars: Bar[];

  public state = new BehaviorSubject<SortStateType>('pristine');
  public delay = 100;
  public arraySize = 25;
  public aglorithmIndex = 0;

  public algorithms = ALGORITHMS;
  public currentAlgorithm: Algorithm;

  constructor(
    private _appService: AppService,
  ) { }

  ngOnInit() {
    this._appService.setTitle(this.algorithms[this.aglorithmIndex].name);
    this.bars = this.createBars(this.arraySize);
    this.currentAlgorithm = new (this.algorithms[this.aglorithmIndex].useClass as any)(this.bars);
  }

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

  public onArraySizeChange() {
    this.bars = this.createBars(this.arraySize);
    this.currentAlgorithm = new (this.algorithms[this.aglorithmIndex].useClass as any)(this.bars);
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

  public createBars(amount: number): Bar[] {
    Bar.counter = amount;
    const bars = new Array(amount) as Bar[];

    for (let i = 0; i < amount; i++) {
      bars[i] = new Bar(i+1);
    }
    for (let i = 0; i < amount * 2; i++) {
      swapArrayValues(bars, getRandomInt(0, amount), getRandomInt(0, amount));
    }

    return bars;
  }
}
