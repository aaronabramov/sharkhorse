/* eslint-env mocha */

import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/string_template', function() {
    it.skip('generates a composite string', function() {
        let Str = generators.stringTemplate`a${generators.sequence()}b${generators.sequence()}`;

        expect(create(Str)).to.equal('a1b1');
    });
});
