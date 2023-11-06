import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class DragMoveEvent extends AbstractMouseEvent implements ICustomEvent {
  static Name = 'drag:move'
  name = DragMoveEvent.Name
}
