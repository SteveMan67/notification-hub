export class Filter {
    constructor(predicate) {
        this.predicate = predicate;
    }
    apply(input) {
        return input.filter(this.predicate);
    }
}
