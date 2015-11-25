/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import BaseGenerator from './base';
import PRNG from 'prng';
import invariant from '../invariant';

const DEFAULT_FROM = '1987-10-10';
const DEFAULT_TO = '2015-10-10';

export default class Date_ extends BaseGenerator {
    constructor() {
        super();
        this._from = Date.parse(DEFAULT_FROM);
        this._to = Date.parse(DEFAULT_TO);
        this._prng = new PRNG();
    }

    _generate() {
        return this._prng.rand(this._from, this._to);
    }
}
