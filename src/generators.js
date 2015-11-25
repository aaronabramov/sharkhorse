/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import Create from './generators/create';
import CreateMany from './generators/create_many';
import Date_ from './generators/date';
import Email from './generators/email';
import Lorem from './generators/lorem';
import Name from './generators/name';
import Number_ from './generators/number';
import Sequence from './generators/sequence';

const GENERATORS = {
    create: Create,
    createMany: CreateMany,
    date: Date_,
    email: Email,
    lorem: Lorem,
    name: Name,
    number: Number_,
    sequence: Sequence
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
