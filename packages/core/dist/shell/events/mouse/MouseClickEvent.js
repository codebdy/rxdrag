import { AbstractMouseEvent } from './AbstractMouseEvent';
export class MouseClickEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'mouse:click';
    }
}
export class MouseDoubleClickEvent extends AbstractMouseEvent {
    constructor(...args){
        super(...args);
        this.type = 'mouse:dblclick';
    }
}

//# sourceMappingURL=MouseClickEvent.js.map