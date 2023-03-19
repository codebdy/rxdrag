import { IDesignerEngine, NodeRelativePosition } from "core";
import { DragStopEvent } from "core/shell/events";
import { HistoryableActionType, IDocument, Unsubscribe } from "core/interfaces";
import { AcceptType, DrageOverOptions } from "core/interfaces/action";
import { IPlugin } from "core/interfaces/plugin";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";
import { RelativePosition } from "core/utils/coordinate";
import { invariant } from "core/utils/util-invariant";

export class DragStopControllerImpl implements IPlugin {
  name: string = "default.drag-stop-controller";

  unsucribe: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    this.unsucribe = engine.getShell().subscribeTo(DragStopEvent, this.handleDragStop)
  }

  handleDragStop = (e: DragStopEvent) => {
    this.drop(e)
    if (this.engine.getMonitor().getState().draggingResource) {
      this.engine.getActions().endDragResouce()
    } else if (this.engine.getMonitor().getState().draggingNodes) {
      this.engine.getActions().endDragNodes()
    }
    this.engine.getActions().dragover(null)
  }

  drop(e: DragStopEvent): void {
    const monitor = this.engine.getMonitor()
    const dragOver = monitor.getDrageOver()
    if (dragOver) {
      const document = this.engine.getNodeDocument(dragOver.targetId)
      invariant(document, "can not find node document by id:" + dragOver.targetId)
      if (!document?.id) {
        return
      }
      const draggingResource = monitor.getState().draggingResource
      if (draggingResource) {
        this.dropResource(draggingResource, dragOver, document);
      } else {
        const draggingNodes = monitor.getState().draggingNodes
        if (draggingNodes) {
          this.dropNodes(draggingNodes, dragOver, document);
        }
      }
    }
  }

  private dropResource = (draggingResource: DraggingResourceState, dragOver: DrageOverOptions, document: IDocument) => {
    const resource = this.engine.getResourceManager().getResource(draggingResource?.resource || "");
    const pos = this.tranPosition(dragOver.position)
    if (resource && pos && dragOver.type === AcceptType.Accept) {
      const nodes = document.addNewNodes(resource.elements, dragOver.targetId, pos);
      document.backup(HistoryableActionType.Add)
      this.engine.getActions().selectNodes(nodes.rootNodes.map(node => node.id), document.id);
    }
  }

  private dropNodes(draggingNodes: DraggingNodesState, dragOver: DrageOverOptions, document: IDocument) {
    if (!draggingNodes) {
      return
    }
    for (const nodeId of draggingNodes.nodeIds || []) {
      const nodDocument = this.engine.getNodeDocument(dragOver.targetId)
      const pos = this.tranPosition(dragOver.position)
      if (nodDocument?.id === document.id && pos && dragOver.type === AcceptType.Accept) {
        document.moveTo(nodeId, dragOver.targetId, pos)
        document.backup(HistoryableActionType.Move)
      } else {
        //预留实现
        //nodDocument?.getActions().remove(nodeId)
        //document.getActions().addNodeFormOutside()
      }
    }
    this.engine.getActions().selectNodes(draggingNodes.nodeIds, document.id);

  }

  private tranPosition(curPos: RelativePosition | null): NodeRelativePosition | null {
    switch (curPos) {
      case RelativePosition.In:
        return NodeRelativePosition.InBottom
      case RelativePosition.Left:
      case RelativePosition.Top:
        return NodeRelativePosition.Before
      case RelativePosition.Right:
      case RelativePosition.Bottom:
        return NodeRelativePosition.After
    }
    return null
  }

  destory(): void {
    this.unsucribe()
  }
}

export const DragStopController = (engine: IDesignerEngine) => {
  return new DragStopControllerImpl(engine)
}