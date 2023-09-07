import { IDesignerEngine, ID, Unsubscribe } from "../../../../interfaces";
import { IPlugin } from "../../../../interfaces/plugin";
import { DraggingNodesState } from "../../../../reducers/draggingNodes";
import { DraggingResourceState } from "../../../../reducers/draggingResource";
import { CanvasScrollEvent } from "../../../../shell/events";
import { getMaxZIndex } from "../../common/ActiviedOutline/getMaxZIndex";
import { numbToPx } from "../../utils";
import { AUX_BACKGROUND_COLOR } from "../../utils/constants";

//选中时的轮廓线
export class SelectedOutlineImpl implements IPlugin {
  name = "default.selected-outline";
  resizeObserver: ResizeObserver
  private unsubscribe: Unsubscribe;
  private htmls: {
    [id in ID]: HTMLElement
  } = {}
  private nodeChangeUnsubscribe: Unsubscribe;
  private selectedNodes: ID[] | null = null
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
    this.unCanvasScroll = this.engine.getShell().subscribeTo<CanvasScrollEvent>(CanvasScrollEvent.Name, this.refresh)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  onResize = () => {
    this.refresh()
  }

  onMutation = () => {
    this.refresh()
  }

  render = () => {
    this.clear()
    const shell = this.engine.getShell()
    for (const id of this.selectedNodes || []) {
      const elements = shell.getElements(id)
      const canvas = shell.getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "")
      const containerRect = canvas?.getDocumentBodyRect()
      const rect = shell.getNodeRect(id);
      if (elements && containerRect && rect) {
        const htmlDiv = document.createElement('div')
        htmlDiv.style.backgroundColor = "transparent"
        htmlDiv.style.boxSizing = "border-box"
        htmlDiv.style.position = "fixed"
        htmlDiv.style.border = `solid 2px ${AUX_BACKGROUND_COLOR}`
        htmlDiv.style.pointerEvents = "none"
        htmlDiv.style.left = numbToPx(rect.x - containerRect.x)
        htmlDiv.style.top = numbToPx(rect.y - containerRect.y)
        htmlDiv.style.height = numbToPx(rect.height)
        htmlDiv.style.width = numbToPx(rect.width)
        htmlDiv.style.zIndex = (getMaxZIndex(elements?.[elements.length - 1]) + 1).toString()
        canvas?.appendAux(htmlDiv)
        this.htmls[id] = htmlDiv

        for (const element of elements) {
          this.resizeObserver.observe(element)
        }
      }
    }
  }

  handleSelectChange = (selectedIds: ID[] | null) => {
    this.resizeObserver.disconnect()
    this.selectedNodes = selectedIds
    this.refresh()
    if (selectedIds?.length && !this.engine.getShell().getElements(selectedIds?.[0])) {
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

  destroy(): void {
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
