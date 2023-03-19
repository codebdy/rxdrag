import { ICustomEvent } from 'core/interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class MouseUpEvent
  extends AbstractMouseEvent
  implements ICustomEvent
{
  type = 'mouse:up'
}

