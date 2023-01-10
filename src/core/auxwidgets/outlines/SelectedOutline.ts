import { IDesignerEngine, ID, Unsubscribe } from "core";
import { IPlugin } from "core/interfaces/plugin";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";
import { CanvasScrollEvent } from "core/shell/events";
import { AUX_BACKGROUND_COLOR } from "../consts";
import { numbToPx } from "../utils/numbToPx";
import { getMaxZIndex } from "./getMaxZIndex";

export class SelectedOutlineImpl implements IPlugin {
  name: string = "default.selected-outline";
  resizeObserver: ResizeObserver
  private unsubscribe: Unsubscribe;
  private htmls: {
    [id: ID]: HTMLElement
  } = {}
  private nodeChangeUnsubscribe: Unsubscribe;
  private selecteNodes: ID[] | null = null
  private refreshedFlag = false
  private unCanvasScroll: Unsubscribe
  private draggingNodesOff: Unsubscribe
  private draggingResourceOff: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.unsubscribe = engine.getMonitor().subscribeToSelectChange(this.handleSelectChange)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  onResize = () => {
    this.refresh()
  }

  onMutation = (mutations: any) => {
    this.refresh()
  }

  render = () => {
    this.clear()
    for (const id of this.selecteNodes || []) {
      const element = this.engine.getShell().getElement(id)
      const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "")
      const containerRect = canvas?.getContainerRect()

      if (element && containerRect) {
        const rect = element.getBoundingClientRect();
        const htmlDiv = document.createElement('div')
        htmlDiv.style.backgroundColor = "transparent"
        htmlDiv.style.position = "fixed"
        htmlDiv.style.border = `solid 2px ${AUX_BACKGROUND_COLOR}`
        htmlDiv.style.pointerEvents = "none"
        htmlDiv.style.left = numbToPx(rect.left - containerRect.x)
        htmlDiv.style.top = numbToPx(rect.top - containerRect.y)
        htmlDiv.style.height = numbToPx(rect.height - 4)
        htmlDiv.style.width = numbToPx(rect.width - 4)
        htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString()
        canvas?.appendChild(htmlDiv)
        this.htmls[id] = htmlDiv

        this.resizeObserver.observe(element)
      }
    }
  }

  handleSelectChange = (selectedIds: ID[] | null) => {
    this.resizeObserver.disconnect()
    this.selecteNodes = selectedIds
    this.refresh()
    if (selectedIds?.length && !this.engine.getShell().getElement(selectedIds?.[0])) {
      setTimeout(() => {
        this.refresh()
      }, 100)
    }
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  handleDraggingResource = (dragging: DraggingResourceState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  private hideWhenDragging = (dragging: boolean) => {
    if (dragging) {
      for (const key of Object.keys(this.htmls)) {
        this.htmls[key].style.display = "none"
      }
    } else {
      for (const key of Object.keys(this.htmls)) {
        this.htmls[key].style.display = ""
      }
    }
  }

  onViewportChange = () => {
    this.refresh()
  }

  refresh = () => {
    this.refreshedFlag = true
    setTimeout(() => {
      if (this.refreshedFlag) {
        this.render()
        this.refreshedFlag = false
      }
    }, 20)
  }

  destory(): void {
    this.clear()
    this.unsubscribe()
    this.nodeChangeUnsubscribe()
    this.unCanvasScroll()
    this.draggingNodesOff?.()
    this.draggingResourceOff?.()
  }

  private clear() {
    for (const id of Object.keys(this.htmls)) {
      this.htmls[id].remove()
    }
    this.htmls = {}
  }
}

export const SelectedOutline = (engine: IDesignerEngine) => {
  return new SelectedOutlineImpl(engine)
}
