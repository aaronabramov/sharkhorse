import {expect} from 'chai';
import Factory, {generate} from '../../';

describe('generators/lorem', function() {
    it('generates a paraghaph', function() {
        let F = Factory({
            txt: generate('lorem')
        });

        let {txt} = F.create();

        expect(txt).to.match(/[\w\s\.\,]/);
        expect(txt).to.have.length.within(100, 500);
    });

    it('generates x words', function() {
        let F = Factory({
            txt: generate('lorem').words(10)
        });

        let {txt} = F.create();

        expect(txt).to.match(/[\w\s]/);
        expect(txt.split(' ')).to.have.length(10);
    });

    it('generates multiple paraghaphs or words', function() {
        let F = Factory({txt: generate('lorem').words(5)});
        expect(F.create().txt.split(' ')).to.have.length(5);

        F = Factory({txt: generate('lorem').paraghaphs(5)});
        expect(F.create().txt.split('\n\n')).to.have.length(5);
    });


    it('generates a paraghaphs or a word', function() {
        let F = Factory({txt: generate('lorem').word});
        expect(F.create().txt).to.match(/\w/);

        F = Factory({txt: generate('lorem').paraghaph()});
        expect(F.create().txt).to.have.length.within(100, 500);
    });
});
