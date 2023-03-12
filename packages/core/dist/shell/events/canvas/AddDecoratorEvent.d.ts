import { ICustomEvent } from 'interfaces/event';
import { AbstractCanvasEvent } from './AbstractCanvasEvent';
export declare class AddDecoratorEvent extends AbstractCanvasEvent implements ICustomEvent {
    type: string;
}
