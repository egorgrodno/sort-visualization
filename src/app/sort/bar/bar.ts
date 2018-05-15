export enum BarState {
  Default,
  Checking,
  Swapping,
  Completed,
}

export class Bar {
  constructor(
    public value = 0,
    public state = BarState.Default,
  ) { }

  public getValue(): number { return this.value; }
  public setValue(newValue: number): void { this.value = newValue; }
  public setState(newState: BarState): void { this.state = newState; }
}
