import { ICustomEvent } from '../../../interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class MouseUpEvent
  extends AbstractMouseEvent
  implements ICustomEvent {
  static Name = 'mouse:up'
  name = MouseUpEvent.Name
}

