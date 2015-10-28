import {extend, deepMap} from './utils.js';
import BaseGenerator from './generators/base';

export function create(descriptor, attributes) {
    let result = extend({}, descriptor, attributes);

    return deepMap(result, (node) => {
        if (node instanceof BaseGenerator) {
            return node._generate();
        }

        return node;
    });
}

export function createMany(descriptor, n) {
    let result = [];
    let i;

    for (i = 0; i < n; i++) {
        result.push(create(descriptor));
    }

    return result;
}
