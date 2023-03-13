import { KeyDownEvent, KeyUpEvent } from "../../shell/events/keyboard"
import { IDriver, IDriverFactory } from "../../interfaces"
import { IDispatchable, ICustomEvent } from "../../interfaces/event"

function filter(event: KeyboardEvent) {
  const target: any = event.target
  const { tagName } = target
  let flag = true
  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>、Web Components
  if (
    target['isContentEditable'] ||
    ((tagName === 'INPUT' ||
      tagName === 'TEXTAREA' ||
      tagName === 'SELECT' ||
      customElements.get(tagName.toLocaleLowerCase())) &&
      !target.readOnly)
  ) {
    flag = false
  }
  return flag
}

export class KeyboardDriverImpl implements IDriver {

  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (!filter(e)) return
    this.dispatcher.dispatch(new KeyDownEvent(e))
  }

  onKeyUp = (e: KeyboardEvent) => {
    this.dispatcher.dispatch(new KeyUpEvent(e))
  }

  attach() {
     this.element?.addEventListener('keydown', this.onKeyDown as EventListener)
     this.element?.addEventListener('keyup', this.onKeyUp as EventListener)
  }

  teardown(): void {
     this.element?.removeEventListener('keydown', this.onKeyDown as EventListener)
     this.element?.removeEventListener('keyup', this.onKeyUp as EventListener)
  }
}

export const KeyboardDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new KeyboardDriverImpl(
    dispatcher,
    element,
  )
}