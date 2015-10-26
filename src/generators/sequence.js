import BaseGenerator from './base';

export default class Sequence extends BaseGenerator {
    constructor() {
        super();
        this.n = 1;
    }

    _generate() {
        return this.n++;
    }

    startFrom(value) {
        this.n = value;

        return this;
    }

    decrement() {
        let gen = new DecrementingSequence();
        gen.n = this.n;
        return gen;
    }
}

class DecrementingSequence extends Sequence {
    constructor() {
        super();
    }

    _generate() {
        return this.n--;
    }
}
