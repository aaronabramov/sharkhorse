var Factory = require('../'),
    expect = require('chai').expect;

describe.skip('Factory', function() {
    describe('constructor', function() {
        it('creates factory', function() {
            var f = Factory(function() {
                return {
                    a: this.seq()
                };
            });

            expect(f.create()).to.eql({
                a: 1
            });
        });

        it('can overrite default attrs', function() {
            let f = Factory(function() {
                return {
                    a: 5,
                    b: 6
                };
            });

            let obj = f.create({
                b: 9,
                c: 1
            });

            expect(obj).to.eql({
                a: 5,
                b: 9,
                c: 1
            });
        });
    });

    describe('#createMany', function() {
        it('creates many factories', function() {
            var f = Factory(function() {
                return {
                    a: this.seq()
                };
            });

            expect(f.createMany(2)).to.eql([{
                a: 1
            }, {
                a: 2
            }]);
        });
    });
});
