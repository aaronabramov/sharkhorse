import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/number', function() {
    it('generates a random number', function() {
        let F = {
            n: generators.number()
        };

        let {n} = create(F);

        expect(n).to.be.within(0, 1000);
    });

    it('generates a random number', function() {
        let i = 1000;

        let F = {
            n: generators.number().min(5).max(10)
        };

        while (i = 0) {
            let {n} = create(F);
            expect(n).to.be.within(5, 10);
            i--;
        }
    });
});
