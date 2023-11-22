import { IDesignerEngine, ITreeNode } from "../../../interfaces";
import { DragStopEvent } from "../../../shell/events";
import { HistoryableActionType, IDocument, Unsubscribe } from "../../../interfaces";
import { IPlugin } from "../../../interfaces/plugin";
import { DraggingNodesState } from "../../../reducers/draggingNodes";
import { DraggingResourceState } from "../../../reducers/draggingResource";
import { invariant } from "@rxdrag/shared";

export class FreedomDragStopControllerImpl implements IPlugin {
  name = "default.freedom.drag-stop-controller";

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
    const targetNode = monitor.getNode(rxId || "")
    if (!rxId || !targetNode) {
      console.log("元素置于画布外")
      return
    }

    if (targetNode) {
      const document = this.engine.getNodeDocument(targetNode.id)
      invariant(document, "can not find node document by id:" + targetNode.id)
      if (!document?.id) {
        return
      }
      const draggingResource = monitor.getDraggingResouce()
      if (draggingResource) {
        this.dropResource(draggingResource, targetNode, document, e);
      } else {
        const draggingNodes = monitor.getDraggingNodes()
        if (draggingNodes) {
          this.dropNodes(draggingNodes, document, e);
        }
      }
    }
  }

  private dropResource = (draggingResource: DraggingResourceState, targetNode: ITreeNode, document: IDocument, e: DragStopEvent) => {
    const resource = this.engine.getResourceManager().getResource(draggingResource?.resource || "");
    const freedomContainer = this.getFreedomContainer(targetNode.id)
    //const pos = this.tranPosition(dragOver.position)
    if (freedomContainer && resource) {
      const mousePostion = {
        x: e.originalEvent.clientX,
        y: e.originalEvent.clientY,
      }
      const nodes = document.addNewFreedomNodes(resource.elements, freedomContainer.id, mousePostion);
      document.backup(HistoryableActionType.Add)
      this.engine.getActions().selectNodes(nodes.rootNodes.map(node => node.id));
    } else {
      console.error("not drop in freedom container or resource is emperty")
    }
  }

  private dropNodes(draggingNodes: DraggingNodesState, document: IDocument, e: DragStopEvent) {
    if (!draggingNodes) {
      return
    }

    //如果是自由布局
    document.backup(HistoryableActionType.Move)
    for (const nodeId of draggingNodes.nodeIds) {
      const node = this.engine.getMonitor().getNode(nodeId)
      const meta = node?.meta
      if (meta) {
        const newMeta = {
          ...meta,
          props: {
            ...meta.props,
            left: ((meta?.props?.left as number | undefined) || 0) + (e.originalEvent.clientX - draggingNodes.initialMousePosition.x),
            top: ((meta?.props?.top as number | undefined) || 0) + (e.originalEvent.clientY - draggingNodes.initialMousePosition.y),
          }
        }
        document.changeNodeMeta(nodeId, newMeta)
      }
    }
    this.engine.getActions().selectNodes(draggingNodes.nodeIds);
    return
  }

  destroy(): void {
    this.unsubscribe()
  }

  private getFreedomContainer(id: string): ITreeNode | undefined {
    const node = this.engine.getMonitor().getNode(id)
    const nodeBehavior = this.engine.getBehaviorManager().getNodeBehavior(id)
    if (nodeBehavior?.freedomContainer()) {
      return node || undefined
    }
    if (node?.parentId) {
      return this.getFreedomContainer(node?.parentId)
    }
    return undefined
  }
}

export const FreedomDragStopController = (engine: IDesignerEngine) => {
  return new FreedomDragStopControllerImpl(engine)
}