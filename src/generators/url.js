/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';
import {WORDS} from '../constants/lorem_ipsum';
import PRNG from 'prng';

const prng = new PRNG();

export default function lorem() {
    const generator = (function*() {
        for (;;) {
            let result = [];

            // three random words
            result.push(WORDS[prng.rand(1, 1000) % (WORDS.length - 1)]);
            result.push(WORDS[prng.rand(1, 1000) % (WORDS.length - 1)]);
            result.push(WORDS[prng.rand(1, 1000) % (WORDS.length - 1)]);

            yield `http://${result.join('')}.com`.toLowerCase();
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);


    return next;
}
