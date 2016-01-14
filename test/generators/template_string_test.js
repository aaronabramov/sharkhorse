/* eslint-env mocha */

import {expect} from 'chai';
import {create, generators} from '../../src';
let {templateString: ts, sequence: s} = generators;

describe('generators/string_template', function() {
    it('generates a composite string', function() {
        expect(create(ts`${s()}a${s()}b`)).to.equal('1a1b');
        expect(create(ts`a${s()}b${s()}`)).to.equal('a1b1');
        expect(create(ts`a`)).to.equal('a');
        expect(create(ts`${s()}`)).to.equal('1');
        expect(create(ts`${222}`)).to.equal('222');
    });

    it('uses the same generator every time', function() {
        let Str = ts`${s().startFrom(100)}`;

        expect(create(Str)).to.equal('100');
        expect(create(Str)).to.equal('101');
        expect(create(Str)).to.equal('102');
    });
});
