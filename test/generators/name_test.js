import {expect} from 'chai';
import {create, generators} from '../../src';

describe('generators/name', function() {
    it('generates a full name', function() {
        let F = {
            name: generators.name()
        };

        let {name} = create(F);

        expect(name).to.match(/^\w+ \w+$/);
    });

    it('generates first name', function() {
        let F = {
            name: generators.name().first()
        };

        let {name} = create(F);

        expect(name).to.match(/^\w+/);
    });

    it('generates first name', function() {
        let F = {
            name: generators.name().last()
        };

        let {name} = create(F);

        expect(name).to.match(/^\w+/);
    });
});
