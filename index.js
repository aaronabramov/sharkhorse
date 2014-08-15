var Factory = function() {},
    Context = function() {};


/**
 * factories storage
 */
Factory.factories = {};


Context.prototype = {
    seq: function(fn) {
        var n = 0, lazyFn;
        lazyFn = function seqFunction() {
            if (!fn) return ++n;
            return fn.call(this, ++n);
        };
        lazyFn.__lazyFunction__ = true;
        return lazyFn;
    },
    defer: function(fn) {
        var lazyFn = function deferFunction() {
             return fn.call(this);
        };
        lazyFn.__lazyFunction__ = true;
        return lazyFn;
    }
};

/**
 * extends obj1 with props from obj2, obj3...
 */
function extend(into/*, &more */) {
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
 * @param {String} name factory name
 * @param {Function} fn definition function
 */
Factory.define = function(name, fn) {
    var context = new Context();

    this.factories[name] = {
        name: name,
        obj: fn.call(context),
        context: context
    };
};

/**
 * @param {String} name factory name
 * @param {Object} attributes object attributes to overwrite defaults
 * @param {Object} options
 */
Factory.create = function(name, attributes, options) {
    var factory = this.factories[name],
        result;
    if (!factory) throw new Error('factory ' + name + ' is not defined');
    result = extend({}, factory.obj, attributes);

    // eval all lazy functions
    for (var attribute in result) {
        if (result[attribute].__lazyFunction__) {
            result[attribute] = result[attribute]();
        }
    }
    return result;
};

Factory.clear = function() {
    this.factories = {};
};

module.exports = Factory;
