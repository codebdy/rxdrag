import { IDriver, IDriverFactory } from "../../interfaces"
import { IDispatchable, ICustomEvent } from "../../interfaces/event"
import { MouseUpEvent } from "../events/mouse/MouseUpEvent"

export class MouseUpDriverImpl implements IDriver {

  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onMouseUp = (e: MouseEvent) => {
    this.dispatcher.dispatch(
      new MouseUpEvent({
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
      }, e)
    )
  }

  attach() {
    this.element?.addEventListener('mouseup', this.onMouseUp as EventListener)
  }
  teardown(): void {
    this.element?.removeEventListener('mouseup', this.onMouseUp as EventListener)
  }
}

export const MouseUpDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new MouseUpDriverImpl(
    dispatcher,
    element,
  )
}