var uuid = require('node-uuid'),
    PRNG = require('prng'),
    Sharkhorse = function() {},
    Context = function() {},
    LAZY_FN_TOKEN = 'A78F83FF-5E32-4410-B05A-2D84B786974A',
    // shared uniq id counter
    uniqId = 0;


/**
 * factories storage
 */
Sharkhorse.factories = {};

/**
 * Constructor for factory object
 *
 * @param {Object} obj factory function executed within the created context
 */
function Factory(obj) {
    this.obj = obj;
};

Factory.prototype.create = function(attributes) {
    var result = extend({}, this.obj, attributes);

    // eval all lazy functions
    for (var attribute in result) {
        if (result[attribute][LAZY_FN_TOKEN]) {
            result[attribute] = result[attribute]();
        }
    }
    return result;
};

Factory.prototype.createMany = function(n) {
    var result = [],
        i;

    for (var i = 0; i < n; i++) {
        result.push(this.create());
    }
    return result;
}

/**
 * attach lazy function token for later distinguishing.
 * lazy functions will be evaluated before returning the resulting object
 *
 * @param {Function} fn
 * @return {Function} with added token
 */
function makeLazyFn(fn) {
    return fn[LAZY_FN_TOKEN] = true && fn;
}


Context.prototype = {
    seq: function(fn) {
        var n = 0;
        return makeLazyFn(function seqFunction() {
            if (!fn) return ++n;
            return fn.call(this, ++n);
        });
    },
    defer: function(fn) {
        return makeLazyFn(function deferFunction() {
            return fn.call(this);
        });
    },
    factory: function( /* &more */ ) {
        var args = arguments;
        return makeLazyFn(function() {
            return Sharkhorse.create.apply(Sharkhorse, args);
        });
    },
    factories: function(name, n) {
        return makeLazyFn(function() {
            return Sharkhorse.createMany(name, n);
        });
    },
    uuid: function() {
        return makeLazyFn(function() {
            return uuid.v4();
        });
    },
    /**
     * @param {String} seed that will be taken as a base for produced id (e.g. seed_1, seed_2)
     */
    uniqId: function(seed) {
        return makeLazyFn(function() {
            return seed + '_' + (++uniqId);
        });
    },
    /**
     * @param {Number} minimum value
     * @param {Number} [maximum] value
     * @return {Number} preudo random number between min and max val
     */
    rand: function(min, max) {
        var prng = new PRNG();
        return makeLazyFn(function() {
            return prng.rand(min, max);
        });
    }
};

/**
 * extends obj1 with props from obj2, obj3...
 */
function extend(into /*, &more */ ) {
    for (var i = 1; i < arguments.length; i++) {
        for (var attrname in arguments[i]) {
            if (arguments[i].hasOwnProperty(attrname)) {
                into[attrname] = arguments[i][attrname];
            }
        }
    }
    return into;
}

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
