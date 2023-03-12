import { MouseMoveEvent } from "shell/events/mouse";
import { numbToPx } from "../utils/numbToPx";
export class GhostWidgetImpl {
    destory() {
        var _this, _this_dragOff, _this1, _this_draggingNodesOff, _this2, _this_draggingResourceOff, _this3, _this_dragStopOff;
        this.unmount();
        (_this_dragOff = (_this = this).dragOff) === null || _this_dragOff === void 0 ? void 0 : _this_dragOff.call(_this);
        (_this_draggingNodesOff = (_this1 = this).draggingNodesOff) === null || _this_draggingNodesOff === void 0 ? void 0 : _this_draggingNodesOff.call(_this1);
        (_this_draggingResourceOff = (_this2 = this).draggingResourceOff) === null || _this_draggingResourceOff === void 0 ? void 0 : _this_draggingResourceOff.call(_this2);
        (_this_dragStopOff = (_this3 = this).dragStopOff) === null || _this_dragStopOff === void 0 ? void 0 : _this_dragStopOff.call(_this3);
    }
    mount() {
        if (this.htmlNode) {
            this.mounted = true;
        }
    }
    unmount() {
        if (this.mounted && this.htmlNode) {
            this.htmlNode.remove();
            this.mounted = false;
        }
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.ghost";
        this.dragOff = null;
        this.dragStopOff = null;
        this.startEvent = null;
        this.title = "undefined";
        this.mounted = false;
        this.handleDraggingNodes = (dragging)=>{
            if (dragging) {
                const node = this.engine.getMonitor().getNode(dragging.nodeIds[0]);
                if (node) {
                    this.title = node.title || node.meta.componentName;
                    this.mounted = true;
                }
            } else {
                this.unmount();
            }
        };
        this.handleDraggingResource = (dragging)=>{
            if (dragging) {
                const resource = this.engine.getResourceManager().getResource(dragging.resource);
                if (resource) {
                    this.title = resource.title || resource.id || "undefined";
                    this.mount();
                }
            } else {
                this.unmount();
            }
        };
        this.handleDrag = (e)=>{
            if (this.mounted && this.engine.getShell().dragging) {
                const container = this.engine.getShell().getContainer();
                if (container && !container.contains(this.htmlNode)) {
                    if (this.htmlNode.parentElement) {
                        this.htmlNode.remove();
                    }
                    container.appendChild(this.htmlNode);
                }
                this.htmlNode.style.display = "block";
                this.htmlNode.innerHTML = this.title;
                this.htmlNode.style.left = numbToPx(e.data.topClientX);
                this.htmlNode.style.top = numbToPx(e.data.topClientY);
            }
        };
        const htmlNode = document.createElement('div');
        htmlNode.style.backgroundColor = "blue";
        htmlNode.style.position = "fixed";
        htmlNode.style.display = "none";
        htmlNode.style.color = '#fff';
        htmlNode.style.fontSize = '13px';
        htmlNode.style.padding = "4px 8px";
        htmlNode.style.pointerEvents = "none";
        htmlNode.style.whiteSpace = "nowrap";
        htmlNode.style.zIndex = "10000";
        this.htmlNode = htmlNode;
        this.shell = engine.getShell();
        if (!engine.getShell().getContainer) {
            console.error("Html 5 driver rootElement is undefined");
        }
        this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes);
        this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource);
        this.dragOff = this.shell.subscribeTo(MouseMoveEvent, this.handleDrag);
    }
}
export const GhostWidget = (engine)=>{
    return new GhostWidgetImpl(engine);
};

//# sourceMappingURL=index.js.map