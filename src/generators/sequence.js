import BaseGenerator from './base';

export default class Sequence extends BaseGenerator {
    constructor() {
        super();
        this._n = 1;
        this._string = false;
        this._decrement = false;
    }

    _generate() {
        let n;

        if (this._decrement) {
            n = this._n--;
        } else {
            n = this._n++;
        }

        if (this._string) {
            n = n.toString();
        }

        return n;
    }

    startFrom(value) {
        this._n = value;

        return this;
    }

    decrement() {
        this._decrement = true;
        return this;
    }

    string() {
        this._string = true;
        return this;
    }
}
