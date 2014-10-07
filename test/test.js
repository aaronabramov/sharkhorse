var expect = require('chai').expect,
    Factory = require('../index.js');

describe('Factory', function() {
    describe('#define', function() {
        it('defines js object', function() {
            Factory.define('test', function() {
                return {
                    a: 'test-a',
                    b: 'test-b'
                };
            });

            expect(Factory.create('test')).to.eql({
                a: 'test-a',
                b: 'test-b'
            });
        });
    });

    describe('#create', function() {
        it('can overrite default attrs', function() {
            Factory.define('test', function() {
                return {a: 5, b: 6};
            });

            var obj = Factory.create('test', {b: 9, c: 1});
            expect(obj).to.eql({
                a: 5,
                b: 9,
                c: 1
            });
        });
    });

    describe('#createMany', function() {
        it('creates multiple factories', function() {
            Factory.define('test', function() {
                return {a: this.seq(), b: 6};
            });

            var factories = Factory.createMany('test', 5);
            expect(factories.length).to.equal(5);
            expect(factories[0]).to.eql({
                a: 1,
                b: 6
            });

            expect(factories[4]).to.eql({
                a: 5,
                b: 6
            });
        });
    });
});
