import { createAuxProps, NodeType, RXID_ATTR_NAME } from "../../../interfaces";
import { DragStartEvent } from "../../../shell/events";
import { getOffset, getPosition } from "../../../shell/utils/xycoord";
import { AbstractButton } from "./AbstractButton";
export class MoveButton extends AbstractButton {
    onRender(node) {
        const behavior = this.engine.getNodeBehavior(node.id);
        if (!behavior.isDraggable() || node.isSlot) {
            this.teardown();
            return null;
        }
        this.unsucribe = this.engine.getShell().subscribeTo(DragStartEvent, this.handleDragStart);
        const htmlEl = this.createHtmlElement();
        htmlEl.innerHTML = `
    <svg style="width:16px;height:16px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M13,11H18L16.5,9.5L17.92,8.08L21.84,12L17.92,15.92L16.5,14.5L18,13H13V18L14.5,16.5L15.92,17.92L12,21.84L8.08,17.92L9.5,16.5L11,18V13H6L7.5,14.5L6.08,15.92L2.16,12L6.08,8.08L7.5,9.5L6,11H11V6L9.5,7.5L8.08,6.08L12,2.16L15.92,6.08L14.5,7.5L13,6V11Z" />
    </svg>
    `;
        htmlEl.style.cursor = "move";
        for (const key of Object.keys(this.rxProps)){
            htmlEl.setAttribute(key, this.rxProps[key]);
        }
        return htmlEl;
    }
    teardown() {
        var _this, _this_unsucribe;
        (_this_unsucribe = (_this = this).unsucribe) === null || _this_unsucribe === void 0 ? void 0 : _this_unsucribe.call(_this);
        super.teardown();
    }
    constructor(engine){
        super("default.move-button", engine);
        this.engine = engine;
        this.handleDragStart = (e)=>{
            var _e_data_targetRx, _e_data_targetRx1;
            if (((_e_data_targetRx = e.data.targetRx) === null || _e_data_targetRx === void 0 ? void 0 : _e_data_targetRx.nodeType) === NodeType.AuxWidget && ((_e_data_targetRx1 = e.data.targetRx) === null || _e_data_targetRx1 === void 0 ? void 0 : _e_data_targetRx1.rxId) === this.rxProps[RXID_ATTR_NAME]) {
                var _this_engine_getMonitor_getCurrentNode;
                const nodeId = (_this_engine_getMonitor_getCurrentNode = this.engine.getMonitor().getCurrentNode()) === null || _this_engine_getMonitor_getCurrentNode === void 0 ? void 0 : _this_engine_getMonitor_getCurrentNode.id;
                if (nodeId) {
                    const beheavior = this.engine.getNodeBehavior(nodeId);
                    if (beheavior.isDraggable()) {
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
        this.rxProps = createAuxProps();
    }
}

//# sourceMappingURL=MoveButton.js.map