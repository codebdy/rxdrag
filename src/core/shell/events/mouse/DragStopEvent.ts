import { ICustomEvent } from 'core/interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class DragStopEvent extends AbstractMouseEvent implements ICustomEvent {
  type = 'drag:stop'
}
