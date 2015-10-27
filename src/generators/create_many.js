import {createMany} from '../factory';
import BaseGenerator from './base';

export default class CreateMany extends BaseGenerator {
    constructor() {
        super();
        this.arguments = arguments;
    }

    _generate() {
        return createMany.apply(null, this.arguments);
    }
}

