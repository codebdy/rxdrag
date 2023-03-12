import { AbstractCanvasEvent } from './AbstractCanvasEvent';
export class RemoveDecoratorEvent extends AbstractCanvasEvent {
    constructor(...args){
        super(...args);
        this.type = 'canvas:remove-decortor';
    }
}

//# sourceMappingURL=RemoveDecoratorEvent.js.map