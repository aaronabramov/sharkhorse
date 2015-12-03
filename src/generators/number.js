/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';
import PRNG from 'prng';

export default function number() {
    const prng = new PRNG();
    let min = 0;
    let max = 1000;

    const generator = (function*() {
        for (;;) {
            yield prng.rand(min, max);
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    next.min = (value) => {
        min = value;
        return next;
    }

    next.max = (value) => {
        max = value;
        return next;
    }

    return next;
}
