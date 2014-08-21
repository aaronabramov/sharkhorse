var expect = require('chai').expect,
    Factory = require('../index.js');

describe('Context', function() {
    describe('#seq', function() {
        it('returns seq of numbers', function() {
            Factory.define('test', function() {
                return {
                    a: this.seq(function(n) {
                        return n;
                    })
                };
            });

            expect(Factory.create('test').a).to.equal(1);
            expect(Factory.create('test').a).to.equal(2);
            expect(Factory.create('test').a).to.equal(3);
        });

        it('does not eval seq fn if its been overwritten', function() {
            Factory.define('test', function() {
                return {
                    a: this.seq()
                };
            });
            expect(Factory.create('test').a).to.equal(1);
            expect(Factory.create('test', {
                a: 5
            }).a).to.equal(5);
            expect(Factory.create('test').a).to.equal(2);

        });
    });

    describe('#defer', function() {
        it('execs deferred function on creation', function() {
            var counter = 0;
            Factory.define('test', function() {
                return {
                    a: this.defer(function() {
                        return ++counter;
                    })
                };
            });

            expect(Factory.create('test').a).to.equal(1);
            expect(Factory.create('test', {
                a: 5
            }).a).to.equal(5);
            expect(Factory.create('test').a).to.equal(2);
        });
    });

    describe('#factory', function() {
        it('creates nested factory lazily', function() {
            Factory.define('test', function() {
                return {
                    a: 1
                };
            });
            Factory.define('test2', function() {
                return {
                    d: 5,
                    f: this.factory('test'),
                    f2: this.factory('test', {
                        a: 99
                    })
                };
            });

            expect(Factory.create('test2').f).to.eql({
                a: 1
            });
            expect(Factory.create('test2').f2).to.eql({
                a: 99
            });
        });

        it('is lazy', function() {
            Factory.define('test', function() {
                return {
                    a: this.seq()
                };
            });
            Factory.define('test2', function() {
                return {
                    d: 5,
                    f: this.factory('test'),
                };
            });
            expect(Factory.create('test2').f).to.eql({
                a: 1
            });
            // does not increment seq here as it's not evaluated
            expect(Factory.create('test2', {
                f: {
                    a: 555
                }
            }).f).to.eql({
                a: 555
            });
            expect(Factory.create('test2').f).to.eql({
                a: 2
            });
        });
    });

    describe('#uuid', function() {
        it('generates uuid', function() {
            Factory.define('test', function() {
                return {
                    a: this.uuid()
                };
            });

            expect(Factory.create('test').a).to.match(/(\w{8}(-\w{4}){3}-\w{12}?)/);
        });
    });
});
