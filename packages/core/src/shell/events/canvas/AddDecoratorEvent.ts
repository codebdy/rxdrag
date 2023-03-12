import { ICustomEvent } from 'core/interfaces/event'
import { AbstractCanvasEvent } from './AbstractCanvasEvent'

export class AddDecoratorEvent
  extends AbstractCanvasEvent
  implements ICustomEvent {
  type = 'canvas:add-decorator'
}
