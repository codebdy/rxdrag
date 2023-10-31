import { IPlugin, IDesignerShell, IDesignerEngine, Unsubscribe } from "../../../../interfaces";
import { DraggingNodesState } from "../../../../reducers/draggingNodes";
import { DragStartEvent, MouseMoveEvent } from "../../../../shell";
import { AUX_BACKGROUND_COLOR } from "../../utils";

export type FollowerElement = {
  startPosition: {
    x: number,
    y: number,
  }
  htmlNode: HTMLElement,
}

//自由移动跟随鼠标
export class MoveableFollowerWidgetImpl implements IPlugin {
  name = "default.freedom.moveable-follower";
  follwers: FollowerElement[] = [];
  draggingNodesOff: Unsubscribe
  dragOff: Unsubscribe | null = null
  dragStopOff: Unsubscribe | null = null
  shell: IDesignerShell
  startEvent: DragStartEvent | null = null
  title = "undefined"
  mounted = false

  constructor(private engine: IDesignerEngine) {
    this.shell = engine.getShell()
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.dragOff = this.shell.subscribeTo<MouseMoveEvent>(MouseMoveEvent.Name, this.handleDrag)
  }

  handleDraggingNodes = (draggingState: DraggingNodesState | null) => {
    this.unmount()
    if (draggingState) {
      const shell = this.engine.getShell()
      for (const nodeId of draggingState.nodeIds) {
        const elements = shell.getElements(nodeId)
        for (const element of elements || []) {
          const newElement = element.cloneNode(true) as HTMLElement
          newElement.style.zIndex = "1"
          newElement.removeAttribute("rx-id")
          const rect = element.getBoundingClientRect()
          newElement.style.width = Math.round(rect.width) + "px"
          newElement.style.height = Math.round(rect.height) + "px"
          newElement.style.outline = `solid 1px ${AUX_BACKGROUND_COLOR}`
          newElement.style.opacity = "0.5"
          this.follwers.push({
            startPosition: {
              x: rect.left,
              y: rect.top,
            },
            htmlNode: newElement,
          })
          element.parentElement?.appendChild(newElement)
        }
      }
      this.mounted = true
      return
    }
  }

  handleDrag = (e: MouseMoveEvent): void => {
    const shell = this.engine.getShell()
    if (this.mounted && shell.dragStartEvent) {
      for (const follower of this.follwers) {
        follower.htmlNode.style.left = Math.round(follower.startPosition.x + (e.originalEvent.clientX - shell.dragStartEvent.clientX)) + "px"
        follower.htmlNode.style.top = Math.round(follower.startPosition.y + (e.originalEvent.clientY - shell.dragStartEvent.clientY)) + "px"
      }
    }
  }

  destroy(): void {
    this.unmount()
    this.dragOff?.()
    this.draggingNodesOff?.()
    this.dragStopOff?.()
  }


  private unmount() {
    if (this.mounted) {
      for (const follower of this.follwers) {
        follower.htmlNode.remove()
      }
      this.follwers = []
      this.mounted = false
    }
  }
}

export const MoveableFollowerWidget = (engine: IDesignerEngine) => {
  return new MoveableFollowerWidgetImpl(engine)
}