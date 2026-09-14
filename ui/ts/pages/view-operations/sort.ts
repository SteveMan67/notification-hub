import { ViewOperation } from ".";

export class Sort<T> implements ViewOperation<T[]> {
  constructor(private compare: (a: T, b: T) => number) {}

  apply(input: T[]): T[] {
    return [...input].sort(this.compare);
  }
}
