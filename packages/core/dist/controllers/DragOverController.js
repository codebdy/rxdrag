function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
import { DragMoveEvent } from "shell/events";
import { AcceptType } from "interfaces/action";
import { PositionJudger, RelativePosition } from "../utils/coordinate";
import { isArr } from "utils/types";
export class DragOverControllerImpl {
    handleDragOver(targetId, e) {
        const node = this.engine.getMonitor().getNode(targetId);
        if (node) {
            var _this_dragover, _this_dragover1, _this_dragover2;
            const judger = new PositionJudger(node, this.engine);
            const relativePosition = judger.judgePosition(e.data);
            const dragover = relativePosition ? _objectSpread({
                type: this.canAccept(relativePosition)
            }, relativePosition) : null;
            if (((_this_dragover = this.dragover) === null || _this_dragover === void 0 ? void 0 : _this_dragover.targetId) !== (dragover === null || dragover === void 0 ? void 0 : dragover.targetId) || ((_this_dragover1 = this.dragover) === null || _this_dragover1 === void 0 ? void 0 : _this_dragover1.type) !== (dragover === null || dragover === void 0 ? void 0 : dragover.type) || ((_this_dragover2 = this.dragover) === null || _this_dragover2 === void 0 ? void 0 : _this_dragover2.position) !== (dragover === null || dragover === void 0 ? void 0 : dragover.position)) {
                this.engine.getActions().dragover(dragover);
                this.dragover = dragover;
            }
        } else {
            this.dragover = null;
        }
    }
    canAccept(position) {
        if (this.engine.getMonitor().getState().draggingNodes) {
            return this.canAcceptNodes(position);
        }
        if (this.engine.getMonitor().getState().draggingResource) {
            return this.canAcceptResource(position);
        }
        return AcceptType.Reject;
    }
    canAcceptNodes(position) {
        var _this_engine_getMonitor_getState_draggingNodes;
        const sourceIds = ((_this_engine_getMonitor_getState_draggingNodes = this.engine.getMonitor().getState().draggingNodes) === null || _this_engine_getMonitor_getState_draggingNodes === void 0 ? void 0 : _this_engine_getMonitor_getState_draggingNodes.nodeIds) || [];
        for (const sourceId of sourceIds){
            const node = this.engine.getMonitor().getNode(sourceId);
            if (position.position === RelativePosition.In && node) {
                const beheavior = this.engine.getNodeBehavior(position.targetId);
                if ((beheavior === null || beheavior === void 0 ? void 0 : beheavior.isDroppable()) && !node.meta.locked) {
                    return AcceptType.Accept;
                }
            } else {
                var _this_engine_getMonitor_getNode;
                const parentId = (_this_engine_getMonitor_getNode = this.engine.getMonitor().getNode(position.targetId)) === null || _this_engine_getMonitor_getNode === void 0 ? void 0 : _this_engine_getMonitor_getNode.parentId;
                if (parentId) {
                    const beheavior = this.engine.getNodeBehavior(parentId);
                    if (beheavior === null || beheavior === void 0 ? void 0 : beheavior.isDroppable()) {
                        return AcceptType.Accept;
                    }
                }
            }
        }
        return AcceptType.Reject;
    }
    canAcceptResource(position) {
        var _this_engine_getMonitor_getState_draggingResource;
        const resourceId = (_this_engine_getMonitor_getState_draggingResource = this.engine.getMonitor().getState().draggingResource) === null || _this_engine_getMonitor_getState_draggingResource === void 0 ? void 0 : _this_engine_getMonitor_getState_draggingResource.resource;
        const resource = this.engine.getResourceManager().getResource(resourceId || "");
        if (!resource) {
            console.error("no resource to drop");
            return AcceptType.Reject;
        }
        if (position.position === RelativePosition.In) {
            const beheavior = this.engine.getNodeBehavior(position.targetId);
            const node = this.engine.getMonitor().getNode(position.targetId);
            if ((beheavior === null || beheavior === void 0 ? void 0 : beheavior.isDroppable()) && !(node === null || node === void 0 ? void 0 : node.meta.locked)) {
                return AcceptType.Accept;
            }
            if (isArr(resource.elements)) {
                for (const element of resource.elements){}
            }
        } else {
            var _this_engine_getMonitor_getNode;
            const parentId = (_this_engine_getMonitor_getNode = this.engine.getMonitor().getNode(position.targetId)) === null || _this_engine_getMonitor_getNode === void 0 ? void 0 : _this_engine_getMonitor_getNode.parentId;
            if (parentId) {
                const beheavior = this.engine.getNodeBehavior(parentId);
                if (beheavior === null || beheavior === void 0 ? void 0 : beheavior.isDroppable()) {
                    return AcceptType.Accept;
                }
            }
        }
        return AcceptType.Reject;
    }
    destory() {
        this.unsucribe();
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.drag-over-controller";
        this.dragover = null;
        this.handleDragoverChange = (dragover)=>{
            if (!dragover) {
                this.dragover = null;
            }
        };
        this.handleDragMove = (e)=>{
            const { rxId  } = e.data.targetRx || {};
            if (rxId) {
                if (this.engine.getMonitor().isDragging()) {
                    this.handleDragOver(rxId, e);
                }
            } else if (this.dragover) {
                this.engine.getActions().dragover(null);
                this.dragover = null;
            }
        };
        this.unsucribe = engine.getShell().subscribeTo(DragMoveEvent, this.handleDragMove);
        this.unscribeNodeChange = engine.getMonitor().subscribeToDragOver(this.handleDragoverChange);
    }
}
export const DragOverController = (engine)=>{
    return new DragOverControllerImpl(engine);
};

//# sourceMappingURL=DragOverController.js.map