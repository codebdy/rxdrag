import { ICustomEvent } from 'core/interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class CanvasResizeEvent
  extends AbstractCanvasEvent
  implements ICustomEvent
{
  type = 'canvas:resize'
}
