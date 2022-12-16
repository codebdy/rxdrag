import { AbleSelector, ID, IDesignerEngine, ITreeNode, Unsubscribe } from "core";
import { DragMoveEvent } from "core/shell/events";
import { AcceptType, DrageOverOptions } from "core/interfaces/action";
import { IPlugin } from "core/interfaces/plugin";
import { IDropPosition, PositionJudger, RelativePosition } from "../utils/coordinate";
import { isFunction } from "lodash";

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

  private handleDragOver(targetId: ID, e: DragMoveEvent) {
    const node = this.engine.getMonitor().getNode(targetId)

    //const targetRect = this.engine.getShell().getTopRect(rxId)
    // const sourceRule = this.engine.getComponentManager().getBehaviorRule(this.engine.getMonitor().getState().draggingNodes?.nodeIds?.[0] || "")
    // const targetRule = this.engine.getComponentManager().getBehaviorRule(rxId)
    //const draggingResource = this.engine.getMonitor().getState().draggingResource
    if (node) {
      const judger = new PositionJudger(node, this.engine)
      const relativePosition = judger.judgePosition(e.data)
      const dragover = relativePosition ? {
        type: this.canAccept(relativePosition),
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

  private canAccept(position: IDropPosition): AcceptType {
    if (this.engine.getMonitor().getState().draggingNodes) {
      return this.canAcceptNodes(position)
    }
    if (this.engine.getMonitor().getState().draggingResource) {
      return this.canAcceptResouce(position)
    }

    return AcceptType.Reject
  }
  private canAcceptNodes(position: IDropPosition) {
    const sourceIds = this.engine.getMonitor().getState().draggingNodes?.nodeIds || []
    for (const sourceId of sourceIds) {
      const node = this.engine.getMonitor().getNode(sourceId)
      if (position.position === RelativePosition.In && node) {
        const targetRule = this.engine.getComponentManager().getBehaviorRule(position.targetId)
        if (!this.ableCheck(node, targetRule?.droppable)) {
          return AcceptType.Reject
        }
      }
    }

    return AcceptType.Accept
  }

  private canAcceptResouce(position: IDropPosition): AcceptType {
    const resourceId = this.engine.getMonitor().getState().draggingResource?.resource
    const resource = this.engine.getResourceManager().getResource(resourceId || "")
    const targetRule = this.engine.getComponentManager().getBehaviorRule(position.targetId)
    if (position.position === RelativePosition.In && resource) {
      for (const element of resource.elements) {
        if (!this.ableCheck(element.componentName, targetRule?.droppable)) {
          return AcceptType.Reject
        }
      }
    }

    return AcceptType.Accept
  }

  private ableCheck(source: string | ITreeNode, ableSelector?: AbleSelector): boolean {
    if (isFunction(ableSelector)) {
      return ableSelector(source, this.engine)
    }
    return ableSelector || false
  }

  destory(): void {
    this.unsucribe()
  }
}

export const DragOverController = (engine: IDesignerEngine) => {
  return new DragOverControllerImpl(engine)
}