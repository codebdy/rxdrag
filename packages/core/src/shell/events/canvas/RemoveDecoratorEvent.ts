import { ID } from 'core/interfaces'
import { ICustomEvent } from 'core/interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class RemoveDecoratorEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  type = 'canvas:remove-decortor'
  nodeId?: ID
}
