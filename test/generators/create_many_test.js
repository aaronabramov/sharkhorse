import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/create_many', function() {
    it('creates a subfactory collection', function() {
        let F = {a: generators.sequence()};
        let F2 = {f: generators.createMany(F, 2)};

        expect(create(F2)).to.deep.equal({
            f: [{
                a: 1,
            }, {
                a: 2
            }]
        });
    });
});
