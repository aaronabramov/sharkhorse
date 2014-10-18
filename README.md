[![Sharkhorse](https://raw.githubusercontent.com/dmitriiabramov/sharkhorse/master/shark-horse.jpg)](https://raw.githubusercontent.com/dmitriiabramov/sharkhorse/master/shark-horse.jpg)
# Sharkhorse

[![Build Status](https://travis-ci.org/dmitriiabramov/sharkhorse.svg?branch=master)](https://travis-ci.org/dmitriiabramov/sharkhorse)

### Javascript Test factories

##### Creating Factories

```js
var Message = Factory(function() {
    return {
        from: 'test_name',
        body: 'test_body'
    };
});
```

##### Building objects from factories

```js
Message.create();
// { from: 'test_name', body: 'test_body' }

// overwrite attributes
Message.create({from: 'name', body: 'body'});
// { from: 'name', body: 'body' }
```

##### Helper functions

```js
var Conversation = Factory(function() {
    return {
        id: this.seq(),
        someFunctionResult: this.defer(Date.now),
        anotherFactory: this.factory(Mailbox),
        factoryCollection: this.factories(Participant, 3),
        randomUuid: this.uuid(),
        uniqIdBasedOnSeedValue: this.uniqId('some_seed'),
        randomNumberFromOneToTen: this.rand(1, 10)
    };
});

var Mailbox = Factory(function() {
    return {
        name: this.uniqId('mailbox_name')
    };
});

var Participant = Factory(function() {
    return {
        name: this.uniqId('participant_name')
    };
});

Conversation.create();
// { id: 1,
//   someFunctionResult: 1413670721071,
//   anotherFactory: { name: 'mailbox_name_6' },
//   factoryCollection:
//    [ { name: 'participant_name_7' },
//      { name: 'participant_name_8' },
//      { name: 'participant_name_9' } ],
//   randomUuid: '17292d41-f146-49f2-99f5-fd0717a01d84',
//   uniqIdBasedOnSeedValue: 'some_seed_10',
//   randomNumberFromOneToTen: 2 }
```
