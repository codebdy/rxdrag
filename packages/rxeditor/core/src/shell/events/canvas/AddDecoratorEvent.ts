import { ICustomEvent } from '../../../interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class AddDecoratorEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  static Name = 'canvas:add-decorator'
  name = AddDecoratorEvent.Name
}
