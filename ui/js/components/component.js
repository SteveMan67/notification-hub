export class Component extends HTMLElement {
    constructor(defaultProps) {
        super();
        this.props = defaultProps;
        this.values = Object.assign({}, defaultProps);
        for (const key of Object.keys(defaultProps)) {
            Object.defineProperty(this.props, key, {
                get: () => this.values[key],
                set: (value) => {
                    this.values[key] = value;
                    this.update();
                },
                enumerable: true,
            });
        }
    }
}
