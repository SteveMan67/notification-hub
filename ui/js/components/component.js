export class Component extends HTMLElement {
    constructor(defaultProps) {
        super();
        this.props = defaultProps;
        for (const key of Object.keys(defaultProps)) {
            Object.defineProperty(this, key, {
                get: () => this.props[key],
                set: (value) => {
                    this.props[key] = value;
                    this.update();
                },
                enumerable: true,
            });
        }
    }
}
