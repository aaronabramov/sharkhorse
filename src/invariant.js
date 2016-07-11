/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

export default function invariant(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
