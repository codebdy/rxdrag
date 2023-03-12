import { AbstractMouseEvent } from './AbstractMouseEvent';
export class MouseOutEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'mouse:out';
    }
}

//# sourceMappingURL=MouseOutEvent.js.map