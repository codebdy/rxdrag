import { ID } from '../../../interfaces'
import { ICustomEvent } from '../../../interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class RemoveDecoratorEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  type = 'canvas:remove-decorator'
  nodeId?: ID
}
