import { IDesignerEngine, IDesignerShell, Unsubscribe } from "core";
import { DragStartEvent, MouseMoveEvent } from "core/shell/events/mouse";
import { IPlugin } from "core/interfaces/plugin";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";
import { numbToPx } from "../utils/numbToPx";

export class GhostWidgetImpl implements IPlugin {
  name: string = "default.ghost";
  htmlNode: HTMLElement;
  draggingNodesOff: Unsubscribe
  draggingResourceOff: Unsubscribe
  dragOff: Unsubscribe | null = null
  dragStopOff: Unsubscribe | null = null
  shell: IDesignerShell
  startEvent: DragStartEvent | null = null
  title: string = "undefined"
  mounted: boolean = false

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
    htmlNode.style.zIndex = "10000"
    this.htmlNode = htmlNode
    this.shell = engine.getShell()
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
    this.dragOff = this.shell.subscribeTo(MouseMoveEvent, this.handleDrag)
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    if (dragging) {
      const node = this.engine.getMonitor().getNode(dragging.nodeIds[0])
      if (node) {
        this.title = node.title || node.meta.componentName
        this.mounted = true
      }
    } else {
      this.unmount()
    }
  }

  handleDraggingResource = (dragging: DraggingResourceState | null) => {
    if (dragging) {
      const resource = this.engine.getResourceManager().getResource(dragging.resource)
      if (resource) {
        this.title = resource.title || resource.id || "undefined"
        this.mount()
      }
    } else {
      this.unmount()
    }
  }

  handleDrag = (e: MouseMoveEvent): void => {
    if (this.mounted && this.engine.getShell().dragging) {
      const container = this.engine.getShell().getContainer()
      if(container && !container.contains(this.htmlNode)){
        if(this.htmlNode.parentElement){
          this.htmlNode.remove()
        }
        container.appendChild(this.htmlNode)
      }
      this.htmlNode.style.display = "block"
      this.htmlNode.innerHTML = this.title
      this.htmlNode.style.left = numbToPx(e.data.topClientX)
      this.htmlNode.style.top = numbToPx(e.data.topClientY)
    }
  }

  destory(): void {
    this.unmount()
    this.dragOff?.()
    this.draggingNodesOff?.()
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

export const GhostWidget = (engine: IDesignerEngine) => {
  return new GhostWidgetImpl(engine)
}