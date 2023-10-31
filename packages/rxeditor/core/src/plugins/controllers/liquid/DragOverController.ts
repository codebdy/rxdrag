import { DragMoveEvent } from "../../../shell/events";
import { AcceptType, DragOverOptions } from "../../../interfaces/action";
import { IPlugin } from "../../../interfaces/plugin";
import { IDropPosition, PositionJudger, RelativePosition } from "../../../utils/coordinate";
import { DragOverState } from "../../../reducers/dragOver";
import { ID, IDesignerEngine, Unsubscribe } from "../../../interfaces";

export class DragOverControllerImpl implements IPlugin {
  name = "default.drag-over-controller";

  dragover: DragOverOptions | null = null
  unsubscribe: Unsubscribe
  subscribeNodeChange: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    this.unsubscribe = engine.getShell().subscribeTo<DragMoveEvent>(DragMoveEvent.Name, this.handleDragMove)
    this.subscribeNodeChange = engine.getMonitor().subscribeToDragOver(this.handleDragoverChange)
  }

  handleDragoverChange = (dragover: DragOverState | null) => {
    if (!dragover) {
      this.dragover = null
    }
  }

  handleDragMove = (e: DragMoveEvent) => {
    const { rxId } = e.data.targetRx || {}
    if (rxId) {
      if (this.isDragging()) {
        this.handleDragOver(rxId, e)
      }
    } else if (this.dragover) {
      this.engine.getActions().dragover(null)
      this.dragover = null
    }
  }

  private isDragging() {
    const monitor = this.engine.getMonitor()

    return !!monitor.getDraggingResouce() || !!monitor.getDraggingNodes()
  }

  private handleDragOver(targetId: ID, e: DragMoveEvent) {
    //先处理自由移动
    // if (this.moveableResourceDragover(targetId) || this.moveableNodesDragover(targetId)) {
    //   return
    // }

    const node = this.engine.getMonitor().getNode(targetId)
    if (node) {
      const judger = new PositionJudger(node, this.engine)
      const relativePosition = judger.judgePosition(e.data)
      const dragover = relativePosition ? {
        type: this.canAccept(relativePosition),
        ...relativePosition,
      } : null
      if (this.dragover?.targetId !== dragover?.targetId || this.dragover?.type !== dragover?.type ||
        this.dragover?.position !== dragover?.position
      ) {
        this.engine.getActions().dragover(dragover)
        this.dragover = dragover
      }
    } else {
      this.dragover = null
    }
  }

  // private moveableNodesDragover(targetId: ID) {
  //   const draggingNodesState = this.engine.getMonitor().getDraggingNodes()
  //   if (draggingNodesState) {
  //     const moveable = this.engine.getBehaviorManager().isMoveable(draggingNodesState.nodeIds)
  //     if (moveable) {
  //       const container = this.getFreedomContainer(targetId)
  //       if (container) {
  //         this.dragover = {
  //           type: AcceptType.Accept,
  //           position: RelativePosition.AbsoluteIn,
  //           targetId: container.id
  //         }
  //         this.engine.getActions().dragover(this.dragover)
  //         return true
  //       }
  //     }
  //   }

  //   return false
  // }

  // private moveableResourceDragover(targetId: ID) {
  //   const draggingResourceState = this.engine.getMonitor().getDraggingResouce()
  //   if (draggingResourceState) {
  //     const resource = this.engine.getResourceManager().getResource(draggingResourceState.resource)
  //     if (resource) {
  //       const resourceBehavior = this.engine.getBehaviorManager().getResourceBehavior(resource)
  //       const moveable = resourceBehavior.moveable()
  //       if (moveable?.left || moveable?.top) {
  //         const container = this.getFreedomContainer(targetId)
  //         if (container) {
  //           this.dragover = {
  //             type: AcceptType.Accept,
  //             position: RelativePosition.AbsoluteIn,
  //             targetId: container.id
  //           }
  //           this.engine.getActions().dragover(this.dragover)
  //           return true
  //         }
  //       }
  //     }
  //   }
  //   return false
  // }

  private canAccept(position: IDropPosition): AcceptType {
    if (this.engine.getMonitor().getState().draggingNodes) {
      return this.canAcceptNodes(position)
    }
    if (this.engine.getMonitor().getState().draggingResource) {
      return this.canAcceptResource(position)
    }

    return AcceptType.Reject
  }
  private canAcceptNodes(position: IDropPosition) {
    const sourceIds = this.engine.getMonitor().getState().draggingNodes?.nodeIds || []
    for (const sourceId of sourceIds) {
      const node = this.engine.getMonitor().getNode(sourceId)
      if (position.position === RelativePosition.In && node) {
        const beheavior = this.engine.getBehaviorManager().getNodeBehavior(position.targetId)
        if (beheavior?.droppable() && !node.meta.locked) {
          return AcceptType.Accept
        }
      } else {
        const parentId = this.engine.getMonitor().getNode(position.targetId)?.parentId
        if (parentId) {
          const beheavior = this.engine.getBehaviorManager().getNodeBehavior(parentId)
          if (beheavior?.droppable()) {
            return AcceptType.Accept
          }
        }
      }
    }

    return AcceptType.Reject
  }

  private canAcceptResource(position: IDropPosition): AcceptType {
    const resourceId = this.engine.getMonitor().getState().draggingResource?.resource
    const resource = this.engine.getResourceManager().getResource(resourceId || "")
    if (!resource) {
      console.error("no resource to drop")
      return AcceptType.Reject
    }
    if (position.position === RelativePosition.In) {
      const behavior = this.engine.getBehaviorManager().getNodeBehavior(position.targetId)
      const node = this.engine.getMonitor().getNode(position.targetId)
      if (behavior?.droppable() && !node?.meta.locked) {
        return AcceptType.Accept
      }
      // if (isArr(resource.elements)) {
      //   for (const element of resource.elements) {

      //   }
      // }

    } else {
      const parentId = this.engine.getMonitor().getNode(position.targetId)?.parentId
      if (parentId) {
        const behavior = this.engine.getBehaviorManager().getNodeBehavior(parentId)
        if (behavior?.droppable()) {
          return AcceptType.Accept
        }
      }
    }

    return AcceptType.Reject
  }

  destroy(): void {
    this.unsubscribe()
  }

  //   private getFreedomContainer(id: string): ITreeNode | undefined {
  //     const node = this.engine.getMonitor().getNode(id)
  //     const nodeBehavior = this.engine.getBehaviorManager().getNodeBehavior(id)
  //     if (nodeBehavior?.freedomContainer()) {
  //       return node || undefined
  //     }
  //     if (node?.parentId) {
  //       return this.getFreedomContainer(node?.parentId)
  //     }
  //     return undefined
  //   }

}

export const DragOverController = (engine: IDesignerEngine) => {
  return new DragOverControllerImpl(engine)
}