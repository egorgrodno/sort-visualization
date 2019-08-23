import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core'

export enum AlgorithmControlVariant {
  Prev,
  FastRewind,
  Pause,
  FastForward,
  Next,
}

@Component({
  selector: 'sv-algorithm-control',
  templateUrl: './algorithm-control.component.html',
  styleUrls: ['./algorithm-control.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmControlComponent {
  public AlgorithmControlVariant = AlgorithmControlVariant

  @Input()
  public variant?: AlgorithmControlVariant

  @Input()
  public disabled: boolean | null = null

  @Output()
  public action = new EventEmitter<void>()
}
