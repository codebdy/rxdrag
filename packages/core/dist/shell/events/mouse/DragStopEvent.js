import { AbstractMouseEvent } from './AbstractMouseEvent';
export class DragStopEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'drag:stop';
    }
}

//# sourceMappingURL=DragStopEvent.js.map