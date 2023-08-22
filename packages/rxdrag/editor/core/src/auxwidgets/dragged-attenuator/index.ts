import { IDesignerEngine, IDesignerShell, Unsubscribe } from "../../interfaces";
import { DragStartEvent } from "../../shell/events/mouse";
import { IPlugin } from "../../interfaces/plugin";
import { DraggingNodesState } from "../../reducers/draggingNodes";

export class DraggedAttenuatorImpl implements IPlugin {
  name = "default.dragged-attenuator";
  htmlStyle?: HTMLElement;
  draggingNodesOff: Unsubscribe
  weakenElements: HTMLElement[] = []
  shell: IDesignerShell
  startEvent: DragStartEvent | null = null
  title = "undefined"
  mounted = false

  constructor(private engine: IDesignerEngine) {
    this.shell = engine.getShell()
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    if (dragging) {
      let styleAdded = false
      for (const draggingId of dragging.nodeIds) {
        const element = this.shell.getElements(draggingId)
        if (element) {
          if (!styleAdded) {
            const doc = element?.ownerDocument || document

            const style = doc.createElement('style');
            style.innerHTML = '.rx-dragging {  opacity: 0.4; pointer-events: none; }';
            this.htmlStyle = style
            const node = this.engine.getMonitor().getNode(draggingId)
            if (node) {
              const canvas = this.shell.getCanvas(node?.documentId)
              canvas?.appendChild(this.htmlStyle)
              styleAdded = true
            }
          }
          element.classList.add("rx-dragging")
          this.weakenElements.push(element)
        }
      }
    } else {
      if (this.htmlStyle) {
        this.htmlStyle.remove()
      }
      for (const element of this.weakenElements) {
        element.classList.remove("rx-dragging")
      }
      this.weakenElements = []
      this.htmlStyle = undefined
    }
  }


  destroy(): void {
    this.draggingNodesOff?.()
  }
}

export const DraggedAttenuator = (engine: IDesignerEngine) => {
  return new DraggedAttenuatorImpl(engine)
}