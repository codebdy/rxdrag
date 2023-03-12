import { NodeRelativePosition } from "../interfaces";
import { DragStopEvent } from "../shell/events";
import { HistoryableActionType } from "../interfaces";
import { AcceptType } from "../interfaces/action";
import { RelativePosition } from "../utils/coordinate";
import { invariant } from "../utils/util-invariant";
export class DragStopControllerImpl {
    drop(e) {
        const monitor = this.engine.getMonitor();
        const dragOver = monitor.getDrageOver();
        if (dragOver) {
            const document = this.engine.getNodeDocument(dragOver.targetId);
            invariant(document, "can not find node document by id:" + dragOver.targetId);
            if (!(document === null || document === void 0 ? void 0 : document.id)) {
                return;
            }
            const draggingResource = monitor.getState().draggingResource;
            if (draggingResource) {
                this.dropResource(draggingResource, dragOver, document);
            } else {
                const draggingNodes = monitor.getState().draggingNodes;
                if (draggingNodes) {
                    this.dropNodes(draggingNodes, dragOver, document);
                }
            }
        }
    }
    dropNodes(draggingNodes, dragOver, document) {
        if (!draggingNodes) {
            return;
        }
        for (const nodeId of draggingNodes.nodeIds || []){
            const nodDocument = this.engine.getNodeDocument(dragOver.targetId);
            const pos = this.tranPosition(dragOver.position);
            if ((nodDocument === null || nodDocument === void 0 ? void 0 : nodDocument.id) === document.id && pos && dragOver.type === AcceptType.Accept) {
                document.moveTo(nodeId, dragOver.targetId, pos);
                document.backup(HistoryableActionType.Move);
            } else {
            //预留实现
            //nodDocument?.getActions().remove(nodeId)
            //document.getActions().addNodeFormOutside()
            }
        }
        this.engine.getActions().selectNodes(draggingNodes.nodeIds, document.id);
    }
    tranPosition(curPos) {
        switch(curPos){
            case RelativePosition.In:
                return NodeRelativePosition.InBottom;
            case RelativePosition.Left:
            case RelativePosition.Top:
                return NodeRelativePosition.Before;
            case RelativePosition.Right:
            case RelativePosition.Bottom:
                return NodeRelativePosition.After;
        }
        return null;
    }
    destory() {
        this.unsucribe();
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.drag-stop-controller";
        this.handleDragStop = (e)=>{
            this.drop(e);
            if (this.engine.getMonitor().getState().draggingResource) {
                this.engine.getActions().endDragResouce();
            } else if (this.engine.getMonitor().getState().draggingNodes) {
                this.engine.getActions().endDragNodes();
            }
            this.engine.getActions().dragover(null);
        };
        this.dropResource = (draggingResource, dragOver, document)=>{
            const resource = this.engine.getResourceManager().getResource((draggingResource === null || draggingResource === void 0 ? void 0 : draggingResource.resource) || "");
            const pos = this.tranPosition(dragOver.position);
            if (resource && pos && dragOver.type === AcceptType.Accept) {
                const nodes = document.addNewNodes(resource.elements, dragOver.targetId, pos);
                document.backup(HistoryableActionType.Add);
                this.engine.getActions().selectNodes(nodes.rootNodes.map((node)=>node.id), document.id);
            }
        };
        this.unsucribe = engine.getShell().subscribeTo(DragStopEvent, this.handleDragStop);
    }
}
export const DragStopController = (engine)=>{
    return new DragStopControllerImpl(engine);
};

//# sourceMappingURL=DragStopController.js.map