import { IDesignerEngine, NodeRelativePosition } from "../../../interfaces";
import { DragStopEvent } from "../../../shell/events";
import { HistoryableActionType, IDocument, Unsubscribe } from "../../../interfaces";
import { AcceptType, DragOverOptions } from "../../../interfaces/action";
import { IPlugin } from "../../../interfaces/plugin";
import { DraggingNodesState } from "../../../reducers/draggingNodes";
import { DraggingResourceState } from "../../../reducers/draggingResource";
import { RelativePosition } from "../../../utils/coordinate";
import { invariant } from "@rxdrag/shared";

export class DragStopControllerImpl implements IPlugin {
  name = "default.drag-stop-controller";

  unsubscribe: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    this.unsubscribe = engine.getShell().subscribeTo<DragStopEvent>(DragStopEvent.Name, this.handleDragStop)
  }

  handleDragStop = (e: DragStopEvent) => {
    //放开user select
    document.body.style.userSelect = ""
    const canvases = this.engine.getShell()?.getAllCanvases()
    for (const key of Object.keys(canvases)) {
      const canvas = canvases[key]
      if (canvas) {
        const element = canvas.getRootElement()
        if (element) {
          element.style.userSelect = ""
        }
      }
    }

    this.drop(e)
    if (this.engine.getMonitor().getState().draggingResource) {
      this.engine.getActions().endDragResource()
    } else if (this.engine.getMonitor().getState().draggingNodes) {
      this.engine.getActions().endDragNodes()
    }
    this.engine.getActions().dragover(null)
  }

  drop(e: DragStopEvent): void {
    const monitor = this.engine.getMonitor()
    const { rxId } = e.data.targetRx || {}
    if (!rxId || !monitor.getNode(rxId)) {
      console.log("元素置于画布外")
      return
    }

    const dragOver = monitor.getDragOver()
    if (dragOver) {
      const document = this.engine.getNodeDocument(dragOver.targetId)
      invariant(document, "can not find node document by id:" + dragOver.targetId)
      if (!document?.id) {
        return
      }
      const draggingResource = monitor.getDraggingResouce()
      if (draggingResource) {
        this.dropResource(draggingResource, dragOver, document);
      } else {
        const draggingNodes = monitor.getDraggingNodes()
        if (draggingNodes) {
          this.dropNodes(draggingNodes, dragOver, document, e);
        }
      }
    }
  }

  private dropResource = (draggingResource: DraggingResourceState, dragOver: DragOverOptions, document: IDocument) => {
    const resource = this.engine.getResourceManager().getResource(draggingResource?.resource || "");
    const pos = this.tranPosition(dragOver.position)
    if (resource && pos && dragOver.type === AcceptType.Accept) {
      // let mousePostion: IXYCoord | undefined = undefined
      // if (pos === NodeRelativePosition.Absolute) {
      //   mousePostion = {
      //     x: e.originalEvent.clientX,
      //     y: e.originalEvent.clientY,
      //   }
      // }
      const nodes = document.addNewNodes(resource.elements, dragOver.targetId, pos);
      document.backup(HistoryableActionType.Add)
      this.engine.getActions().selectNodes(nodes.rootNodes.map(node => node.id));
    }
  }

  private dropNodes(draggingNodes: DraggingNodesState, dragOver: DragOverOptions, document: IDocument, e: DragStopEvent) {
    if (!draggingNodes) {
      return
    }


    //如果是自由布局
    // if (dragOver.position === RelativePosition.AbsoluteIn) {
    //   document.backup(HistoryableActionType.Move)
    //   for (const nodeId of draggingNodes.nodeIds) {
    //     const node = this.engine.getMonitor().getNode(nodeId)
    //     const meta = node?.meta
    //     if (meta) {
    //       const newMeta = {
    //         ...meta,
    //         props: {
    //           ...meta.props,
    //           left: ((meta?.props?.left as number | undefined) || 0) + (e.originalEvent.clientX - draggingNodes.initialMousePosition.x),
    //           top: ((meta?.props?.top as number | undefined) || 0) + (e.originalEvent.clientY - draggingNodes.initialMousePosition.y),
    //         }
    //       }
    //       document.changeNodeMeta(nodeId, newMeta)
    //     }
    //   }
    //   this.engine.getActions().selectNodes(draggingNodes.nodeIds);
    //   return
    // }

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
    this.engine.getActions().selectNodes(draggingNodes.nodeIds);
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
      // case RelativePosition.AbsoluteIn:
      //   return NodeRelativePosition.Absolute
    }
    return null
  }

  destroy(): void {
    this.unsubscribe()
  }
}

export const DragStopController = (engine: IDesignerEngine) => {
  return new DragStopControllerImpl(engine)
}