import { ViewOperation } from ".";

export class Filter<T> implements ViewOperation<T[]> {
  constructor(private predicate: (item: T) => boolean) {}

  apply(input: T[]): T[] {
    return input.filter(this.predicate);
  }
}
