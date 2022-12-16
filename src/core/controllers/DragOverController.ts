import { ID, IDesignerEngine, Unsubscribe } from "core";
import { DragMoveEvent } from "core/shell/events";
import { AcceptType, DrageOverOptions } from "core/interfaces/action";
import { IPlugin } from "core/interfaces/plugin";
import { PositionJudger } from "../utils/coordinate";

export class DragOverControllerImpl implements IPlugin {
  name: string = "default.drag-over-controller";

  dragover: DrageOverOptions | null = null
  unsucribe: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    this.unsucribe = engine.getShell().subscribeTo(DragMoveEvent, this.handleDragMove)
  }

  handleDragMove = (e: DragMoveEvent) => {
    const { rxId } = e.data.targetRx || {}
    if (rxId) {
      if (this.engine.getMonitor().isDragging()) {
        this.handleDragOver(rxId, e)
      }
    } else if (this.dragover) {
      this.engine.getActions().dragover(null)
      this.dragover = null
    }
  }

  private handleDragOver(rxId: ID, e: DragMoveEvent) {
    const node = this.engine.getMonitor().getNode(rxId)

    const targetRect = this.engine.getShell().getTopRect(rxId)
    // const sourceRule = this.engine.getComponentManager().getBehaviorRule(this.engine.getMonitor().getState().draggingNodes?.nodeIds?.[0] || "")
    // const targetRule = this.engine.getComponentManager().getBehaviorRule(rxId)
    //如果是根节点
    if (!node?.parentId) {

    }
    const draggingResource = this.engine.getMonitor().getState().draggingResource
    if (node) {
      const judger = new PositionJudger(node, this.engine)
      const relativePosition = judger.judgePosition(e.data)
      const dragover = relativePosition ? {
        type: AcceptType.Accept,
        ...relativePosition,
      } : null
      if (this.dragover?.position !== dragover?.position ||
        this.dragover?.targetId !== dragover?.targetId ||
        this.dragover?.type !== dragover?.type
      ) {
        this.engine.getActions().dragover(dragover)
        this.dragover = dragover
      }

      // for (const resourceId of draggingResource.resource) {
      //   const resource = this.engine.getResourceManager().getResource(resourceId)
      //   for (const meta of resource?.elements || []) {

      //   }
      // }

    }

  }

  destory(): void {
    this.unsucribe()
  }
}

export const DragOverController = (engine: IDesignerEngine) => {
  return new DragOverControllerImpl(engine)
}