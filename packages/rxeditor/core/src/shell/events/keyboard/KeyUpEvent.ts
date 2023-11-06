import { ICustomEvent } from '../../../interfaces/event'
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'

export class KeyUpEvent extends AbstractKeyboardEvent implements ICustomEvent {
  static Name = 'key:up'
  name = KeyUpEvent.Name
}
