import BaseGenerator from './base';
import FIRST_NAMES, {MALE, FEMALE} from '../constants/first_names';
import LAST_NAMES from '../constants/last_names';

function randomFirstName(names = FIRST_NAMES) {
    return names[Math.floor(Math.random() * names.length)];
}

function randomLastName() {
    return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
}

export default class Name extends BaseGenerator {
    _generate() {
        return `${randomFirstName()} ${randomLastName()}`;
    }
}
