import { isHTMLElement } from "@rxdrag/shared"
import { IDriver, IDriverFactory } from "../../interfaces"
import { IDispatchable, ICustomEvent } from "../../interfaces/event"
import { CanvasResizeEvent } from "../events"

export class CanvasResizeDriverImpl implements IDriver {
  resizeObserver: ResizeObserver

  constructor(private dispatcher: IDispatchable<ICustomEvent<unknown>>, private element: Element | Node | HTMLElement) {
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.attach()
  }

  onResize = () => {
    this.dispatcher.dispatch(
      new CanvasResizeEvent()
    )
  }

  attach() {
    if (isHTMLElement(this.element) && this.element.tagName) {
      this.resizeObserver.observe(this.element as Element)
    }
    this.win().addEventListener('resize', this.onResize)
  }

  teardown(): void {
    if (isHTMLElement(this.element) && this.element.tagName) {
      this.resizeObserver.unobserve(this.element as Element)
    }
    this.resizeObserver.disconnect()
    this.win().removeEventListener('resize', this.onResize)
  }

  private win() {
    return (this.element as Document)?.defaultView || this.element?.ownerDocument?.defaultView || window
  }
}

export const CanvasResizeDriver: IDriverFactory = (
  dispatcher: IDispatchable<ICustomEvent<unknown>>,
  element: Element | Node | HTMLElement,
) => {
  return new CanvasResizeDriverImpl(
    dispatcher,
    element,
  )
}