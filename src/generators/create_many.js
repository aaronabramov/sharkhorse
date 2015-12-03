/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {createMany as createManyFactories} from '../factory';
import {markAsGenerator} from '../generator_token';

export default function createMany(/* descriptor, attributes */) {
    const args = arguments;
    const generator = (function*() {
        for (;;) {
            yield createManyFactories.apply(null, args);
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    return next;
}
