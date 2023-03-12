import { AbstractMouseEvent } from './AbstractMouseEvent';
export class DragStartEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'drag:start';
    }
}

//# sourceMappingURL=DragStartEvent.js.map