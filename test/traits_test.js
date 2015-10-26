import {expect} from 'chai';
import Factory from '../';

describe('factory.extend()', function() {
    it('extends a factory', function() {
        let Message = Factory(() => {
            return {id: 5};
        });

        let MessageWithAttachments = Message.extend((defaults) => {
            defaults.attachments = 'attachments';
        });

        let message = MessageWithAttachments.create();

        expect(message).to.deep.equal({
            id: 5,
            attachments: 'attachments'
        });
    });

    it('keeps context value sequences', function() {
        let Message = Factory(function() {
            return {id: this.seq()};
        });

        let ExtendedMessage = Message.extend(function(defaults) {
            defaults.id2 = this.seq();
        });

        let msg = Message.create();
        let msg2 = ExtendedMessage.create();

        expect(msg.id).to.equal(1);
        expect(msg2.id).to.equal(2);
        expect(msg2.id2).to.equal(1);
    });
});
