import { IDesignerEngine, IDesignerShell, Unsubscribe } from "core";
import { DragStartEvent } from "core/shell/events/mouse";
import { IPlugin } from "core/interfaces/plugin";
import { DraggingNodesState } from "core/reducers/draggingNodes";

export class DraggedAttenuatorImpl implements IPlugin {
  name: string = "default.dragged-attenuator";
  htmlStyle?: HTMLElement;
  draggingNodesOff: Unsubscribe
  weakedElements: HTMLElement[] = []
  shell: IDesignerShell
  startEvent: DragStartEvent | null = null
  title: string = "undefined"
  mounted: boolean = false

  constructor(private engine: IDesignerEngine) {
    this.shell = engine.getShell()
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    if (dragging) {
      let styleAdded = false
      for (const draggingId of dragging.nodeIds) {
        const element = this.shell.getElement(draggingId)
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
          this.weakedElements.push(element)
        }
      }
    } else {
      if (this.htmlStyle) {
        this.htmlStyle.remove()
      }
      for (const element of this.weakedElements) {
        element.classList.remove("rx-dragging")
      }
      this.weakedElements = []
      this.htmlStyle = undefined
    }
  }


  destory(): void {
    this.draggingNodesOff?.()
  }
}

export const DraggedAttenuator = (engine: IDesignerEngine) => {
  return new DraggedAttenuatorImpl(engine)
}