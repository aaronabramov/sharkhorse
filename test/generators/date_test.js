import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/date', function() {
    it('generates a date', function() {
        let G = generators.date();

        expect(create(G)).to.be.a.instanceof(Date);
    });

    it('generates a timestamp', function() {
        let G = generators.date().timestamp();

        expect(create(G)).to.be.a('number');
    });
});
