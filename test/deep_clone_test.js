

import {expect} from 'chai';
import {create, generators} from '../src';
import _ from 'lodash';

describe('deep cloning', function() {
    it('preserves generators after deep cloning the factory object', function() {
        let F1 = {
            nested1: {
                nested2: {
                    id: generators.sequence()
                }
            }
        }

        let F2 = _.clone(F1, true)

        F2.nested1.nested2.id2 = generators.sequence();

        expect(create(F1)).to.deep.equal({nested1: {nested2: {id: 1}}});
        expect(create(F1)).to.deep.equal({nested1: {nested2: {id: 2}}});
        expect(create(F2)).to.deep.equal({nested1: {nested2: {id: 3, id2: 1}}});
    });

    it('preserves generators after deep cloning the factory object, _.deepClone', function() {
        let F1 = {
            nested1: {
                nested2: {
                    id: generators.sequence()
                }
            }
        }

        let F2 = _.cloneDeep(F1)

        F2.nested1.nested2.id2 = generators.sequence();

        expect(create(F1)).to.deep.equal({nested1: {nested2: {id: 1}}});
        expect(create(F1)).to.deep.equal({nested1: {nested2: {id: 2}}});
        expect(create(F2)).to.deep.equal({nested1: {nested2: {id: 3, id2: 1}}});
    });
});
