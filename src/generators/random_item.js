/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';
import PRNG from 'prng';

/**
 * @param {Array} list of items. On of the items will be picked
 * as a resulting value
 */
export default function randomItem(list) {
    const prng = new PRNG();

    const generator = (function*() {
        for (;;) {
            yield list[prng.rand(0, list.length - 1)];
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    return next;
}
