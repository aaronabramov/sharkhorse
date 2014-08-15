```javascript
Factory.define('conversation', function() {
    return {
        id: this.seq(function(n) { return n; }),
        date: this.defer(function() { return ~~(+new Date() / 1000); }),
        messages: Factory.create('message'),
        participants: Factory.create('participant'),
        snippet: this.randomString({length: 100}),
        subject: this.randomString({length: 10}),
        total: this.random(1)
    };
});

Factory('conversation').trait('with-no-participants', function() {
    // gets merged into 'conversation' factory'
    return {
        participants: []
    };
});

Factory.create('conversation', {snippet: 'snippet'});

Factory.create('conversation', null, {traits: 'with-no-participants'});
```
