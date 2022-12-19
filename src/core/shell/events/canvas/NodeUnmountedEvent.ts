import { ID } from 'core/interfaces'
import { ICustomEvent } from 'core/interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class NodeUnmountedEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  type = 'canvas:node-unmounted'
  nodeId?: ID
  constructor(id?: ID) {
    super()
    this.nodeId = id
  }
}
