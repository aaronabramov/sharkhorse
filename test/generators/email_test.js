import {expect} from 'chai';
import Factory, {generate} from '../../';

describe('generators/email', function() {
    it('generates a sequence', function() {
        let F = Factory({
            email: generate('email')
        });

        let {email} = F.create();
        let email2 = F.create().email;

        expect(email).to.match(/.+\@.+\.com$/);
        expect(email).to.not.equal(email2);
    });
});
