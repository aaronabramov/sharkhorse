import {expect} from 'chai';
import Factory, {generate} from '../../';

describe('generators/number', function() {
    it('generates a random number', function() {
        let F = Factory({
            n: generate('number')
        });

        let {n} = F.create();

        expect(n).to.be.within(0, 1000);
    });

    it('generates a random number', function() {
        let i = 1000;

        let F = Factory({
            n: generate('number').min(5).max(10)
        });

        while (i = 0) {
            let {n} = F.create();
            expect(n).to.be.within(5, 10);
            i--;
        }
    });
});
