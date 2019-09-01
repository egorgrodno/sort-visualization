import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Complexity } from 'lib/sort'

@Component({
  selector: 'sv-complexity',
  templateUrl: './complexity.component.html',
  styleUrls: ['./complexity.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexityComponent {
  public Complexity = Complexity

  @Input()
  public complexity = Complexity.Constant

  @Input()
  public symbol = ''
}
