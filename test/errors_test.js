/* global describe, it */

import {create} from '../src';
import {expect} from 'chai';

describe('throwing errors', function() {
    it('dosent throw when primitives are passed', function() {
        expect(() => {
            create({});
            create(0);
            create(false);
            create(true);
            create('abc');
            create(function() {});
        }).to.not.throw();
    });

    it('throws a reasonable error message if not an object passed to `create`', function() {

        expect(() => {
            create(undefined);
        }).to.throw(/create\(\).*argument.*undefined/);

        expect(() => {
            create(null);
        }).to.throw(/create\(\).*argument.*null/);
    });
});
