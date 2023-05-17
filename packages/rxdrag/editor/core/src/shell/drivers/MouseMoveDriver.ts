import { MouseMoveEvent } from "../../shell/events/mouse"
import { IDriver, IDriverFactory } from "../../interfaces"
import { IDispatchable, ICustomEvent } from "../../interfaces/event"

export class MouseMoveDriverImpl implements IDriver {

  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onMouseMove = (e: MouseEvent) => {
    this.dispatcher.dispatch(
      new MouseMoveEvent({
        offsetX:e.offsetX,
        offsetY:e.offsetY,
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
     this.element?.addEventListener('mousemove', this.onMouseMove as EventListener)
  }
  teardown(): void {
     this.element?.removeEventListener('mousemove', this.onMouseMove as EventListener)
  }
}

export const MouseMoveDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new MouseMoveDriverImpl(
    dispatcher,
    element,
  )
}