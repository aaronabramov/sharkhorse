/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

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
