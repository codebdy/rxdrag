import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class DragMoveEvent extends AbstractMouseEvent implements ICustomEvent {
  type = 'drag:move'
}
