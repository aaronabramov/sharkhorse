import Sequence from './generators/sequence';
import Email from './generators/email';
import Name from './generators/name';
import Lorem from './generators/lorem';
import Number_ from './generators/number';
import Create from './generators/create';
import CreateMany from './generators/create_many';

const GENERATORS = {
    email: Email,
    lorem: Lorem,
    name: Name,
    number: Number_,
    sequence: Sequence,
    create: Create,
    createMany: CreateMany
};

let generators = {};

Object.keys(GENERATORS).forEach(key => {
    generators[key] = function() {
        let args = [null].concat(Array.prototype.slice.call(arguments));
        let Ctr = GENERATORS[key];
        let Ctr2 = Ctr.bind.apply(Ctr, args)
        return new Ctr2();
    };
});

export default generators;
