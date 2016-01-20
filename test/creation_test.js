/* eslint-env mocha */

import {expect} from 'chai';
import {create, generators} from '../src';

describe('creation', function() {
    it('creates data when top level array is passed', function() {
        let F = generators.sequence();

        expect(create([F, F])).to.deep.equal([1, 2]);
    });
});
