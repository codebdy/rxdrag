import { AbstractMouseEvent } from './AbstractMouseEvent';
export class MouseOverEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'mouse:over';
    }
}

//# sourceMappingURL=MouseOverEvent.js.map