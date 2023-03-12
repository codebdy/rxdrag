export class DraggedAttenuatorImpl {
    destory() {
        var _this, _this_draggingNodesOff;
        (_this_draggingNodesOff = (_this = this).draggingNodesOff) === null || _this_draggingNodesOff === void 0 ? void 0 : _this_draggingNodesOff.call(_this);
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.dragged-attenuator";
        this.weakedElements = [];
        this.startEvent = null;
        this.title = "undefined";
        this.mounted = false;
        this.handleDraggingNodes = (dragging)=>{
            if (dragging) {
                let styleAdded = false;
                for (const draggingId of dragging.nodeIds){
                    const element = this.shell.getElement(draggingId);
                    if (element) {
                        if (!styleAdded) {
                            const doc = (element === null || element === void 0 ? void 0 : element.ownerDocument) || document;
                            const style = doc.createElement('style');
                            style.innerHTML = '.rx-dragging {  opacity: 0.4; pointer-events: none; }';
                            this.htmlStyle = style;
                            const node = this.engine.getMonitor().getNode(draggingId);
                            if (node) {
                                const canvas = this.shell.getCanvas(node === null || node === void 0 ? void 0 : node.documentId);
                                canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(this.htmlStyle);
                                styleAdded = true;
                            }
                        }
                        element.classList.add("rx-dragging");
                        this.weakedElements.push(element);
                    }
                }
            } else {
                if (this.htmlStyle) {
                    this.htmlStyle.remove();
                }
                for (const element of this.weakedElements){
                    element.classList.remove("rx-dragging");
                }
                this.weakedElements = [];
                this.htmlStyle = undefined;
            }
        };
        this.shell = engine.getShell();
        this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes);
    }
}
export const DraggedAttenuator = (engine)=>{
    return new DraggedAttenuatorImpl(engine);
};

//# sourceMappingURL=index.js.map