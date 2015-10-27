import {expect} from 'chai';
import {create, generators} from '../../';

describe('generators/sequence', function() {
    it('generates a sequence', function() {
        let F = {
            id: generators.sequence()
        };

        expect(create(F)).to.deep.equal({id: 1});
        expect(create(F)).to.deep.equal({id: 2});
    });

    it('generates a sequence starting from x', function() {
        let F = {
            id: generators.sequence().startFrom(5)
        };

        expect(create(F)).to.deep.equal({id: 5});
        expect(create(F)).to.deep.equal({id: 6});
    });

    it('generates a sequence starting from x decrementing', function() {
        let F = {
            id: generators.sequence().startFrom(5).decrement()
        };

        expect(create(F)).to.deep.equal({id: 5});
        expect(create(F)).to.deep.equal({id: 4});
    });

    it('generates a decrementing sequence starting from x', function() {
        let F = {
            id: generators.sequence().decrement().startFrom(5)
        };

        expect(create(F)).to.deep.equal({id: 5});
        expect(create(F)).to.deep.equal({id: 4});
    });

    it('generates a string number', function() {
        let F = {
            id: generators.sequence().decrement().startFrom(5).string()
        };

        expect(create(F)).to.deep.equal({id: '5'});
        expect(create(F)).to.deep.equal({id: '4'});
    });
});
