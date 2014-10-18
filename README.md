[![Sharkhorse](https://raw.githubusercontent.com/dmitriiabramov/sharkhorse/master/shark-horse.jpg)](https://raw.githubusercontent.com/dmitriiabramov/sharkhorse/master/shark-horse.jpg)
# Sharkhorse

[![Build Status](https://travis-ci.org/dmitriiabramov/sharkhorse.svg?branch=master)](https://travis-ci.org/dmitriiabramov/sharkhorse)

### Javascript Test factories

#### Summary

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


Conversation.createMany(5) // will return array containing 5 created objects
```

#### Helper functions

- [`seq`](#seq)
- [`defer`](#defer)
- [`factory`](#factory)
- [`factories`](#factories)

<a name="seq" />
### this.seq([fn])

`this.seq` function will return incrementing numbers starting from 1 every time it's called

```js
var F = Factory(function() {
    return {
        id: this.seq()
    };
});

F.createMany(5);
// [ { id: 1 },
//   { id: 2 },
//   { id: 3 },
//   { id: 4 },
//   { id: 5 } ]

```

you can specify a function that will get generated number and return resulting value
```js
var F = Factory(function() {
    return {
        id: this.seq(function(n) { return n * 11; })
    };
});

F.createMany(5);
// [ { id: 11 },
//   { id: 22 },
//   { id: 33 },
//   { id: 44 },
//   { id: 55 } ]
```

<a name="defer" />
### this.defer(fn)
`this.defer` takes another function as an argument and evaluates it during the factory object creation
```js
F = Factory(function() {
    return {
        timestamp: this.defer(Date.now)
    };
});

F.create()
setTimeout(function() { console.log(F.create()); }, 100);
// { timestamp: 1413671560509 }
// { timestamp: 1413671560609 }
```

<a name="factory" />
### this.factory(Factory)
creates object using given factory
```js
F1 = Factory(function() {
    return {
        f1Value: 'a'
    };
});

F2 = Factory(function() {
    return {
        f2Value: 'b',
        f1: this.factory(F1)
    };
});

F2.create();
// { f2Value: 'b', f1: { f1Value: 'a' } }

```

<a name="factories" />
### this.factories(Factory, n)
Same as [`factory`](#factory) but creates a collection of factories

```js
F2 = Factory(function() {
    return {
        f1Collection: this.factories(F1, 5)
    };
});
F2.create();
// { f1Collection:
//    [ { f1Value: 'a' },
//      { f1Value: 'a' },
//      { f1Value: 'a' },
//      { f1Value: 'a' },
//      { f1Value: 'a' } ] }
```

