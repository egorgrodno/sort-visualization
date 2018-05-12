import { Type } from '@angular/core';

export { Algorithm } from './algorithm';
import { BubbleSort } from './bubble-sort.algorithm';
import { BetterBubbleSort } from './better-bubble-sort.algorithm';

/**
 * Issue: https://github.com/Microsoft/TypeScript/issues/9347
 */
export const ALGORITHMS: { name: string, useClass: Algorithm }[] = [{
  name: 'Bubble Sort',
  useClass: BubbleSort,
}, {
  name: 'Better Bubble Sort',
  useClass: BetterBubbleSort,
}];
