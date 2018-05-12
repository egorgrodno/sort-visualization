import { Type } from '@angular/core';

export { Algorithm } from './algorithm';
import { BubbleSort } from './bubble-sort.algorithm';

/**
 * Issue: https://github.com/Microsoft/TypeScript/issues/9347
 */
export const ALGORITHMS: { name: string, useClass: Algorithm }[] = [{
  name: 'Bubble sort',
  useClass: BubbleSort,
}];
