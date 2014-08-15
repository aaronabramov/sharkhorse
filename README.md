```javascript
Factory.define('message', function() {
    return {
        from: 'name',
        body: this.seq(function(n) { return 'body_' + n; })
    };
});

Factory.define('conversation', function() {
    return {
        id: this.seq(),
        date: this.defer(function() { return ~~(+new Date() / 1000); }),
        messages: this.factory('message'),
    };
});

Factory.create('conversation', {snippet: 'snippet'});
// {id: 1, date: 1408118364, message: {from: 'name', body: 'body_1'}}

Factory.create('conversation', {snippet: 'snippet'});
// {id:, 2 date: 1408118931, message: {from: 'name', body: 'body_2'}}


// TODO traits

Factory('conversation').trait('with-no-participants', function() {
    // gets merged into 'conversation' factory'
    return {
        participants: []
    };
});

Factory.create('conversation', null, {traits: 'with-no-participants'});
```
