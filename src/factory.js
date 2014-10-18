var extend = require('./utils.js').extend,
    LAZY_FN_TOKEN = require('./constants.js').LAZY_FN_TOKEN;

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

module.exports = Factory;
