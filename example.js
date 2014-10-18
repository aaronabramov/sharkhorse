var Factory = require('./');


var Participant = Factory(function() {
    return {
        id: this.seq(),
        firstName: this.uniqId('first_name'),
        lastName: this.uniqId('last_name')
    }
});


var Conversation = Factory(function() {
    return {
        id: this.uuid(),
        subject: this.uuid(),
        participants: this.factories(Participant, 3) // random [1, 4]
    }
});


console.log(Conversation.create());
