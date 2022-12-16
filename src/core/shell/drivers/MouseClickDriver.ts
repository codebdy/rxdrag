import { MouseClickEvent, MouseDoubleClickEvent } from "core/shell/events/mouse"
import { IDriver, IDriverFactory } from "core/interfaces"
import { IDispatchable, ICustomEvent } from "core/interfaces/event"

export class MouseClickDriverImpl implements IDriver {

  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onMouseClick = (e: MouseEvent) => {
    this.dispatcher.dispatch(
      new MouseClickEvent({
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

  onMouseDoubleClick = (e: MouseEvent) => {
    this.dispatcher.dispatch(
      new MouseDoubleClickEvent({
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
     this.element?.addEventListener('click', this.onMouseClick as EventListener)
     this.element?.addEventListener('dblclick', this.onMouseDoubleClick as EventListener)
  }

  teardown(): void {
     this.element?.removeEventListener('click', this.onMouseClick as EventListener)
     this.element?.removeEventListener('dblclick', this.onMouseDoubleClick as EventListener)
  }

}

export const MouseClickDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new MouseClickDriverImpl(
    dispatcher,
    element,
  )
}