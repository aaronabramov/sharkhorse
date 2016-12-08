# Sharkhorse

[![Build Status](https://travis-ci.org/dmitriiabramov/sharkhorse.svg?branch=master)](https://travis-ci.org/dmitriiabramov/sharkhorse)
[![codecov.io](https://codecov.io/github/dmitriiabramov/sharkhorse/coverage.svg?branch=master)](https://codecov.io/github/dmitriiabramov/sharkhorse?branch=master)

## Javascript Test factories

## Summary

### Defining Factories
Factory definitions are plain javascript objects that hold generator objects.

```js
// message_factory.js
import {generators} from 'sharkhorse';

export const Message = {
    id: generators.sequence(),
    subject: generators.lorem().words(2),
    from: {
        name: generators.name().full(),
        email: generators.email()
    }
};
```

### Building objects from factories


To build an object from a factory definition use a `create` or 'createMany` function
the function would iterate through object's nested properties and evaluate all generators to their values
```js
import {create, createMany} from 'sharkhorse';
import {Message} from './message_factory';

create(Message) // => {id: 1, subject: 'Lorem ipsum', from: {name: 'Nickolas Conrad', email: 'random_0@example.com'}}
create(Message) // => {id: 2, subject: 'Lorem ipsum', from: {name: 'Seth Edwards', email: 'random_1@example.com'}}
```

`createMany()` will create an array of objects

```js
createMany(Message, 3) // [{...}, {...}, {...}]
```

## generators

### `sequence()`
generates an incrementing or decrementing number every time it's evaluated

```js
generators.sequence() // 1, 2, ..
generators.sequence().decrement() // 1, 0, -1, ...
generators.sequence().startFrom(100) // 100, 101, 102, ...

```


### `number()`
generates a random number

```js
generators.number() // 285
generators.number().min(500) // 24029
generators.number().max(2)
generators.number().min(0).max(2)
```

### `randomItem(list)`
```
generators.randomItem([1, 2, 3]) // one of the numbers
```

### `name()`
generates a random name


```js
generators.name() // Seth Edwards
generators.name().full() // Seth Edwards
generators.name().first() // Seth
generators.name().last() // Edwards
```

### `email()`
generates a random unique email every time it's evaluated

```js
generators.email() // random_0@example.com, random_1@example.com
```


### `templateString()`
Tagged template string generator. Any generator passed as a template string value will be evaluated when passing the
generator into `create` function

```js
let MyStr = generators.templateString`test${generators.sequence()}`;
create(MyStr); // test1
create(MyStr); // test2
create(MyStr); // test3
```

### `lorem()`
generates random text
```js
generators.lorem() // Lorem ipsum dolor sit amet, per in mazim...
generators.lorem().word()
generators.lorem().words(n)
generators.lorem().paraghaph()
generators.lorem().paraghaphs(n)
```
### `date()`
```js
generators.date() // Date() object
generators.date().jsTimestamp // 1457241758397
generators.date().unixTimestamp // 1457241758
generators.date().from('12-01-2016').to('12-31-2016') // Date() in December 2016
```

### `create(FactoryDefinition)`
generates a new factory object from the passed argument

```js
generate.create(MessageFactory) // {id: 1, subject: 'lorem', ...}
```

### `createMany(FactoryDefinition, n)`
same as `create()` but generates an array of factories
