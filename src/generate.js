import Sequence from './generators/sequence';
import Email from './generators/email';

const GENERATORS = {
    sequence: Sequence,
    email: Email
};

export default function generate(name) {
    let Generator = GENERATORS[name];

    if (!Generator) {
        throw new Error(`unknown generator.
                        available generators:
                        ${JSON.stringify(GENERATORS)}`);
    }

    return new Generator();
}
