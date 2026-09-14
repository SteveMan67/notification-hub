export class Sort {
    constructor(compare) {
        this.compare = compare;
    }
    apply(input) {
        return [...input].sort(this.compare);
    }
}
