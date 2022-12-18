import { ID } from 'core/interfaces'
import { ICustomEvent } from 'core/interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class NodeMountedEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  type = 'canvas:node-mounted'
  nodeId?: ID
  constructor(id?: ID) {
    super()
    this.nodeId = id
  }
}
