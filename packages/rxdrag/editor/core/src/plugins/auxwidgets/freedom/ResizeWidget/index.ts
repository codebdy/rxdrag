import { ID } from "@rxdrag/shared";
import { IPlugin, IDesignerEngine, Unsubscribe } from "../../../../interfaces";
import { DraggingNodesState } from "../../../../reducers/draggingNodes";
import { DraggingResourceState } from "../../../../reducers/draggingResource";
import { CanvasScrollEvent } from "../../../../shell";
import { getMaxZIndex } from "../../common/ActiviedOutline/getMaxZIndex";
import { numbToPx } from "../../utils";
import { AUX_BACKGROUND_COLOR } from "../../utils/constants";

const HandlerWidth = "8px"
const HandlerHeight = "8px"
const RotateLineLength = "20px"

//选中时的轮廓线
export class ResizeWidgetImpl implements IPlugin {
  name = "default.freedom.resize-widget";
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
        htmlDiv.style.position = "fixed"
        htmlDiv.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        htmlDiv.style.pointerEvents = "none"
        htmlDiv.style.left = numbToPx(rect.x - containerRect.x)
        htmlDiv.style.top = numbToPx(rect.y - containerRect.y)
        htmlDiv.style.height = numbToPx(rect.height - 1)
        htmlDiv.style.width = numbToPx(rect.width - 1)
        htmlDiv.style.zIndex = (getMaxZIndex(elements?.[elements.length - 1]) + 1).toString()
        canvas?.appendAux(htmlDiv)
        this.htmls[id] = htmlDiv

        const inner = document.createElement('div')
        inner.style.height = "100%"
        inner.style.width = "100%"
        inner.style.position = "relative"
        htmlDiv.appendChild(inner)

        //左上角
        let corner = document.createElement('div')
        corner.style.position = "absolute"
        corner.style.left = "0"
        corner.style.top = "0"
        corner.style.height = HandlerHeight
        corner.style.width = HandlerWidth
        corner.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        corner.style.backgroundColor = "white"
        corner.style.transform = "translate(-50%, -50%)"
        inner.appendChild(corner)

        //右上角
        corner = document.createElement('div')
        corner.style.position = "absolute"
        corner.style.right = "0"
        corner.style.top = "0"
        corner.style.height = HandlerHeight
        corner.style.width = HandlerWidth
        corner.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        corner.style.backgroundColor = "white"
        corner.style.transform = "translate(50%, -50%)"
        inner.appendChild(corner)

        //右下角
        corner = document.createElement('div')
        corner.style.position = "absolute"
        corner.style.right = "0"
        corner.style.bottom = "0"
        corner.style.height = HandlerHeight
        corner.style.width = HandlerWidth
        corner.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        corner.style.backgroundColor = "white"
        corner.style.transform = "translate(50%, 50%)"
        inner.appendChild(corner)

        //左上角
        corner = document.createElement('div')
        corner.style.position = "absolute"
        corner.style.left = "0"
        corner.style.bottom = "0"
        corner.style.height = HandlerHeight
        corner.style.width = HandlerWidth
        corner.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        corner.style.backgroundColor = "white"
        corner.style.transform = "translate(-50%, 50%)"
        inner.appendChild(corner)

        //旋转支撑线
        const line =  document.createElement('div')
        line.style.position = "absolute"
        line.style.left = "50%"
        line.style.bottom = "2px"
        line.style.height = RotateLineLength
        line.style.width = "0"
        line.style.borderLeft = `solid 1px ${AUX_BACKGROUND_COLOR}`
        line.style.transform = "translate(0, -100%)"
        inner.appendChild(line)
        //旋转把手
        const rotateHandler = document.createElement('div')
        rotateHandler.style.position = "absolute"
        rotateHandler.style.borderRadius = "50%"
        rotateHandler.style.left = "50%"
        rotateHandler.style.top = "-" + RotateLineLength
        rotateHandler.style.height = HandlerHeight
        rotateHandler.style.width = HandlerWidth
        rotateHandler.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        rotateHandler.style.backgroundColor = "white"
        rotateHandler.style.transform = "translate(-50%, -100%)"
        inner.appendChild(rotateHandler)

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

export const ResizeWidget = (engine: IDesignerEngine) => {
  return new ResizeWidgetImpl(engine)
}
