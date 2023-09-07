import { ID } from "@rxdrag/shared";
import { IPlugin, IDesignerEngine, Unsubscribe } from "../../../../interfaces";
import { CanvasScrollEvent } from "../../../../shell";
import { Resizer } from "./Resizer";

export class ResizeWidgetImpl implements IPlugin {
  name = "default.freedom.resize-widget";
  resizeObserver: ResizeObserver
  private unsubscribe: Unsubscribe;
  private resizer: Resizer | undefined
  private nodeChangeUnsubscribe: Unsubscribe;
  private selectedNodes: ID[] | null = null
  private refreshedFlag = false
  private unCanvasScroll: Unsubscribe
  //private draggingNodesOff: Unsubscribe
  //private draggingResourceOff: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.unsubscribe = engine.getMonitor().subscribeToSelectChange(this.handleSelectChange)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unCanvasScroll = this.engine.getShell().subscribeTo<CanvasScrollEvent>(CanvasScrollEvent.Name, this.refresh)
    //this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    //this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  onResize = () => {
    this.refresh()
  }

  render = () => {
    this.clear()
    if (this.selectedNodes?.length) {
      const resizer = new Resizer(this.selectedNodes, this.engine)
      this.resizer = resizer
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

  // handleDraggingNodes = (dragging: DraggingNodesState | null) => {
  //   this.hideWhenDragging(!!dragging)
  // }

  // handleDraggingResource = (dragging: DraggingResourceState | null) => {
  //   this.hideWhenDragging(!!dragging)
  // }

  // private hideWhenDragging = (dragging: boolean) => {
  //   // if (dragging) {
  //   //   for (const key of Object.keys(this.resizers)) {
  //   //     this.resizers[key].style.display = "none"
  //   //   }
  //   // } else {
  //   //   for (const key of Object.keys(this.resizers)) {
  //   //     this.resizers[key].style.display = ""
  //   //   }
  //   // }
  // }

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
    //this.draggingNodesOff?.()
    //this.draggingResourceOff?.()
  }

  private clear() {
    this.resizer?.destory()
    this.resizer = undefined
  }
}

export const ResizeWidget = (engine: IDesignerEngine) => {
  return new ResizeWidgetImpl(engine)
}
