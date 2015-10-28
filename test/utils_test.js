import {expect} from 'chai';
import * as utils from '../src/utils';

describe('utils', function() {
    describe.skip('#deepMerge', function() {
        it('deeply merges two objects', function() {
            var a = {
                    a: {
                        b: 5
                    }
                },
                b = {
                    a: {
                        c: 8
                    }
                },
                result = utils.deepMerge(a, b);
            expect(result).to.eql({
                a: {
                    b: 5,
                    c: 8
                }
            });
        });
    });

    describe('#deepMap', function() {
        it('iterates thorugh a nested object', function() {
            let obj = {a: {b: {c: [1]}}};
            let result = utils.deepMap(obj, item => item);

            expect(obj).to.deep.equal(result);
        });

        it('replaces the value', function() {
            let obj = {a: {b: {c: [1]}}};
            let result = utils.deepMap(obj, (item) => {
                if (item.hasOwnProperty('c')) {
                    return 555;
                }

                return item;
            });

            expect(result).to.deep.equal({a: {b: 555}});
        });
    });

    describe('#deepAssign', function() {
        it('merges nodes', function() {
            let dest = {a: {b: {c: 5, d: 6}}};
            let src = {a: {b: {d: 1}}};

            expect(utils.deepAssign(dest, src)).to.deep.equal({
                a: {b: {c: 5, d: 1}}
            });
        });

        it('overwrites the object', function() {
            let dest = {a: {b: {c: 5, d: 6}}};
            let src = {a: {b: 4}};

            expect(utils.deepAssign(dest, src)).to.deep.equal({
                a: {b: 4}
            });
        });

        it('adds non exsiting props', function() {
            let dest = {a: {b: {c: 5, d: 6}}};
            let src = {a: {d: 4}};

            expect(utils.deepAssign(dest, src)).to.deep.equal({
                a: {d: 4, b: {c: 5, d: 6}}
            });
        });
    });
});
