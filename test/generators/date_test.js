import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/date', function() {
    it('generates a date', function() {
        let G = generators.date();

        expect(create(G)).to.be.a.instanceof(Date);
    });

    it('generates a js timestamp', function() {
        let G = generators.date().jsTimestamp();

        expect(create(G)).to.be.a('number');
        expect(create(G).toString()).to.have.length(12);
    });

    it('generates a unix timestamp', function() {
        let G = generators.date().unixTimestamp();

        expect(create(G)).to.be.a('number');
        expect(create(G).toString()).to.have.length(9);
    });
});
