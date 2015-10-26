import {extend, deepMap, deepAssign} from './utils.js';
import BaseGenerator from './generators/base';

export const generate = require('./generate');

/**
 * Constructor for factory object
 */
export default function(descriptor) {
    return new Factory(descriptor);
}

class Factory {
    constructor(descriptor) {
        this.descriptor = descriptor;
    }

    create(attributes = {}) {
        let result = extend({}, this.descriptor, attributes);

        // eval all lazy functions
        for (var attribute in result) {
            if (result[attribute] instanceof BaseGenerator) {
                result[attribute] = result[attribute]._generate();
            }
        }

        return result;
    }

    createMany(n) {
        let result = [];
        let i;

        for (i = 0; i < n; i++) {
            result.push(this.create());
        }
        return result;
    }

    extend(extendFn) {
        let result = deepMap(this.descriptor);
        let extendedObj = extendFn.call(null, result) || result;

        return Factory(extendedObj);
    }
}
