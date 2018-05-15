import { DOCUMENT } from '@angular/platform-browser';
import { Directive, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subscription, fromEvent, interval, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[mouseHold]',
})
export class MouseHoldDirective implements OnDestroy, OnChanges {
  @Input('mouseHold') duration: number;
  @Input() disabled: boolean;

  @Output() onAction = new EventEmitter<void>();

  private mouseSub: Subscription;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private host: ElementRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('disabled' in changes)  {
      if (this.disabled) {
        if (this.mouseSub) {
          this.mouseSub.unsubscribe();
          this.mouseSub = null;
        }
      } else {
        this.mouseSub = fromEvent(this.host.nativeElement, 'mousedown')
          .pipe(
            tap(() => this.onAction.emit()),
            switchMap(() =>
              timer(350).pipe(
                takeUntil(fromEvent(this.doc.documentElement, 'mouseup')),
              ),
            ),
            switchMap(() =>
              interval(this.duration).pipe(
                takeUntil(fromEvent(this.doc.documentElement, 'mouseup')),
              ),
            ),
          )
          .subscribe(() => this.onAction.emit());
      }
    }
  }

  ngOnDestroy() {
    if (this.mouseSub) {
      this.mouseSub.unsubscribe();
    }
  }
}
