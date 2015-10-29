import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/lorem', function() {
    it('generates a paraghaph', function() {
        let Message = {
            txt: generators.lorem()
        };

        let {txt} = create(Message);

        expect(txt).to.match(/[\w\s\.\,]/);
        expect(txt).to.have.length.within(100, 500);
    });

    it('generates x words', function() {
        let F = {
            txt: generators.lorem().words(10)
        };

        let {txt} = create(F);

        expect(txt).to.match(/[\w\s]/);
        expect(txt.split(' ')).to.have.length(10);
    });

    it('generates multiple paraghaphs or words', function() {
        let F = {txt: generators.lorem().words(5)};
        expect(create(F).txt.split(' ')).to.have.length(5);

        F = {txt: generators.lorem().paraghaphs(5)};
        expect(create(F).txt.split('\n\n')).to.have.length(5);
    });


    it('generates a paraghaphs or a word', function() {
        let F = {txt: generators.lorem().word};
        expect(create(F).txt).to.match(/\w/);

        F = {txt: generators.lorem().paraghaph()};
        expect(create(F).txt).to.have.length.within(100, 500);
    });
});
