import Sequence from './generators/sequence';
import Email from './generators/email';
import Name from './generators/name';

const GENERATORS = {
    sequence: Sequence,
    email: Email,
    name: Name
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
