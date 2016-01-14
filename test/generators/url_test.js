/* global describe, it */

import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/url', function() {
    it('generates a random url', function() {
        let Url = generators.url();

        expect(create(Url)).to.match(/^http\:\/\/\w+\.com$/i);
    });
});
