import { ID, IDesignerEngine, Unsubscribe } from "core";
import { CanvasScrollEvent } from "core/shell/events";
import { MouseOutEvent } from "core/shell/events/mouse/MouseOutEvent";
import { IPlugin } from "core/interfaces/plugin";
import { AUX_BACKGROUND_COLOR } from "../consts";
import { numbToPx } from "../utils/numbToPx";
import { getMaxZIndex } from "./getMaxZIndex";

export class ActivedOutlineImpl implements IPlugin {
  name: string = "default.actived-outline";
  resizeObserver: ResizeObserver
  private outline: HTMLElement | null = null;
  private nodeChangeUnsubscribe: Unsubscribe;
  private currentId: ID | null = null
  private unActive: Unsubscribe
  private unCanvasScroll: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unActive = engine.getMonitor().subscribeToActiveChanged(this.handleActivedChange)
    this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
  }

  onResize = () => {
    this.refresh()
  }

  handleActivedChange = (activedId: ID | undefined | null): void => {
    this.resizeObserver.disconnect()
    this.clearLine()
    if (activedId) {
      this.currentId = activedId
      this.renderLine(activedId)
    }
  }
  onViewportChange = () => {
    this.refresh()
  }
  refresh = () => {
    if (!this.currentId) {
      return
    }
    this.renderLine(this.currentId)
  }

  handleOutNode = (e: MouseOutEvent): void => {
    this.clearLine()
    this.currentId = null
  }

  destory(): void {
    this.clearLine()
    this.nodeChangeUnsubscribe()
    this.unActive()
    this.unCanvasScroll()
  }

  private renderLine(id: ID) {
    this.clearLine()
    const element = this.engine.getShell().getElement(id)
    const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "")
    const containerRect = canvas?.getContainerRect()
    if (element && containerRect) {
      const rect = element.getBoundingClientRect();
      const htmlDiv = document.createElement('div')
      htmlDiv.style.backgroundColor = "transparent"
      htmlDiv.style.position = "fixed"
      htmlDiv.style.border = `dashed 1px ${AUX_BACKGROUND_COLOR}`
      htmlDiv.style.pointerEvents = "none"
      htmlDiv.style.left = numbToPx(rect.left - containerRect.x)
      htmlDiv.style.top = numbToPx(rect.top - containerRect.y)
      htmlDiv.style.height = numbToPx(rect.height - 2)
      htmlDiv.style.width = numbToPx(rect.width - 2)
      htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString()
      canvas?.appendChild(htmlDiv)
      this.outline = htmlDiv
      this.resizeObserver.observe(element)
    }
  }

  private clearLine() {
    if (this.outline) {
      this.outline.remove()
    }
    this.outline = null
  }
}

export const ActivedOutline = (engine: IDesignerEngine) => {
  return new ActivedOutlineImpl(engine)
}
