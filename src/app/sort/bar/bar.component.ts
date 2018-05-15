import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bar',
  template: '',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent {
  constructor() { }
}
