import { CanvasScrollEvent } from "../../shell/events";
import { AUX_BACKGROUND_COLOR } from "../consts";
import { numbToPx } from "../utils/numbToPx";
import { getMaxZIndex } from "./getMaxZIndex";
export class SelectedOutlineImpl {
    destory() {
        var _this, _this_draggingNodesOff, _this1, _this_draggingResourceOff;
        this.clear();
        this.unsubscribe();
        this.nodeChangeUnsubscribe();
        this.unCanvasScroll();
        (_this_draggingNodesOff = (_this = this).draggingNodesOff) === null || _this_draggingNodesOff === void 0 ? void 0 : _this_draggingNodesOff.call(_this);
        (_this_draggingResourceOff = (_this1 = this).draggingResourceOff) === null || _this_draggingResourceOff === void 0 ? void 0 : _this_draggingResourceOff.call(_this1);
    }
    clear() {
        for (const id of Object.keys(this.htmls)){
            this.htmls[id].remove();
        }
        this.htmls = {};
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.selected-outline";
        this.htmls = {};
        this.selecteNodes = null;
        this.refreshedFlag = false;
        this.onResize = ()=>{
            this.refresh();
        };
        this.onMutation = (mutations)=>{
            this.refresh();
        };
        this.render = ()=>{
            this.clear();
            for (const id of this.selecteNodes || []){
                const element = this.engine.getShell().getElement(id);
                const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "");
                const containerRect = canvas === null || canvas === void 0 ? void 0 : canvas.getContainerRect();
                if (element && containerRect) {
                    const rect = element.getBoundingClientRect();
                    const htmlDiv = document.createElement('div');
                    htmlDiv.style.backgroundColor = "transparent";
                    htmlDiv.style.position = "fixed";
                    htmlDiv.style.border = `solid 2px ${AUX_BACKGROUND_COLOR}`;
                    htmlDiv.style.pointerEvents = "none";
                    htmlDiv.style.left = numbToPx(rect.left - containerRect.x);
                    htmlDiv.style.top = numbToPx(rect.top - containerRect.y);
                    htmlDiv.style.height = numbToPx(rect.height - 4);
                    htmlDiv.style.width = numbToPx(rect.width - 4);
                    htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString();
                    canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(htmlDiv);
                    this.htmls[id] = htmlDiv;
                    this.resizeObserver.observe(element);
                }
            }
        };
        this.handleSelectChange = (selectedIds)=>{
            this.resizeObserver.disconnect();
            this.selecteNodes = selectedIds;
            this.refresh();
            if ((selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds.length) && !this.engine.getShell().getElement(selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds[0])) {
                setTimeout(()=>{
                    this.refresh();
                }, 100);
            }
        };
        this.handleDraggingNodes = (dragging)=>{
            this.hideWhenDragging(!!dragging);
        };
        this.handleDraggingResource = (dragging)=>{
            this.hideWhenDragging(!!dragging);
        };
        this.hideWhenDragging = (dragging)=>{
            if (dragging) {
                for (const key of Object.keys(this.htmls)){
                    this.htmls[key].style.display = "none";
                }
            } else {
                for (const key of Object.keys(this.htmls)){
                    this.htmls[key].style.display = "";
                }
            }
        };
        this.onViewportChange = ()=>{
            this.refresh();
        };
        this.refresh = ()=>{
            this.refreshedFlag = true;
            setTimeout(()=>{
                if (this.refreshedFlag) {
                    this.render();
                    this.refreshedFlag = false;
                }
            }, 20);
        };
        if (!engine.getShell().getContainer) {
            console.error("Html 5 driver rootElement is undefined");
        }
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.unsubscribe = engine.getMonitor().subscribeToSelectChange(this.handleSelectChange);
        this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh);
        this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh);
        this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes);
        this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource);
    }
}
export const SelectedOutline = (engine)=>{
    return new SelectedOutlineImpl(engine);
};

//# sourceMappingURL=SelectedOutline.js.map