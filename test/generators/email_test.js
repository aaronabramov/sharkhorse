import {expect} from 'chai';
import {create, generators} from '../../';

describe('generators/email', function() {
    it('generates a sequence', function() {
        let F = {
            email: generators.email()
        };

        let {email} = create(F);
        let email2 = create(F).email;

        expect(email).to.match(/.+\@.+\.com$/);
        expect(email).to.not.equal(email2);
    });
});
