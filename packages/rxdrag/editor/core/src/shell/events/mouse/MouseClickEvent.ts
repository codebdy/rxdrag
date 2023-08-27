import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class MouseClickEvent
  extends AbstractMouseEvent
  implements ICustomEvent {
  static Name = 'mouse:click'
  name = MouseClickEvent.Name
}

export class MouseDoubleClickEvent
  extends AbstractMouseEvent
  implements ICustomEvent {
  static Name = 'mouse:dblclick'
  name = MouseDoubleClickEvent.Name
}
