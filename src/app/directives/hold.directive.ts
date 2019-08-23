import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { Subject, Subscription, fromEvent, interval, timer } from 'rxjs'
import { switchMap, takeUntil, tap } from 'rxjs/operators'

const holdDelay = 300
const holdEmitInterval = 10

@Directive({
  selector: '[svHold]',
})
export class HoldDirective implements OnInit, OnChanges, OnDestroy {
  @Input()
  public disabled?: boolean

  @Output('svHold')
  public hold = new EventEmitter<void>()

  private disabled$ = new Subject<void>()

  private mouseSub: Subscription | null = null

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private host: ElementRef,
  ) { }

  public ngOnInit(): void {
    const hostMouseDown$   = fromEvent(this.host.nativeElement, 'mousedown')
    const documentMouseUp$ = fromEvent(this.doc.documentElement, 'mouseup')

    this.mouseSub = hostMouseDown$.pipe(
      tap(() => this.hold.emit()),
      switchMap(() =>
        timer(holdDelay).pipe(
          takeUntil(this.disabled$),
          takeUntil(documentMouseUp$),
        ),
      ),
      switchMap(() =>
        interval(holdEmitInterval).pipe(
          takeUntil(this.disabled$),
          takeUntil(documentMouseUp$),
        ),
      ),
    )
    .subscribe(() => this.hold.emit())
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled && changes.disabled.currentValue) {
      this.disabled$.next()
    }
  }

  public ngOnDestroy(): void {
    if (this.mouseSub) {
      this.mouseSub.unsubscribe()
    }
  }
}
