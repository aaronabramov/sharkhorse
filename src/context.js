var uuid = require('node-uuid'),
    PRNG = require('prng'),
    LAZY_FN_TOKEN = require('./constants.js').LAZY_FN_TOKEN,
    uniqId = 0;

function Context() {}

/**
 * attach lazy function token for later distinguishing.
 * lazy functions will be evaluated before returning the resulting object
 *
 * @param {Function} fn
 * @return {Function} with added token
 */
function makeLazyFn(fn) {
    fn[LAZY_FN_TOKEN] = true && fn;
    return fn;
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
    factory: function(factory, attrs) {
        return makeLazyFn(function() {
            return factory.build(attrs);
        });
    },
    factories: function(factory, n) {
        return makeLazyFn(function() {
            return factory.buildMany(n);
        });
    },
    uuid: function() {
        return makeLazyFn(function() {
            return uuid.v4();
        });
    },
    /**
     * @param {String} seed that will be taken as a base for
     * produced id (e.g. seed_1, seed_2)
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

module.exports = Context;
