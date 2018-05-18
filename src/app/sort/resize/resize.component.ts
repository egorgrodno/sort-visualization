import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

const MIN_HEIGHT = 265;
const DEFAULT_HEIGHT = 300;

@Component({
  selector: 'app-resize',
  template: '<mat-icon color="primary">expand_more</mat-icon>',
  styleUrls: ['./resize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizeComponent implements OnInit, OnDestroy {

  @Input() target: HTMLDivElement;

  public targetHeight = DEFAULT_HEIGHT;
  private mouseDownSub: Subscription;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private renderer: Renderer2,
    private host: ElementRef,
  ) { }

  ngOnInit() {
    this.mouseDownSub = fromEvent(this.host.nativeElement, 'mousedown')
      .pipe(
        switchMap(
          () => fromEvent(this.doc.documentElement, 'mousemove').pipe(
            map((event: MouseEvent) => event.movementY),
            takeUntil(fromEvent(this.doc.documentElement, 'mouseup')),
          ),
        ),
        map((movementY) => movementY + this.targetHeight),
        map((height) => height < MIN_HEIGHT && MIN_HEIGHT || height),
        distinctUntilChanged(),
      ).subscribe((height) => {
        this.targetHeight = height;
        this.renderer.setStyle(this.target, 'height', `${height}px`);
      });
  }

  ngOnDestroy() {
    this.mouseDownSub.unsubscribe();
  }
}
