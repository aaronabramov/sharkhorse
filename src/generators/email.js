import BaseGenerator from './base';

export default class Email extends BaseGenerator {
    constructor() {
        super();
        this.n = 0;
    }

    _generate() {
        return `random_${this.n++}@example.com`;
    }
}
