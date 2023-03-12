import { DragStartEvent } from "shell/events/mouse";
import { NodeType } from "interfaces";
import { getOffset, getPosition } from "shell/utils/xycoord";
export class StartDragControllerImpl {
    destory() {
        this.unsucribe();
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.start-drag-controller";
        this.handleDragStart = (e)=>{
            var _e_data_targetRx, _e_data_targetRx1;
            if (((_e_data_targetRx = e.data.targetRx) === null || _e_data_targetRx === void 0 ? void 0 : _e_data_targetRx.nodeType) === NodeType.Resource) {
                var _e_data_targetRx2, _e_data_targetRx3;
                ((_e_data_targetRx2 = e.data.targetRx) === null || _e_data_targetRx2 === void 0 ? void 0 : _e_data_targetRx2.rxId) && this.engine.getActions().startDragResource({
                    initialMousePosition: getPosition(e.data),
                    offset: getOffset(e.data),
                    resourceId: (_e_data_targetRx3 = e.data.targetRx) === null || _e_data_targetRx3 === void 0 ? void 0 : _e_data_targetRx3.rxId,
                    mousePosition: getPosition(e.data)
                });
            } else if (((_e_data_targetRx1 = e.data.targetRx) === null || _e_data_targetRx1 === void 0 ? void 0 : _e_data_targetRx1.nodeType) === NodeType.Node) {
                var _e_data_targetRx4;
                const nodeId = (_e_data_targetRx4 = e.data.targetRx) === null || _e_data_targetRx4 === void 0 ? void 0 : _e_data_targetRx4.rxId;
                if (nodeId) {
                    const beheavior = this.engine.getNodeBehavior(nodeId);
                    const node = this.engine.getMonitor().getNode(nodeId);
                    if (beheavior.isDraggable() && !(node === null || node === void 0 ? void 0 : node.isSlot)) {
                        this.engine.getActions().startDragNodes({
                            initialMousePosition: getPosition(e.data),
                            offset: getOffset(e.data),
                            nodeIds: [
                                nodeId
                            ],
                            mousePosition: getPosition(e.data)
                        });
                    }
                }
            }
        };
        this.unsucribe = engine.getShell().subscribeTo(DragStartEvent, this.handleDragStart);
    }
}
export const StartDragController = (engine)=>{
    return new StartDragControllerImpl(engine);
};

//# sourceMappingURL=StartDragController.js.map