import { ICustomEvent } from '../../../interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class CanvasScrollEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  static Name = 'canvas:scroll'
  name = CanvasScrollEvent.Name
}
