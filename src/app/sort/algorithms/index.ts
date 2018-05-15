import { BubbleSort } from './bubble-sort.algorithm';
import { CocktailSort } from './cocktail-sort.algorithm';
import { InsertionSort } from './insertion-sort.algorithm';
import { MergeSort } from './merge-sort.algorithm';
import { QuickSort } from './quick-sort.algorithm';
import { SelectionSort } from './selection-sort.algorithm';

export { Algorithm } from './algorithm';

/**
 * Issue: https://github.com/Microsoft/TypeScript/issues/9347
 */
export const ALGORITHMS: { name: string, useClass: Algorithm }[] = [{
  name: 'Bubble Sort',
  useClass: BubbleSort,
}, {
  name: 'Cocktail Sort',
  useClass: CocktailSort,
}, {
  name: 'Selection Sort',
  useClass: SelectionSort,
}, {
  name: 'Insertion Sort',
  useClass: InsertionSort,
}, {
  name: 'Merge Sort',
  useClass: MergeSort,
}, {
  name: 'Quick Sort',
  useClass: QuickSort,
}];
