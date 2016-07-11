import Factory from './';

let Participant = Factory(function() {
    return {
        id: this.uuid(),
        name: this.uniqId('name_'),
        email: this.uniqId('a@b.')
    };
});

let Message = Factory(function() {
    return {
        id: this.seq(),
        subject: this.uuid(),
        from: this.factory(Participant),
        to: this.factories(Participant, 2)
    };
});

let MessageWithAttachments = Message.extend(function(defaults) {
    defaults.attachment = this.uniqId('attachment');
});


console.log(Message.create());
console.log(MessageWithAttachments.create());
