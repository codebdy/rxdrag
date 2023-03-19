import { IDriver, IDriverFactory } from "../../interfaces"
import { IDispatchable, ICustomEvent } from "../../interfaces/event"
import { MouseOverEvent } from "../events/mouse/MouseOverEvent"
import { MouseOutEvent } from "../events/mouse/MouseOutEvent"

export class MouseOverOutDriverImpl implements IDriver {

  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onMouseOver = (e: MouseEvent) => {
    this.dispatcher.dispatch(
      new MouseOverEvent({
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

  onMouseOut = (e: MouseEvent) => {
    this.dispatcher.dispatch(
      new MouseOutEvent({
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
    this.element?.addEventListener('mouseover', this.onMouseOver as EventListener)
    this.element?.addEventListener('mouseout', this.onMouseOut as EventListener)
  }
  teardown(): void {
    this.element?.removeEventListener('mouseover', this.onMouseOver as EventListener)
    this.element?.removeEventListener('mouseout', this.onMouseOut as EventListener)
  }
}

export const MouseOverOutDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new MouseOverOutDriverImpl(
    dispatcher,
    element,
  )
}