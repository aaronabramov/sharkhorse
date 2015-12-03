/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';
import PRNG from 'prng';

const DEFAULT_FROM = '1987-10-10';
const DEFAULT_TO = '2015-10-10';

export default function date() {
    const prng = new PRNG();
    let from = Date.parse(DEFAULT_FROM);
    let to = Date.parse(DEFAULT_TO);
    let timestamp = false;

    const generator = (function*() {
        for (;;) {
            let value = prng.rand(from, to);

            if (timestamp === 'unix') {
                value = Math.floor(value / 1000);
            }

            if (!timestamp) {
                value = new Date(value);
            }

            yield value;
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    next.unixTimestamp = () => {
        timestamp = 'unix';
        return next;
    }

    next.jsTimestamp = () => {
        timestamp = 'js';
        return next;
    }

    return next;
}
