/* global describe, it */

import {expect} from 'chai';
import * as utils from '../src/utils';

describe('utils', function() {
    describe('#deepMap', function() {
        it('iterates thorugh a nested object', function() {
            let obj = {a: {b: {c: [1]}}};
            let result = utils.deepMap(obj);

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
