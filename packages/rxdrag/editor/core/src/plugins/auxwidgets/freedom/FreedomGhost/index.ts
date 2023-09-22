import { IPlugin, IDesignerShell, IDesignerEngine, Unsubscribe } from "../../../../interfaces";
import { DraggingResourceState } from "../../../../reducers/draggingResource";
import { DragStartEvent, MouseMoveEvent } from "../../../../shell";
import { numbToPx } from "../../utils";

//跟随鼠标
export class FreedomGhostImpl implements IPlugin {
  name = "default.freedom.ghost";
  htmlNode: HTMLElement;
  draggingResourceOff: Unsubscribe
  dragOff: Unsubscribe | null = null
  dragStopOff: Unsubscribe | null = null
  shell: IDesignerShell
  startEvent: DragStartEvent | null = null
  title = "undefined"
  mounted = false

  constructor(private engine: IDesignerEngine) {
    const htmlNode = document.createElement('div')
    htmlNode.style.backgroundColor = "blue"
    htmlNode.style.position = "fixed"
    htmlNode.style.display = "none"
    htmlNode.style.color = '#fff'
    htmlNode.style.fontSize = '13px'
    htmlNode.style.padding = "4px 8px"
    htmlNode.style.pointerEvents = "none"
    htmlNode.style.whiteSpace = "nowrap"
    htmlNode.style.zIndex = "100000"
    this.htmlNode = htmlNode
    this.shell = engine.getShell()
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    //this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
    this.dragOff = this.shell.subscribeTo<MouseMoveEvent>(MouseMoveEvent.Name, this.handleDrag)
  }

  handleDraggingResource = (dragging: DraggingResourceState | null) => {
    if (dragging) {
      const resource = this.engine.getResourceManager().getResource(dragging.resource)
      if (resource) {
        this.title = this.engine.getLocalesManager().getResourceMessage(resource.title) || resource.id || "undefined"
        this.mount()
      }
    } else {
      this.unmount()
    }
  }

  handleDrag = (e: MouseMoveEvent): void => {
    if (this.mounted && this.engine.getShell().dragStartEvent) {
      const container = this.engine.getShell().getContainer()
      if (container && !container.contains(this.htmlNode)) {
        if (this.htmlNode.parentElement) {
          this.htmlNode.remove()
        }
        container.appendAux(this.htmlNode)
      }
      this.htmlNode.style.display = "block"
      this.htmlNode.innerHTML = this.title
      this.htmlNode.style.left = numbToPx(e.data.topClientX)
      this.htmlNode.style.top = numbToPx(e.data.topClientY)
    }
  }

  destroy(): void {
    this.unmount()
    this.dragOff?.()
    this.draggingResourceOff?.()
    this.dragStopOff?.()
  }

  private mount() {
    if (this.htmlNode) {
      this.mounted = true
    }
  }

  private unmount() {
    if (this.mounted && this.htmlNode) {
      this.htmlNode.remove()
      this.mounted = false
    }
  }
}

export const FreedomGhost = (engine: IDesignerEngine) => {
  return new FreedomGhostImpl(engine)
}