import { ICustomEvent } from 'core/interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class CanvasScrollEvent
  extends AbstractCanvasEvent
  implements ICustomEvent
{
  type = 'canvas:scroll'
}
