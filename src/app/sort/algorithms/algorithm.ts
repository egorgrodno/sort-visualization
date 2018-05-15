import { BarList } from '../bar-list/bar-list';
import { BarState } from '../bar/bar';

/**
 * Just in case I would need to add
 * property to all types of actions
 */
interface BaseAction {
  state: BarState;
}

interface CompleteAction extends BaseAction {
  state: BarState.Completed;
}

interface CheckOrSwapAction extends BaseAction {
  state: BarState.Checking | BarState.Swapping;
  firstIndex: number;
  secondIndex: number;
}

interface SwapToShadowAction extends BaseAction {
  state: BarState.SwappingToShadowArray;
  index: number;
}

interface SwapFromShadowAction extends BaseAction {
  state: BarState.SwappingFromShadowArray;
  index: number;
  value: number;
  newValue: number;
}

type Action = CompleteAction
  | CheckOrSwapAction
  | SwapToShadowAction
  | SwapFromShadowAction;

export interface ActionList {
  [key: number]: Action;
}

export abstract class Algorithm {
  protected abstract sortArray(array: Uint16Array): void;
  protected arraySize: number;

  /**
   * Action (manipulation) history
   */
  protected actions: ActionList;
  private barList: BarList;
  private currentAction = null as Action;
  private currentActionIndex = -1;
  private comparisonCount = 0;
  private swapCount = 0;

  public setBarList(barList: BarList): void {
    this.barList = barList;
    this.sortArray(barList.getArray());
  }

  public initDefaults(): void {
    this.currentAction = null;
    this.currentActionIndex = -1;
    this.comparisonCount = 0;
    this.swapCount = 0;
  }

  public reSort(): void {
    this.initDefaults();
    this.sortArray(this.barList.getArray());
  }

  /**
   * Performs 1 algorithm iteration.
   * Returns true if finished (sorted)
   */
  public next(): boolean {
    if (this.currentAction) {
      this.flushCurrentAction();
    }

    this.currentActionIndex++;
    this.currentAction = this.actions[this.currentActionIndex];
    this.handleCurrentAction();

    if (this.currentAction.state === BarState.Checking) {
      this.comparisonCount++;
    } else if (this.currentAction.state === BarState.Swapping || this.currentAction.state === BarState.SwappingToShadowArray || this.currentAction.state === BarState.SwappingFromShadowArray) {
      this.swapCount++;
    }

    this.barList.triggerChange();
    return !this.actions[this.currentActionIndex + 1];
  }

  /**
   * Performs 1 algorithm iteration backwards.
   * Returns true if finished (no actions left)
   */
  public previous(): boolean {
    if (this.currentAction) {
      if (this.currentAction.state === BarState.Checking) {
        this.comparisonCount--;
      } else if (this.currentAction.state === BarState.Swapping || this.currentAction.state === BarState.SwappingToShadowArray || this.currentAction.state === BarState.SwappingFromShadowArray) {
        this.swapCount--;
      }
      this.cancelCurrentAction();
    }

    this.currentActionIndex--;
    this.currentAction = this.actions[this.currentActionIndex];

    if (this.currentAction) {
      this.displayCurrentAction();
    }

    this.barList.triggerChange();
    return this.currentActionIndex < 0;
  }

  private displayCurrentAction(): void {
    if (this.currentAction.state === BarState.SwappingToShadowArray || this.currentAction.state === BarState.SwappingFromShadowArray) {
      this.barList.setBarState(this.currentAction.index, this.currentAction.state);
    } else {
      /** Action state can't be Completed at this point */
      this.barList.setBarState((this.currentAction as CheckOrSwapAction).firstIndex, this.currentAction.state);
      this.barList.setBarState((this.currentAction as CheckOrSwapAction).secondIndex, this.currentAction.state);
    }
  }

  private flushCurrentAction(): void {
    if (this.currentAction.state === BarState.SwappingToShadowArray || this.currentAction.state === BarState.SwappingFromShadowArray) {
      this.barList.setBarState(this.currentAction.index, BarState.Default);
    } else {
      /** Action state can't be Completed at this point */
      this.barList.setBarState((this.currentAction as CheckOrSwapAction).firstIndex, BarState.Default);
      this.barList.setBarState((this.currentAction as CheckOrSwapAction).secondIndex, BarState.Default);
    }
  }

  private handleCurrentAction(): void {
    if (this.currentAction.state === BarState.Checking) {
      this.barList.setBarState(this.currentAction.firstIndex, BarState.Checking);
      this.barList.setBarState(this.currentAction.secondIndex, BarState.Checking);
    } else if (this.currentAction.state === BarState.Swapping) {
      this.barList.swapBarValues(this.currentAction.firstIndex, this.currentAction.secondIndex);
      this.barList.setBarState(this.currentAction.firstIndex, BarState.Swapping);
      this.barList.setBarState(this.currentAction.secondIndex, BarState.Swapping);
    } else if (this.currentAction.state === BarState.SwappingToShadowArray) {
      this.barList.setBarState(this.currentAction.index, BarState.SwappingToShadowArray);
    } else if (this.currentAction.state === BarState.SwappingFromShadowArray) {
      this.barList.setBarValue(this.currentAction.index, this.currentAction.newValue);
      this.barList.setBarState(this.currentAction.index, BarState.SwappingFromShadowArray);
    } else if (this.currentAction.state === BarState.Completed) {
      for (let i = 0, arraySize = this.arraySize; i < arraySize; i++) {
        this.barList.setBarState(i, BarState.Completed);
      }
    }
  }

  private cancelCurrentAction(): void {
    if (this.currentAction.state === BarState.Completed) {
      for (let i = 0, arraySize = this.arraySize; i < arraySize; i++) {
        this.barList.setBarState(i, BarState.Default);
      }
    } else if (this.currentAction.state === BarState.SwappingToShadowArray || this.currentAction.state === BarState.SwappingFromShadowArray) {
      this.barList.setBarState(this.currentAction.index, BarState.Default);
      if (this.currentAction.state === BarState.SwappingFromShadowArray) {
        this.barList.setBarValue(this.currentAction.index, this.currentAction.value);
      }
    } else {
      if (this.currentAction.state === BarState.Swapping) {
        this.barList.swapBarValues(this.currentAction.firstIndex, this.currentAction.secondIndex);
      }
      this.barList.setBarState(this.currentAction.firstIndex, BarState.Default);
      this.barList.setBarState(this.currentAction.secondIndex, BarState.Default);
    }
  }

  protected getCompletedAction(): Action {
    return { state: BarState.Completed };
  }
}
