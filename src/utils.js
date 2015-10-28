/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import BaseGenerator from './generators/base';

export function extend(into /*, &more */ ) {
    for (var i = 1; i < arguments.length; i++) {
        for (var attrname in arguments[i]) {
            if (arguments[i].hasOwnProperty(attrname)) {
                into[attrname] = arguments[i][attrname];
            }
        }
    }

    return into;
}

/**
 * iterate deeply through the object (including nested arrays) and return a new
 * copy of this object.
 *
 * This function will not iterate through generator objects
 */
export function deepMap(obj, replace) {
    if (!replace) {
        replace = (value) => { return value; };
    }
    obj = replace(obj);

    if (obj && obj.constructor === Array) {
        let result = [];

        obj.forEach(el => {
            result.push(deepMap(el, replace));
        });

        return result;
        // NOTE: BaseGenerator instances are excluded
    } else if (obj !== null && typeof obj === 'object' && !(obj instanceof BaseGenerator)) {
        let result = {};

        Object.keys(obj).forEach(key => {
            result[key] = deepMap(obj[key], replace);
        });

        return result;
    } else {
        return obj;
    }
}

export function deepAssign(dest, src) {
    let result = extend({}, dest);

    Object.keys(src).forEach((key) => {
        if (dest.hasOwnProperty(key) &&
            dest[key] !== null &&
            typeof dest[key] === 'object' &&
            typeof src[key] === 'object'
           ) {
               result[key] = deepAssign(dest[key], src[key]);

        } else {
            result[key] = src[key];
        }
    });

    return result;
}
