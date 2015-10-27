import Sequence from './generators/sequence';
import Email from './generators/email';
import Name from './generators/name';
import Lorem from './generators/lorem';
import Number_ from './generators/number';

const GENERATORS = {
    email: Email,
    lorem: Lorem,
    name: Name,
    number: Number_,
    sequence: Sequence
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
