import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { Subject, interval } from 'rxjs'
import { filter, takeUntil, switchMap } from 'rxjs/operators'
import { newStorage } from 'lib/storage'
import { AlgorithmType, SortModule } from 'lib/sort'
import { AlgorithmControlVariant } from './components'
import { SortState, newSortState } from './sort-state'

const initialAlgorithm = AlgorithmType.QuickSort
const initialArrSize = 100
const initialIterationDelay = 0
const darkThemeClass = 'dark-theme'
const darkThemeActiveStorage = newStorage('dark-theme')

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  public AlgorithmControlVariant = AlgorithmControlVariant

  public darkThemeActive = darkThemeActiveStorage.get() === '1'

  public sort = new SortModule(initialAlgorithm, initialArrSize)

  public SortState = SortState
  public sortState = newSortState()

  public iterationDelay = initialIterationDelay

  public settingsOpen = true

  private componentLife$ = new Subject<void>()

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private renderer: Renderer2,
  ) { }

  public toggleSettingsOpen(): void {
    this.settingsOpen = !this.settingsOpen
  }

  public ngOnInit(): void {
    this.initTheme()

    const onPlayingForward$     = this.sortState.playingForward$.pipe(filter(playing => playing))
    const onNotPlayingForward$  = this.sortState.playingForward$.pipe(filter(playing => !playing))
    const onPlayingBackward$    = this.sortState.playingBackward$.pipe(filter(playing => playing))
    const onNotPlayingBackward$ = this.sortState.playingBackward$.pipe(filter(playing => !playing))

    onPlayingForward$
      .pipe(
        takeUntil(this.componentLife$),
        switchMap(() => interval(this.iterationDelay).pipe(takeUntil(onNotPlayingForward$))),
      )
      .subscribe(() => this.next())

    onPlayingBackward$
      .pipe(
        takeUntil(this.componentLife$),
        switchMap(() => interval(this.iterationDelay).pipe(takeUntil(onNotPlayingBackward$))),
      )
      .subscribe(() => this.prev())
  }

  public ngOnDestroy(): void {
    this.componentLife$.next()
    this.componentLife$.complete()
  }

  public prev(): void {
    if (!this.sort.prev()) {
      this.sortState.set(SortState.PausedStart)
    }
  }

  public next(): void {
    if (!this.sort.next()) {
      this.sortState.set(SortState.PausedEnd)
    }
  }

  // Settings
  public handleAlgorithmChange(algorithm: AlgorithmType): void {
    this.sort.setAlgorithm(algorithm)
    this.sortState.set(SortState.PausedStart)
  }

  public handleArrSizeChange(n: number): void {
    this.sort.setArraySize(n)
    this.sortState.set(SortState.PausedStart)
  }

  public handleIterationDelayChange(n: number): void {
    this.iterationDelay = n
  }

  public handleResetClick(): void {
    this.sort.reset()
    this.sortState.set(SortState.PausedStart)
  }

  public handleShuffleClick(): void {
    this.sort.shuffle()
    this.sortState.set(SortState.PausedStart)
  }

  public handleSortClick(): void {
    this.sort.sort()
    this.sortState.set(SortState.PausedStart)
  }

  public handleReverseClick(): void {
    this.sort.reverse()
    this.sortState.set(SortState.PausedStart)
  }

  // Theming
  private initTheme(): void {
    if (this.darkThemeActive) {
      this.renderer.addClass(this.doc.body, darkThemeClass)
    } else {
      this.renderer.removeClass(this.doc.body, darkThemeClass)
    }
  }

  public switchTheme(): void {
    if (this.darkThemeActive) {
      darkThemeActiveStorage.put('0')
      this.darkThemeActive = false
    } else {
      darkThemeActiveStorage.put('1')
      this.darkThemeActive = true
    }

    this.initTheme()
  }
}
