import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/create', function() {
    it('creates a subfactory', function() {
        let F = {a: generators.sequence(), b: 5};
        let F2 = {f: generators.create(F, {b: 6})};

        expect(create(F2)).to.deep.equal({
            f: {
                a: 1,
                b: 6
            }
        });
    });
});
