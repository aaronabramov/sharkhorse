import {expect} from 'chai';
import {create, generators} from '../';

describe('nested objects', function() {
    it('evaluates nested objects', function() {
        let Nested = {
            a: {
                b: {
                    c: generators.sequence()
                }
            }
        };

        expect(create(Nested)).to.deep.equal({
            a: {
                b: {
                    c: 1
                }
            }
        });
    });
});
