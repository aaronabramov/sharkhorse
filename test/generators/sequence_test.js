import {expect} from 'chai';
import Factory, {generate} from '../../';

describe('generators/sequence', function() {
    it('generates a sequence', function() {
        let F = Factory({
            id: generate('sequence')
        });

        expect(F.create()).to.deep.equal({id: 1});
        expect(F.create()).to.deep.equal({id: 2});
    });

    it('generates a sequence starting from x', function() {
        let F = Factory({
            id: generate('sequence').startFrom(5)
        });

        expect(F.create()).to.deep.equal({id: 5});
        expect(F.create()).to.deep.equal({id: 6});
    });

    it('generates a sequence starting from x decrementing', function() {
        let F = Factory({
            id: generate('sequence').startFrom(5).decrement()
        });

        expect(F.create()).to.deep.equal({id: 5});
        expect(F.create()).to.deep.equal({id: 4});
    });

    it('generates a decrementing sequence starting from x', function() {

        let F = Factory({
            id: generate('sequence').decrement().startFrom(5)
        });

        expect(F.create()).to.deep.equal({id: 5});
        expect(F.create()).to.deep.equal({id: 4});
    });
});
