import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class DragStopEvent extends AbstractMouseEvent implements ICustomEvent {
  static Name = 'drag:stop'
  name = DragStopEvent.Name
}
