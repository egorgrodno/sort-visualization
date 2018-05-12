export type BarStateType = 'default' | 'checking' | 'swapping' | 'completed';

export class Bar {
  public static counter = 0;

  public state: BarStateType = 'default';
  public valuePercentage: number;

  constructor(
    public value: number,
  ) {
    this.setValue(value);
  }

  public setState(state: BarStateType): void {
    this.state = state;
  }

  public setValue(value: number): void {
    this.value = value;
    this.valuePercentage = this.value / Bar.counter * 100;
  }
}
