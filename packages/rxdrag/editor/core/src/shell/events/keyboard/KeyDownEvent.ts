import { ICustomEvent } from '../../../interfaces/event'
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'

export class KeyDownEvent
  extends AbstractKeyboardEvent
  implements ICustomEvent {
  static Name = 'key:down'
  name = KeyDownEvent.Name
}
