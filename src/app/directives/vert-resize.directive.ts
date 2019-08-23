import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { Subscription, fromEvent } from 'rxjs'
import { scan, filter, map, switchMap, takeUntil } from 'rxjs/operators'

@Directive({
  selector: '[svVertResize]',
})
export class VertResizeDirective implements OnInit, OnDestroy {
  @Input('svVertResize')
  public resizeTarget?: HTMLElement

  // tslint:disable-next-line:no-input-rename
  @Input('svVertResizeMinHeight')
  public minHeight = 0

  private currentHeight = -1

  private mouseSub: Subscription | null = null

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private host: ElementRef,
    private renderer: Renderer2,
  ) { }

  public ngOnInit(): void {
    if (!this.resizeTarget) {
      throw new Error('No resize target')
    }

    this.currentHeight = this.resizeTarget.clientHeight

    this.mouseSub = fromEvent(this.host.nativeElement, 'mousedown').pipe(
      switchMap(() =>
        fromEvent<MouseEvent>(this.doc.documentElement, 'mousemove').pipe(
          takeUntil(fromEvent(this.doc.documentElement, 'mouseup')),
          map(event => event.movementY),
          scan((acc, movementY) => movementY + acc, this.currentHeight),
        ),
      ),
      filter(nextHeight => nextHeight >= this.minHeight),
    )
    .subscribe(height => {
      this.renderer.setStyle(this.resizeTarget, 'height', `${height}px`)
      this.currentHeight = height
    })
  }

  public ngOnDestroy(): void {
    if (this.mouseSub) {
      this.mouseSub.unsubscribe()
    }
  }
}
