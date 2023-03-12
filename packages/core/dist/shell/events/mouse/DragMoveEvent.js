import { AbstractMouseEvent } from './AbstractMouseEvent';
export class DragMoveEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'drag:move';
    }
}

//# sourceMappingURL=DragMoveEvent.js.map