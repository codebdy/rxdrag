import { getKeyCodeFromEvent, KeyCode } from "../../../utils/keycode"

export class AbstractKeyboardEvent {
  data: KeyCode
  originEvent: KeyboardEvent
  constructor(e: KeyboardEvent) {
    this.data = getKeyCodeFromEvent(e)
    this.originEvent = e
  }

  get eventType() {
    return this.originEvent.type
  }

  get ctrlKey() {
    return this.originEvent.ctrlKey
  }

  get shiftKey() {
    return this.originEvent.shiftKey
  }

  get metaKey() {
    return this.originEvent.metaKey
  }

  get altKey() {
    return this.originEvent.altKey
  }

  preventDefault() {
    if (this.originEvent.preventDefault) {
      this.originEvent.preventDefault()
    } else {
      this.originEvent.returnValue = false
    }
  }

  stopPropagation() {
    if (this.originEvent?.stopPropagation) {
      this.originEvent.stopPropagation()
    } else {
      this.originEvent.cancelBubble = true
    }
  }
}
