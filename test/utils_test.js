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
});
