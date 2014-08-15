var expect = require('chai').expect,
    Factory = require('../index.js');

describe('Factory', function() {
    beforeEach(Factory.clear);

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

    describe('Context', function() {
        describe('#seq', function() {
            it('returns seq of numbers', function() {
                Factory.define('test', function() {
                    return {a: this.seq(function(n) {
                        return n;
                    })};
                });

                expect(Factory.create('test').a).to.equal(1);
                expect(Factory.create('test').a).to.equal(2);
                expect(Factory.create('test').a).to.equal(3);
            });

            it('does not eval seq fn if its been overwritten', function() {
                Factory.define('test', function() {
                    return {a: this.seq()};
                });
                expect(Factory.create('test').a).to.equal(1);
                expect(Factory.create('test', {a: 5}).a).to.equal(5);
                expect(Factory.create('test').a).to.equal(2);

            });
        });

        describe('#defer', function() {
            it('execs deferred function on creation', function() {
                var counter = 0;
                Factory.define('test', function() {
                    return {
                        a: this.defer(function() { return ++counter; })
                    };
                });

                expect(Factory.create('test').a).to.equal(1);
                expect(Factory.create('test', {a: 5}).a).to.equal(5);
                expect(Factory.create('test').a).to.equal(2);
            });
        });

        describe('#factory', function() {
            it('creates nested factory lazily', function() {
                Factory.define('test', function() { return {a: 1}; });
                Factory.define('test2', function() {
                    return {
                        d: 5,
                        f: this.factory('test'),
                        f2: this.factory('test', {a: 99})
                    };
                });

                expect(Factory.create('test2').f).to.eql({a: 1});
                expect(Factory.create('test2').f2).to.eql({a: 99});
            });
        });
    });
});
