export interface ViewOperation<T> {
  apply(input: T): T;
}
