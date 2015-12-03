/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/**
 * That module marks generator functions as generators by assigning a specific uuid value to a specific property name.
 * Later, when evaluating the factory, we can identify a generator function by its token.
 * similar to `instanceof` but for functions
 */

const IDENTIFIER = '8A12ABDF-FF00-4FDD-B8BD-EEC6B8D558F7'
const TOKEN_PROP_NAME = 'sharkhorseGeneratorToken';

export function markAsGenerator(fn) {
    fn[TOKEN_PROP_NAME] = IDENTIFIER;
}

export function isGenerator(obj) {
    return obj[TOKEN_PROP_NAME] === IDENTIFIER;
}
