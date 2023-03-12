import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';
export class KeyDownEvent extends AbstractKeyboardEvent {
    constructor(...args){
        super(...args);
        this.type = 'key:down';
    }
}

//# sourceMappingURL=KeyDownEvent.js.map