import {create} from '../factory';
import BaseGenerator from './base';

export default class Create extends BaseGenerator {
    constructor() {
        super();
        this.arguments = arguments
    }

    _generate() {
        return create.apply(null, this.arguments);
    }
}

