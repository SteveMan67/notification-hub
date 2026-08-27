import { isObjectBindingPattern } from "typescript";

export abstract class Component<T extends object> extends HTMLElement {
  protected readonly props: T;

  constructor(defaultProps: T) {
    super();

    this.props = defaultProps;

    for (const key of Object.keys(defaultProps) as (keyof T)[]) {
      Object.defineProperty(this, key, {
        get: () => this.props[key],

        set: (value: T[typeof key]) => {
          this.props[key] = value;
          this.update();
        },

        enumerable: true,
      });
    }
  }

  protected abstract update(): void;
}
