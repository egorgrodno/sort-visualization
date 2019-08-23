import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core'
import { AlgorithmType, Complexity, algorithmMap } from 'lib/sort'

@Component({
  selector: 'sv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnChanges {
  public algorithmName = ''
  public algorithmComplexity = [Complexity.Constant, Complexity.Constant, Complexity.Constant]
  public Complexity = Complexity

  @Input()
  public algorithm = AlgorithmType.BubbleSort

  public ngOnChanges(): void {
    const algorithmDefinition = algorithmMap.get(this.algorithm)

    if (algorithmDefinition) {
      this.algorithmName = algorithmDefinition.name
      this.algorithmComplexity = algorithmDefinition.complexity
    }
  }
}
