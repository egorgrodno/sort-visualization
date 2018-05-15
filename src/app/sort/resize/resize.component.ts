import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

const MIN_HEIGHT = 150;
const DEFAULT_HEIGHT = 300;

@Component({
  selector: 'app-resize',
  template: '<mat-icon>expand_more</mat-icon>',
  styleUrls: ['./resize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizeComponent implements OnInit {

  @Input() target: HTMLDivElement;

  public targetHeight = DEFAULT_HEIGHT;

  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    private _renderer: Renderer2,
    private _host: ElementRef,
  ) { }

  ngOnInit() {
    fromEvent(this._host.nativeElement, 'mousedown')
      .pipe(
        switchMap(
          () => fromEvent(this._doc.documentElement, 'mousemove').pipe(
            map((event: MouseEvent) => event.movementY),
            takeUntil(fromEvent(this._doc.documentElement, 'mouseup')),
          ),
        ),
        map((movementY) => movementY + this.targetHeight),
        map((height) => height < MIN_HEIGHT && MIN_HEIGHT || height),
        distinctUntilChanged(),
      ).subscribe((height) => {
        this.targetHeight = height;
        this._renderer.setStyle(this.target, 'height', `${height}px`);
      });
  }
}
