import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'

export enum SortState {
  PlayingForward,
  PlayingBackward,
  Paused,
  PausedStart,
  PausedEnd,
}

export const newSortState = () => {
  const sortStateBS$ = new BehaviorSubject<SortState>(SortState.PausedStart)
  const sortState$ = sortStateBS$.pipe(distinctUntilChanged())

  const is = (state: SortState): Observable<boolean> =>
    sortState$.pipe(map(s => s === state))

  const playing$ = sortState$.pipe(map(s => s === SortState.PlayingBackward || s === SortState.PlayingForward))
  const paused$ = playing$.pipe(map(playing => !playing))

  return {
    playing$,
    paused$,
    playingForward$:  is(SortState.PlayingForward),
    playingBackward$: is(SortState.PlayingBackward),
    reachedStart$:    is(SortState.PausedStart),
    reachedEnd$:      is(SortState.PausedEnd),
    set:              (state: SortState) => sortStateBS$.next(state),
  }
}
