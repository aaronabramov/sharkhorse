/* global describe, it */

var sharkhorse = require('../package/index');
var expect = require('chai').expect;
var create = sharkhorse.create;
var generators = sharkhorse.generators;

describe('es5 package', function() {
    it('generates data', function() {
        var descriptor = {
            id: generators.sequence().string(),
            object: {
                test: generators.sequence()
            }
        };

        var data = create(descriptor);

        expect(data).to.have.property('id', '1');
        expect(data.object).to.have.property('test', 1);
    });
});
