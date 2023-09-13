import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class MouseOutEvent
  extends AbstractMouseEvent
  implements ICustomEvent {
  static Name = 'mouse:out'
  name = MouseOutEvent.Name
}
