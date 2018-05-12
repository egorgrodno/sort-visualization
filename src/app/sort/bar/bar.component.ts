import { Component, OnChanges, SimpleChanges, OnInit, DoCheck, Input, ChangeDetectionStrategy, Renderer2, ElementRef, HostBinding } from '@angular/core';

import { Bar } from './bar';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent implements OnInit, OnChanges, DoCheck {
  @Input() item: Bar;

  constructor(
    private _host: ElementRef,
    private _renderer: Renderer2,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this._renderer.setStyle(this._host.nativeElement, 'height', `${this.item.valuePercentage}%`);
  }

  @HostBinding('class.checking') isChecking: boolean;
  @HostBinding('class.swapping') isSwapping: boolean;
  @HostBinding('class.completed') isCompleted: boolean;

  ngDoCheck() {
    if (this.item.state === 'default') {
      this.isChecking = false;
      this.isSwapping = false;
      this.isCompleted = false;
    } else if (this.item.state === 'checking') {
      this.isChecking = true;
      this.isSwapping = false;
      this.isCompleted = false;
    } else if (this.item.state === 'swapping') {
      this.isChecking = false;
      this.isSwapping = true;
      this.isCompleted = false;
    } else if (this.item.state === 'completed') {
      this.isChecking = false;
      this.isSwapping = false;
      this.isCompleted = true;
    } else {
      throw new Error(`Unhandled bar state (${this.item.state})!`);
    }
  }

  ngOnInit() { }
}
