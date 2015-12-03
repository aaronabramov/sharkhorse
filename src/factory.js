/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {extend, deepMap} from './utils.js';
import {isGenerator} from './generator_token';
import invariant from './invariant';

export function create(descriptor, attributes) {
    invariant(descriptor, 'descriptor is required');

    if (isGenerator(descriptor)) {
        return descriptor();
    }

    let result = extend({}, descriptor, attributes);


    return deepMap(result, (node) => {
        if (isGenerator(node)) {
            return node();
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
