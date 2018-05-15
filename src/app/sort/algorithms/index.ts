import { Type } from '@angular/core';

import { BetterBubbleSort } from './better-bubble-sort.algorithm';
import { BubbleSort } from './bubble-sort.algorithm';
import { CocktailSort } from './cocktail-sort.algorithm';

export { Algorithm } from './algorithm';

/**
 * Issue: https://github.com/Microsoft/TypeScript/issues/9347
 */
export const ALGORITHMS: { name: string, useClass: Algorithm }[] = [{
  name: 'Bubble Sort',
  useClass: BubbleSort,
}, {
  name: 'Better Bubble Sort',
  useClass: BetterBubbleSort,
}, {
  name: 'Cocktail Sort',
  useClass: CocktailSort,
}];
