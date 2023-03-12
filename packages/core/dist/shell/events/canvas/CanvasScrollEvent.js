import { AbstractCanvasEvent } from './AbstractCanvasEvent';
export class CanvasScrollEvent extends AbstractCanvasEvent {
    constructor(...args){
        super(...args);
        this.type = 'canvas:scroll';
    }
}

//# sourceMappingURL=CanvasScrollEvent.js.map