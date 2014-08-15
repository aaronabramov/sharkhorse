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

Factory.create('conversation');
// {id: 1, date: 1408118364, message: {from: 'name', body: 'body_1'}}

Factory.create('conversation', {message: {from: 'aaa', body: 'bbb'});
// {id:, 2 date: 1408118931, message: {from: 'aaa', body: 'bbb'}}


// TODO traits

Factory('conversation').trait('with-no-participants', function() {
    // gets merged into 'conversation' factory'
    return {
        participants: []
    };
});

Factory.create('conversation', null, {traits: 'with-no-participants'});

// TODO:

this.random(x, y) // => random number in a range from x to y
this.uuid() // => uuidgen
this.uniqId('seed') // => seed_{next_from_global_seq}
this.randomString(length) // => random word/sentence/paragraph
```
