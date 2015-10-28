import BaseGenerator from './base';
import FIRST_NAMES, {MALE, FEMALE} from '../constants/first_names';
import LAST_NAMES from '../constants/last_names';

function randomFirstName(names = FIRST_NAMES) {
    return names[Math.floor(Math.random() * names.length)];
}

function randomLastName() {
    return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
}

const TYPES = {
    FIRST: 'FIRST',
    LAST: 'LAST',
    FULL: 'FULL'
};

export default class Name extends BaseGenerator {
    constructor() {
        super();
        this.type = TYPES.FULL;
    }

    _generate() {
        switch (this.type) {
            case TYPES.FIRST:
                return randomFirstName();
            case TYPES.LAST:
                return randomLastName();
            case TYPES.FULL:
                return `${randomFirstName()} ${randomLastName()}`;
            default:
                throw new Error(`unknownType: ${this.type}`);
        }
    }

    first() {
        this.type = TYPES.FIRST;
        return this;
    }

    last() {
        this.type = TYPES.LAST;
        return this;
    }

    full() {
        this.type = TYPES.FULL;
        return this;
    }
}
