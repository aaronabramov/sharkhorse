import BaseGenerator from './base';
import PRNG from 'prng';

export default class Number_ extends BaseGenerator {
    constructor() {
        super();
        this._min = 0;
        this._max = 1000;
        this._prng = new PRNG();
    }

    _generate() {
        return this._prng.rand(this._min, this._max);
    }

    min(n) {
        this._min = n;
        return this;
    }

    max(n) {
        this._max = n;
        return this;
    }
}
