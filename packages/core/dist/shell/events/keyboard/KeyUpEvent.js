import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';
export class KeyUpEvent extends AbstractKeyboardEvent {
    constructor(...args){
        super(...args);
        this.type = 'key:up';
    }
}

//# sourceMappingURL=KeyUpEvent.js.map