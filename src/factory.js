var extend = require('./utils.js').extend,
    Context = require('./context.js'),
    LAZY_FN_TOKEN = require('./constants.js').LAZY_FN_TOKEN;

/**
 * Constructor for factory object
 *
 * @param {Function} fn definition function
 */
function Factory(fn) {
    if (this instanceof Factory) {
        this.obj = fn.call(new Context());
        return;
    }
    return new Factory(fn);
}

Factory.prototype.build = function(attributes) {
    var result = extend({}, this.obj, attributes);

    // eval all lazy functions
    for (var attribute in result) {
        if (result[attribute][LAZY_FN_TOKEN]) {
            result[attribute] = result[attribute]();
        }
    }
    return result;
};

Factory.prototype.buildList = function(n) {
    var result = [],
        i;

    for (i = 0; i < n; i++) {
        result.push(this.build());
    }
    return result;
};

module.exports = Factory;
