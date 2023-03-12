import { AbstractMouseEvent } from './AbstractMouseEvent';
export class MouseUpEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'mouse:up';
    }
}

//# sourceMappingURL=MouseUpEvent.js.map