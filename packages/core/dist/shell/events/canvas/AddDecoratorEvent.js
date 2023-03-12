import { AbstractCanvasEvent } from './AbstractCanvasEvent';
export class AddDecoratorEvent extends AbstractCanvasEvent {
    constructor(...args){
        super(...args);
        this.type = 'canvas:add-decorator';
    }
}

//# sourceMappingURL=AddDecoratorEvent.js.map