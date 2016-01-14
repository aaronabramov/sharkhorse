/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator, isGenerator} from '../generator_token';

export default function templateString(strings, ...values) {
    const generator = (function*() {
        for (;;) {
            let i = 0;
            let j = 0;
            let result = '';

            while (i < strings.length || j < values.length) {
                result += strings[i];
                i += 1;

                if (values[j]) {
                    if (isGenerator(values[j])) {
                        result += values[j]();
                    } else {
                        result += values[j];
                    }

                    j++;
                }
            }

            yield result;
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    return next;
}
