var Factory = require('../'),
    expect = require('chai').expect;

describe('Factory', function() {
    describe('#create', function() {
        it('creates factory', function() {
            var factory = Factory.define(function() {
                return {
                    a: this.seq()
                };
            });

            expect(factory.create()).to.eql({
                a: 1
            });
        });
    });

    describe('#createMany', function() {
        it('creates many factories', function() {
            var factory = Factory.define(function() {
                return {
                    a: this.seq()
                };
            });

            expect(factory.createMany(2)).to.eql([{
                a: 1
            }, {
                a: 2
            }]);

        });
    });
});
