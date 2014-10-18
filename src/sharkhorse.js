var Sharkhorse = function() {},
    Factory = require('./factory.js'),
    Context = require('./context.js'),
    LAZY_FN_TOKEN = require('./constants.js').LAZY_FN_TOKEN;
// shared uniq id counter


/**
 * factories storage
 */
Sharkhorse.factories = {};



/**
 * @param {String} [name] optional factory name
 * @param {Function} fn definition function
 */
Sharkhorse.define = function(name, fn) {
    if (typeof name === 'function') {
        fn = name;
        name = null;
    }
    var factory = new Factory(fn.call(new Context()));

    if (name) {
        this.factories[name] = factory;
    }
    return factory;
};

/**
 * @param {String,Sharkhorse} factory or it's name
 * @param {Object} attributes object attributes to overwrite defaults
 */
Sharkhorse.create = function(factory, attributes) {
    var result;

    if (typeof factory === 'string') {
        factory = this.factories[factory];
    }

    if (!factory) throw new Error('bad factory argument (' + factory + ')');
    return factory.create(attributes);
};


/**
 * @param {Factory,String} factory or it's name
 */
Sharkhorse.createMany = function(factory, n) {
    if (typeof factory === 'string') {
        factory = this.factories[factory];
    }

    return factory.createMany(n);
};

Sharkhorse.clear = function() {
    this.factories = {};
};

module.exports = Sharkhorse;
