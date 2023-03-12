import { ID } from 'interfaces';
import { ICustomEvent } from 'interfaces/event';
import { AbstractCanvasEvent } from './AbstractCanvasEvent';
export declare class RemoveDecoratorEvent extends AbstractCanvasEvent implements ICustomEvent {
    type: string;
    nodeId?: ID;
}
