/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {markAsGenerator} from '../generator_token';
import LOREM_IPSUM, {PARAGRAPHS, WORDS} from '../constants/lorem_ipsum';
import PRNG from 'prng';

const prng = new PRNG();

export default function lorem() {
    let type = 'paragraphs';
    let n = 1;

    function _getNParagraphs(n) {
        let result = [];

        for (let i = 0; i < n; i++) {
            result.push(PARAGRAPHS[prng.rand(1, 1000) % (PARAGRAPHS.length - 1)]);
        }

        return result.join('\n\n');
    }

    function _getNWords(n) {
        let result = [];

        for (let i = 0; i < n; i++) {
            result.push(WORDS[prng.rand(1, 1000) % (WORDS.length - 1)]);
        }

        return result.join(' ');
    }

    const generator = (function*() {
        switch (type) {
            case 'paragraphs':
                yield _getNParagraphs(n);
                break;
            case 'words':
                return _getNWords(n);
                break;
            default:
                throw new Error(`unknown type: ${type}`);
        }
    })();

    function next() {
        return generator.next().value;
    };

    markAsGenerator(next);

    next.words = (value) => {
        type = 'words';
        n = value;
        return next;
    }

    next.paragraphs = (value) => {
        type = 'paragraphs';
        n = value;
        return next;
    }

    next.word = () => {
        type = 'words';
        n = 1;
        return next;
    }

    next.paragraph = () => {
        type = 'paragraphs';
        n = 1;
        return next;
    }

    return next;
}
