import { DragStartEvent } from "core/shell/events/mouse";
import { IDesignerEngine, NodeType, Unsubscribe } from "core/interfaces";
import { getOffset, getPosition } from "core/shell/utils/xycoord";
import { IPlugin } from "core/interfaces/plugin";

export class StartDragControllerImpl implements IPlugin {
  name: string = "default.start-drag-controller";

  unsucribe: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    this.unsucribe = engine.getShell().subscribeTo(DragStartEvent, this.handleDragStart)
  }

  handleDragStart = (e: DragStartEvent) => {
    if (e.data.targetRx?.nodeType === NodeType.Resource) {
      e.data.targetRx?.rxId && this.engine.getActions().startDragResource({
        initialMousePosition: getPosition(e.data),
        offset: getOffset(e.data),
        resourceId: e.data.targetRx?.rxId,
        mousePosition: getPosition(e.data),
      })
    } else if (e.data.targetRx?.nodeType === NodeType.Node) {
      const nodeId = e.data.targetRx?.rxId
      if (nodeId) {
        const beheavior = this.engine.getNodeBehavior(nodeId)
        const node = this.engine.getMonitor().getNode(nodeId)
        if (beheavior.isDraggable() && !node?.isSlot) {
          this.engine.getActions().startDragNodes({
            initialMousePosition: getPosition(e.data),
            offset: getOffset(e.data),
            nodeIds: [nodeId],
            mousePosition: getPosition(e.data)
          })
        }
      }
    }
  }

  destory(): void {
    this.unsucribe()
  }

}

export const StartDragController = (engine: IDesignerEngine) => {
  return new StartDragControllerImpl(engine)
}