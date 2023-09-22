import { MouseClickEvent, MouseDoubleClickEvent } from "../../shell/events/mouse"
import { IDriver, IDriverFactory } from "../../interfaces"
import { IDispatchable, ICustomEvent } from "../../interfaces/event"

export class MouseClickDriverImpl implements IDriver {
  private mouedownPoint: MouseEvent | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private dispatcher: IDispatchable<ICustomEvent<any>>, private element: Element | Node | HTMLElement) {
    this.attach()
  }

  onMouseDown = (e: MouseEvent) => {
    this.mouedownPoint = e
  }

  onMouseClick = (e: MouseEvent) => {
    //如果是拖动，不触发Click事件
    if (Math.abs(e.screenX - (this.mouedownPoint?.screenX || 0)) > 5 ||
      Math.abs(e.screenY - (this.mouedownPoint?.screenY || 0)) > 5) {
      this.mouedownPoint = undefined
      return
    }

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
    this.mouedownPoint = undefined
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
    this.element?.addEventListener('mousedown', this.onMouseDown as EventListener)
  }

  teardown(): void {
    this.element?.removeEventListener('click', this.onMouseClick as EventListener)
    this.element?.removeEventListener('dblclick', this.onMouseDoubleClick as EventListener)
    this.element?.removeEventListener('mousedown', this.onMouseDown as EventListener)
  }

}

export const MouseClickDriver: IDriverFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatcher: IDispatchable<ICustomEvent<any>>,
  element: Element | Node | HTMLElement,
) => {
  return new MouseClickDriverImpl(
    dispatcher,
    element,
  )
}