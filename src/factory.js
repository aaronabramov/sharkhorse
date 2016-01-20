/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {extend, deepMap} from './utils.js';
import {isGenerator} from './generator_token';
import invariant from './invariant';

export function create(descriptor, attributes) {
    let result;

    invariant(
        descriptor !== null && descriptor !== undefined,
        `'sharkhorse#create()' function expects an object as an argument. got '${descriptor}'`
    );

    if (isGenerator(descriptor)) {
        return descriptor();
    }

    if (descriptor.constructor.name === 'Array') {
        invariant(!attributes, `Can't pass attributes when array is passed to \`create\``);
        result = descriptor.map(el => el);
    } else {
        result = extend({}, descriptor, attributes);
    }


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
