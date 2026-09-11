export abstract class Component<T extends object> extends HTMLElement {
  props: T;
  private values: T;

  constructor(defaultProps: T) {
    super();

    this.props = defaultProps;
    this.values = { ...defaultProps };

    for (const key of Object.keys(defaultProps) as (keyof T)[]) {
      Object.defineProperty(this.props, key, {
        get: () => this.values[key],

        set: (value: T[typeof key]) => {
          this.values[key] = value;
          this.update();
        },

        enumerable: true,
      });
    }
  }

  protected abstract update(): void;
}
