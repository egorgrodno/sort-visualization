import { BehaviorSubject, Observable, Subscription, fromEvent, interval, of } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil }from 'rxjs/operators';

import { ALGORITHMS, Algorithm } from './algorithms';
import { AppService } from '../shared/app.service';
import { BarList } from './bar-list/bar-list';
import { ConfirmArraySizeComponent } from './confirm-array-size/confirm-array-size.component';

enum SortState {
  Pristine,
  Paused,
  Automatic,
  Completed,
}

const MAX_ARRAY_SIZE = 50;

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit, OnDestroy {
  @ViewChild('arraySizeInput') arraySizeInput: ElementRef;

  public state = new BehaviorSubject<SortState>(SortState.Pristine);
  public delay = 10;
  public arraySize = 50;
  public aglorithmIndex = 0;

  public algorithms = ALGORITHMS;
  public currentAlgorithm: Algorithm;

  public barList: BarList;

  public sortStateEnum = SortState;

  private arraySizeInputSub: Subscription;

  constructor(
    private appService: AppService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.barList = new BarList();
    this.barList.setArraySize(this.arraySize);
    this.onAlgorithmIndexChange();
    this.bindArraySizeInput();
  }

  ngOnDestroy() {
    this.arraySizeInputSub.unsubscribe();
  }

  public bindArraySizeInput(): void {
    this.arraySizeInputSub = fromEvent(this.arraySizeInput.nativeElement, 'input')
      .pipe(
        /** Transform input */
        map((event: Event) => (event.target as HTMLInputElement).value),
        filter((value) => /^\d+$/.test(value)),
        map((value) => Number(value)),
        /** Ensure value changed */
        debounceTime(500),
        distinctUntilChanged(),
        /** Check for large size values and confirm them */
        switchMap((value) => value > MAX_ARRAY_SIZE && value > this.barList.getArraySize()
                          ? this.openConfirmArraySizeDialog()
                          : of(true)),
        filter((isConfirmed) => isConfirmed),
      )
      .subscribe(() => this.onArraySizeChange());
  }

  public openConfirmArraySizeDialog(): Observable<boolean> {
    return this.dialog
      .open<ConfirmArraySizeComponent>(ConfirmArraySizeComponent)
      .afterClosed();
  }

  public setState(newState: SortState): void {
    if (this.state.value !== newState) {
      this.state.next(newState);
    }
  }

  public onStartClick(): void {
    this.setState(SortState.Automatic);
    interval(this.delay)
      .pipe(
        takeUntil(this.state.pipe(filter((state) => state !== SortState.Automatic))),
        map(() => this.currentAlgorithm.next()),
        filter((isCompleted) => isCompleted)
      )
      .subscribe(() => this.state.next(SortState.Completed));
  }

  public onPauseClick(): void {
    this.setState(SortState.Paused);
  }

  public onPreviousClick(): void {
    if (this.state.value === SortState.Paused || this.state.value === SortState.Completed) {
      const isPristine = this.currentAlgorithm.previous();
      if (isPristine) {
        this.state.next(SortState.Pristine);
      } else if (this.state.value !== SortState.Paused) {
        this.state.next(SortState.Paused);
      }
    }
  }

  public onNextClick(): void {
    if (this.state.value === SortState.Paused || this.state.value === SortState.Pristine) {
      const isCompleted = this.currentAlgorithm.next();
      if (isCompleted) {
        this.state.next(SortState.Completed);
      } else if (this.state.value !== SortState.Paused) {
        this.state.next(SortState.Paused);
      }
    }
  }

  public onAlgorithmIndexChange() {
    this.appService.setTitle(this.algorithms[this.aglorithmIndex].name);

    if (this.state.value !== SortState.Pristine) {
      this.state.next(SortState.Pristine);
      this.barList.reset();
      this.barList.triggerChange();
    }

    this.currentAlgorithm = new (this.algorithms[this.aglorithmIndex].useClass as any)();
    this.currentAlgorithm.setBarList(this.barList);
  }

  public onArraySizeChange() {
    this.barList.setArraySize(this.arraySize);
    this.barList.triggerChange();
    this.currentAlgorithm.reSort();
  }

  public onResetClick(): void {
    this.setState(SortState.Pristine);
    this.barList.reset();
    this.barList.triggerChange();
    this.currentAlgorithm.initDefaults();
  }

  public onShuffleClick(): void {
    this.setState(SortState.Pristine);
    this.barList.shuffle();
    this.barList.triggerChange();
    this.currentAlgorithm.reSort();
  }

  public onInstantSortClick(): void {
    this.setState(SortState.Pristine);
    this.barList.sort();
    this.barList.triggerChange();
    this.currentAlgorithm.reSort();
  }

  public onReverseClick(): void {
    this.setState(SortState.Pristine);
    this.barList.reverse();
    this.barList.triggerChange();
    this.currentAlgorithm.reSort();
  }
}
