import {expect} from 'chai';
import {create, generators} from '../src';

describe('factory.extend()', function() {
    it('extends a factory', function() {
        let Message = {id: 5};

        let MessageWithAttachments = Object.assign({}, Message, {
            attachments: 'attachments'
        });

        let message = create(MessageWithAttachments);

        expect(message).to.deep.equal({
            id: 5,
            attachments: 'attachments'
        });
    });

    it('keeps context value sequences', function() {
        let Message = {
            id: generators.sequence()
        };

        let ExtendedMessage = Object.assign({}, Message, {
            id2: generators.sequence()
        });

        let msg = create(Message);
        let msg2 = create(ExtendedMessage);

        expect(msg.id).to.equal(1);
        expect(msg2.id).to.equal(2);
        expect(msg2.id2).to.equal(1);
    });
});
