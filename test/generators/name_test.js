import {expect} from 'chai';
import Factory, {generate} from '../../';

describe('generators/name', function() {
    it('generates a full name', function() {
        let F = Factory({
            name: generate('name')
        });

        let {name} = F.create();

        expect(name).to.match(/^\w+ \w+$/);
    });
});
