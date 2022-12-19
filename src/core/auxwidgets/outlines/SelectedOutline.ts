import { IDesignerEngine, ID, Unsubscribe } from "core";
import { IPlugin } from "core/interfaces/plugin";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";
import { CanvasResizeEvent, CanvasScrollEvent } from "core/shell/events";
import { NodeMountedEvent } from "core/shell/events/canvas/NodeMountedEvent";
import { NodeUnmountedEvent } from "core/shell/events/canvas/NodeUnmountedEvent";
import { addZIndex } from "core/utils/add-zindex";
import { AUX_BACKGROUND_COLOR } from "../consts";
import { numbToPx } from "../utils/numbToPx";

export class SelectedOutlineImpl implements IPlugin {
  name: string = "default.selected-outline";
  private unsubscribe: Unsubscribe;
  private htmls: {
    [id: ID]: HTMLElement
  } = {}
  private nodeChangeUnsubscribe: Unsubscribe;
  private selecteNodes: ID[] | null = null
  private unCanvasScroll: Unsubscribe
  private unCanvasResize: Unsubscribe
  private unThemeModeChange: Unsubscribe
  private unNodeMounted: Unsubscribe
  private unmountUnsubscribe: Unsubscribe
  private draggingNodesOff: Unsubscribe
  private draggingResourceOff: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.unmountUnsubscribe = this.engine.getShell().subscribeTo(NodeUnmountedEvent, this.handleNodeMounted)
    this.unsubscribe = engine.getMonitor().subscribeToSelectChange(this.listenSelectChange)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
    this.unCanvasResize = this.engine.getShell().subscribeTo(CanvasResizeEvent, this.refresh)
    this.unThemeModeChange = engine.getMonitor().subscribeToThemeModeChange(this.handleThemeChange)
    this.unNodeMounted = this.engine.getShell().subscribeTo(NodeMountedEvent, this.handleNodeMounted)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  handleNodeMounted = (e: NodeMountedEvent) => {
    if (Object.keys(this.htmls).length || this.selecteNodes?.length) {
      this.refresh()
    }
  }

  listenSelectChange = (selectedIds: ID[] | null) => {
    this.clear()
    for (const id of selectedIds || []) {
      const element = this.engine.getShell().getElement(id)
      if (element) {
        const rect = element.getBoundingClientRect();
        const htmlDiv = document.createElement('div')
        htmlDiv.style.backgroundColor = "transparent"
        htmlDiv.style.position = "fixed"
        htmlDiv.style.border = `solid 2px ${AUX_BACKGROUND_COLOR}`
        htmlDiv.style.pointerEvents = "none"
        htmlDiv.style.left = numbToPx(rect.left)
        htmlDiv.style.top = numbToPx(rect.top)
        htmlDiv.style.height = numbToPx(rect.height - 4)
        htmlDiv.style.width = numbToPx(rect.width - 4)
        htmlDiv.style.zIndex = addZIndex(window.getComputedStyle(htmlDiv).zIndex, 1)
        element.ownerDocument.body?.appendChild(htmlDiv)
        this.htmls[id] = htmlDiv
      }
    }
    this.selecteNodes = selectedIds
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

  handleThemeChange = () => {
    setTimeout(() => {
      this.listenSelectChange(this.selecteNodes)
    }, 200)
  }

  refresh = () => {
    this.listenSelectChange(this.selecteNodes)
  }

  destory(): void {
    this.clear()
    this.unmountUnsubscribe()
    this.unsubscribe()
    this.nodeChangeUnsubscribe()
    this.unCanvasScroll()
    this.unCanvasResize()
    this.unThemeModeChange()
    this.unNodeMounted()
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
