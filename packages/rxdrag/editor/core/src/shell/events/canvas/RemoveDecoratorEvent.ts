import { ID } from '../../../interfaces'
import { ICustomEvent } from '../../../interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class RemoveDecoratorEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  static Name = 'canvas:remove-decorator'
  name = RemoveDecoratorEvent.Name
  nodeId?: ID
}
