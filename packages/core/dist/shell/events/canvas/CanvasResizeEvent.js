import { AbstractCanvasEvent } from './AbstractCanvasEvent';
export class CanvasResizeEvent extends AbstractCanvasEvent {
    constructor(...args){
        super(...args);
        this.type = 'canvas:resize';
    }
}

//# sourceMappingURL=CanvasResizeEvent.js.map