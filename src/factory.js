/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {extend, deepMap} from './utils.js';
import BaseGenerator from './generators/base';

export function create(descriptor, attributes) {
    let result = extend({}, descriptor, attributes);

    if (descriptor instanceof BaseGenerator) {
        return descriptor._generate();
    }

    return deepMap(result, (node) => {
        if (node instanceof BaseGenerator) {
            return node._generate();
        }

        return node;
    });
}

export function createMany(descriptor, n, params) {
    let result = [];
    let i;

    for (i = 0; i < n; i++) {
        result.push(create(descriptor, params));
    }

    return result;
}
