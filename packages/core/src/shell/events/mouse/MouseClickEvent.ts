import { ICustomEvent } from 'core/interfaces/event'
import { AbstractMouseEvent } from './AbstractMouseEvent'

export class MouseClickEvent
  extends AbstractMouseEvent
  implements ICustomEvent
{
  type = 'mouse:click'
}

export class MouseDoubleClickEvent
  extends AbstractMouseEvent
  implements ICustomEvent
{
  type = 'mouse:dblclick'
}
