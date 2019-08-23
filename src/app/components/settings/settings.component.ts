import { Component, EventEmitter, ChangeDetectionStrategy, Output, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Subject } from 'rxjs'
import { startWith, skip, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators'
import { AlgorithmType, algorithmMap } from 'lib/sort'

const newNumberFC = (min: number, max: number): FormControl =>
  new FormControl(min, [Validators.required, Validators.min(min), Validators.max(max)])

@Component({
  selector: 'sv-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnChanges, OnDestroy {
  public AlgorithmType = AlgorithmType
  public algorithmMap = algorithmMap
  public arraySizeMin = 5
  public arraySizeMax = 500
  public iterationDelayMin = 0
  public iterationDelayMax = 1000

  private componentLife$ = new Subject<void>()

  @Input()
  public disabled = false
  @Input()
  public resetDisabled = false

  @Input()
  public comparisonCount = -1
  @Input()
  public swapCount = -1

  @Input()
  public algorithm = AlgorithmType.BubbleSort
  @Output()
  public algorithmChange = new EventEmitter<AlgorithmType>()

  @Input()
  public arraySize = 0
  @Output()
  public arraySizeChange = new EventEmitter<number>()

  @Input()
  public iterationDelay = 0
  @Output()
  public iterationDelayChange = new EventEmitter<number>()

  @Output()
  public resetClick = new EventEmitter<void>()

  @Output()
  public shuffleClick = new EventEmitter<void>()

  @Output()
  public sortClick = new EventEmitter<void>()

  @Output()
  public reverseClick = new EventEmitter<void>()

  public form = this.fb.group({
    arraySize: newNumberFC(this.arraySizeMin, this.arraySizeMax),
    iterationDelay: newNumberFC(this.iterationDelayMin, this.iterationDelayMax),
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.form.setValue({
      arraySize: this.arraySize,
      iterationDelay: this.iterationDelay,
    })

    this.form.controls.arraySize.valueChanges
      .pipe(
        takeUntil(this.componentLife$),
        debounceTime(350),
        startWith(this.arraySize),
        distinctUntilChanged(),
        skip(1),
        filter(() => this.form.controls.arraySize.valid),
      )
      .subscribe(n => this.arraySizeChange.emit(n))

    this.form.controls.iterationDelay.valueChanges
      .pipe(
        takeUntil(this.componentLife$),
        debounceTime(350),
        startWith(this.iterationDelay),
        distinctUntilChanged(),
        skip(1),
        filter(() => this.form.controls.iterationDelay.valid),
      )
      .subscribe(n => this.iterationDelayChange.emit(n))
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      if (changes.disabled.currentValue) {
        this.form.disable()
      } else {
        this.form.enable({ onlySelf: true, emitEvent: false })
      }
    }
  }

  public ngOnDestroy(): void {
    this.componentLife$.next()
    this.componentLife$.complete()
  }
}
