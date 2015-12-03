/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';

export default function email() {
    let n = 0;

    const generator = (function*() {
        for (;;) {
            yield `random_${n++}@example.com`;
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    return next;
}
