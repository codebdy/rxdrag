import { ID, IDesignerEngine, Unsubscribe } from "core";
import { CanvasResizeEvent, CanvasScrollEvent } from "core/shell/events";
import { MouseOutEvent } from "core/shell/events/mouse/MouseOutEvent";
import { IPlugin } from "core/interfaces/plugin";
import { AUX_BACKGROUND_COLOR } from "../consts";
import { numbToPx } from "../utils/numbToPx";
import { getMaxZIndex } from "./getMaxZIndex";

export class ActivedOutlineImpl implements IPlugin {
  name: string = "default.actived-outline";
  private outline: HTMLElement | null = null;
  private nodeChangeUnsubscribe: Unsubscribe;
  private currentId: ID | null = null
  private unActive: Unsubscribe
  private unViewporScroll: Unsubscribe
  private unViewporChange: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unActive = engine.getMonitor().subscribeToActiveChanged(this.handleActivedChange)
    this.unViewporScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
    this.unViewporChange = this.engine.getShell().subscribeTo(CanvasResizeEvent, this.refresh)
  }
  handleActivedChange = (activedId: ID | undefined | null): void => {
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
    //防止更新不彻底，两遍刷新补齐
    setTimeout(() => {
      this.currentId && this.renderLine(this.currentId)
    }, 10)
  }

  handleOutNode = (e: MouseOutEvent): void => {
    this.clearLine()
    this.currentId = null
  }

  destory(): void {
    this.clearLine()
    this.nodeChangeUnsubscribe()
    this.unActive()
    this.unViewporScroll()
    this.unViewporChange()
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
