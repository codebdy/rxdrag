import { NodeType } from "core";
import { MouseClickEvent } from "shell/events";
export class SelectionControllerImpl {
    destory() {
        this.unsucribe();
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.selection-controller";
        this.handleNodeClick = (e)=>{
            const monitor = this.engine.getMonitor();
            const { rxId , nodeType  } = e.data.targetRx || {};
            if (rxId && nodeType === NodeType.Node) {
                const documentId = monitor.getNodeDocumentId(rxId);
                if (!documentId) {
                    return;
                }
                const selectedNodes = monitor.getDocumentSelectedIds(documentId);
                if (selectedNodes && selectedNodes.length === 1 && selectedNodes[0] === rxId) {
                    return;
                }
                this.engine.getActions().selectNodes([
                    rxId
                ], documentId);
            }
        };
        this.unsucribe = this.engine.getShell().subscribeTo(MouseClickEvent, this.handleNodeClick);
    }
}
export const SelectionController = (engine)=>{
    return new SelectionControllerImpl(engine);
};

//# sourceMappingURL=SelectionController.js.map