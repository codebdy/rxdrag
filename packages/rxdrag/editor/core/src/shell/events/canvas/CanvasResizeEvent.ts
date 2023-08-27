import { ICustomEvent } from '../../../interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class CanvasResizeEvent
  extends AbstractCanvasEvent
  implements ICustomEvent
{
  static Name = 'canvas:resize'
  name = CanvasResizeEvent.Name
}
