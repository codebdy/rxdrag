import { AbstractMouseEvent } from './AbstractMouseEvent';
export class MouseMoveEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'mouse:move';
    }
}

//# sourceMappingURL=MouseMoveEvent.js.map