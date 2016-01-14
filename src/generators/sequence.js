/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';

export default function sequence() {
    let n = 1;
    let string = false;
    let decrement = false;

    const generator = (function*() {
        for (;;) {
            let value;

            if (decrement) {
                value = n--;
            } else {
                value = n++;
            }

            if (string) {
                value = value.toString();
            }

            yield value;
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    next.decrement = () => {
        decrement = true;
        return next;
    };

    next.startFrom = (value) => {
        n = value;
        return next;
    };

    next.string = () => {
        string = true;
        return next;
    };

    return next;
}
