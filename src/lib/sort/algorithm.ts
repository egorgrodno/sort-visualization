import {
  bubbleSortAlgorithm,
  cocktailSortAlgorithm,
  heapsortAlgorithm,
  insertionSortAlgorithm,
  mergeSortAlgorithm,
  quicksortAlgorithm,
  selectionSortAlgorithm,
} from './algorithms'
import { InstructionModule } from './instruction-module'

export enum AlgorithmType {
  BubbleSort,
  CocktailSort,
  SelectionSort,
  InsertionSort,
  Quicksort,
  MergeSort,
  Heapsort,
}

export enum Complexity {
  Constant,
  Logarithmic,
  Linear,
  LogLinear,
  PolynomialQuadratic,
}

interface AlgorithmDefinition {
  name: string
  complexity: [Complexity, Complexity, Complexity] // [best, average, worst]
  fn: (arr: number[]) => InstructionModule
}

export const algorithmMap = new Map<AlgorithmType, AlgorithmDefinition>()
  .set(AlgorithmType.BubbleSort, {
    name: 'Bubble sort',
    complexity: [
      Complexity.Linear,
      Complexity.PolynomialQuadratic,
      Complexity.PolynomialQuadratic,
    ],
    fn: bubbleSortAlgorithm,
  })
  .set(AlgorithmType.CocktailSort, {
    name: 'Cocktail sort',
    complexity: [
      Complexity.Linear,
      Complexity.PolynomialQuadratic,
      Complexity.PolynomialQuadratic,
    ],
    fn: cocktailSortAlgorithm,
  })
  .set(AlgorithmType.SelectionSort, {
    name: 'Selection sort',
    complexity: [
      Complexity.PolynomialQuadratic,
      Complexity.PolynomialQuadratic,
      Complexity.PolynomialQuadratic,
    ],
    fn: selectionSortAlgorithm,
  })
  .set(AlgorithmType.InsertionSort, {
    name: 'Insertion sort',
    complexity: [
      Complexity.Linear,
      Complexity.PolynomialQuadratic,
      Complexity.PolynomialQuadratic,
    ],
    fn: insertionSortAlgorithm,
  })
  .set(AlgorithmType.MergeSort, {
    name: 'Merge sort',
    complexity: [
      Complexity.LogLinear,
      Complexity.LogLinear,
      Complexity.LogLinear,
    ],
    fn: mergeSortAlgorithm,
  })
  .set(AlgorithmType.Quicksort, {
    name: 'Quicksort',
    complexity: [
      Complexity.LogLinear,
      Complexity.LogLinear,
      Complexity.PolynomialQuadratic,
    ],
    fn: quicksortAlgorithm,
  })
  .set(AlgorithmType.Heapsort, {
    name: 'Heapsort',
    complexity: [
      Complexity.LogLinear,
      Complexity.LogLinear,
      Complexity.LogLinear,
    ],
    fn: heapsortAlgorithm,
  })
