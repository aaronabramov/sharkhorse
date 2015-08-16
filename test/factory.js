var Factory = require('../'),
    expect = require('chai').expect;

describe('Factory', function() {
    describe('constructor', function() {
        it('builds factory', function() {
            var f = Factory(function() {
                return {
                    a: this.seq()
                };
            });

            expect(f.build()).to.eql({
                a: 1
            });
        });

        it('can overrite default attrs', function() {
            var f = Factory(function() {
                return {
                    a: 5,
                    b: 6
                };
            });

            var obj = f.build({
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

    describe('#buildList', function() {
        it('builds many factories', function() {
            var f = Factory(function() {
                return {
                    a: this.seq()
                };
            });

            expect(f.buildList(2)).to.eql([{
                a: 1
            }, {
                a: 2
            }]);
        });
    });
});
