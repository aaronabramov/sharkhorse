/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import FIRST_NAMES from '../constants/first_names';
import LAST_NAMES from '../constants/last_names';

import {markAsGenerator} from '../generator_token';

function randomFirstName(names = FIRST_NAMES) {
    return names[Math.floor(Math.random() * names.length)];
}

function randomLastName() {
    return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
}

const TYPES = {
    FIRST: 'FIRST',
    LAST: 'LAST',
    FULL: 'FULL'
};


export default function name() {
    let type = TYPES.FULL;

    const generator = (function*() {
        for (;;) {
            switch (type) {
            case TYPES.FIRST:
                yield randomFirstName();
                break;
            case TYPES.LAST:
                yield randomLastName();
                break;
            case TYPES.FULL:
                yield `${randomFirstName()} ${randomLastName()}`;
                break;
            default:
                throw new Error(`unknownType: ${this.type}`);
            }
        }
    })();

    function next() {
        return generator.next().value;
    }

    markAsGenerator(next);

    next.first = () => {
        type = TYPES.FIRST;
        return next;
    };

    next.last = () => {
        type = TYPES.LAST;
        return next;
    };

    return next;
}
