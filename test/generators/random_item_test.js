/* eslint-env mocha */

import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/random_item', function() {
    it('generates a random number', function() {
        let result = {a: 0, b: 0, c: 0};
        let RandomItem = generators.randomItem(['a', 'b', 'c']);

        let i = 1000;

        while (i != 0) {
            result[create(RandomItem)]++;
            i--;
        }

        ['a', 'b', 'c'].forEach(item => {
            expect(result[item]).to.be.within(300, 400);
        });
    });
});
