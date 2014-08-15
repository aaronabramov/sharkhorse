var Factory = function() {},
    Context = function() {},
    LAZY_FN_TOKEN = 'A78F83FF-5E32-4410-B05A-2D84B786974A';


/**
 * factories storage
 */
Factory.factories = {};

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
    factory: function(/* &more */) {
        var args = arguments;
        return makeLazyFn(function() {
            return Factory.create.apply(Factory, args);
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
        if (result[attribute][LAZY_FN_TOKEN]) {
            result[attribute] = result[attribute]();
        }
    }
    return result;
};

Factory.clear = function() {
    this.factories = {};
};

module.exports = Factory;
