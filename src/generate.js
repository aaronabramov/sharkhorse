import uuid from 'node-uuid';
import PRNG from 'prng';
import {LAZY_FN_TOKEN} from './constants.js';

import Sequence from './generators/sequence';

let uniqId = 0;

const GENERATORS = {
    sequence: Sequence
}

export default function generate(name) {
    let Generator = GENERATORS[name];

    if (!Generator) {
        throw new Error(`unknown generator.
                        available generators:
                        ${JSON.stringify(GENERATORS)}`);
    }

    return new Generator();
}
