import { CanvasScrollEvent } from "shell/events";
import { numbToPx } from "../utils/numbToPx";
import { CloneButton } from "./controls/CloneButton";
import { DeleteButton } from "./controls/DeleteButton";
import { ComponentSelector } from "./controls/Selector";
import { MoveButton } from "./controls/MoveButton";
import { LockButton } from "./controls/LockButton";
import { getMaxZIndex } from "../outlines/getMaxZIndex";
export class ToolbarImpl {
    replaceControl(control) {
        if (this.controls.find((ctrl)=>ctrl.name === control.name)) {
            this.controls = this.controls.map((ctrl)=>ctrl.name === control.name ? control : ctrl);
        } else {
            throw new Error("Can not find old control by name:" + control.name);
        }
    }
    addControl(control, index) {
        if (index !== undefined && index >= this.controls.length) {
            throw new Error("index is too big");
        }
        if (index === undefined) {
            this.controls.push(control);
        } else {
            this.controls.splice(index, 0, control);
        }
    }
    render() {
        const node = this.engine.getMonitor().getCurrentNode();
        const divEl = this.htmlElement;
        const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId((node === null || node === void 0 ? void 0 : node.id) || "") || "");
        divEl && (canvas === null || canvas === void 0 ? void 0 : canvas.contains(divEl)) && (canvas === null || canvas === void 0 ? void 0 : canvas.removeChild(divEl));
        this.htmlElement = null;
        if (!node) {
            if (divEl) {
                divEl.remove();
            }
            return;
        }
        const element = node.id && this.engine.getShell().getElement(node.id);
        const positionLimit = this.positionLimit(node.documentId);
        const containerRect = canvas === null || canvas === void 0 ? void 0 : canvas.getContainerRect();
        if (element && positionLimit && containerRect) {
            const rect = element.getBoundingClientRect();
            const htmlDiv = document.createElement('div');
            htmlDiv.style.display = "flex";
            htmlDiv.style.alignItems = "center";
            for (const ctrl of this.controls){
                const ctrlHtmlEl = ctrl.onRender(node);
                if (ctrlHtmlEl && ctrl.selector(node, this.engine)) {
                    htmlDiv.appendChild(ctrlHtmlEl);
                }
            }
            const barHeight = htmlDiv.getBoundingClientRect().height || 16;
            let top = rect.y - barHeight - 6;
            if (top < positionLimit.top) {
                top = rect.y + rect.height + 2;
                if (top > positionLimit.bottom - barHeight) {
                    top = rect.y + 2;
                }
            }
            const right = containerRect.width - (rect.x - containerRect.x) - rect.width;
            htmlDiv.style.position = "fixed";
            htmlDiv.style.right = numbToPx(right);
            htmlDiv.style.top = numbToPx(top - containerRect.y);
            htmlDiv.style.fontSize = "12px";
            htmlDiv.style.padding = "0px";
            htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString();
            htmlDiv.style.userSelect = "none";
            canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(htmlDiv);
            const divRect = htmlDiv.getBoundingClientRect();
            if (rect.x + rect.width - divRect.width < positionLimit.left) {
                htmlDiv.style.right = "auto";
                htmlDiv.style.left = numbToPx(positionLimit.left);
            }
            this.htmlElement = htmlDiv;
            this.resizeObserver.observe(element);
        }
    }
    destory() {
        var _this, _this_draggingNodesOff, _this1, _this_draggingResourceOff;
        this.clear();
        this.nodeChangeUnsubscribe();
        this.unsubscribe();
        this.unsubscribeSelect();
        this.unCanvasScroll();
        (_this_draggingNodesOff = (_this = this).draggingNodesOff) === null || _this_draggingNodesOff === void 0 ? void 0 : _this_draggingNodesOff.call(_this);
        (_this_draggingResourceOff = (_this1 = this).draggingResourceOff) === null || _this_draggingResourceOff === void 0 ? void 0 : _this_draggingResourceOff.call(_this1);
    }
    positionLimit(documentId) {
        var _this_engine_getShell_getCanvas;
        const bodyRect = document.body.getBoundingClientRect();
        const rect = (_this_engine_getShell_getCanvas = this.engine.getShell().getCanvas(documentId)) === null || _this_engine_getShell_getCanvas === void 0 ? void 0 : _this_engine_getShell_getCanvas.getContainerRect();
        if (!rect) {
            return null;
        }
        return {
            right: bodyRect.width - rect.x - rect.width,
            left: rect.x,
            top: rect.y,
            bottom: rect.y + rect.height
        };
    }
    clear() {
        for (const ctrl of this.controls){
            ctrl.teardown();
        }
        if (this.htmlElement) {
            this.htmlElement.remove();
        }
        this.htmlElement = null;
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.toolbar";
        this.controls = [];
        this.htmlElement = null;
        this.refreshedFlag = false;
        this.onResize = ()=>{
            this.refresh();
        };
        this.//临时措施，跟踪popup变化
        handleSelectChange = (selectedIds)=>{
            this.refresh();
            if ((selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds.length) && !this.engine.getShell().getElement(selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds[0])) {
                setTimeout(()=>{
                    this.refresh();
                }, 100);
            }
        };
        this.currentNodeChanged = (node)=>{
            this.resizeObserver.disconnect();
            this.refresh();
            if (node && !this.engine.getShell().getElement(node.id)) {
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
                if (this.htmlElement) {
                    this.htmlElement.style.display = "none";
                }
            } else {
                if (this.htmlElement) {
                    this.htmlElement.style.display = "flex";
                }
            }
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
        this.addControl(new ComponentSelector(engine));
        this.addControl(new LockButton(engine));
        this.addControl(new CloneButton(engine));
        this.addControl(new MoveButton(engine));
        this.addControl(new DeleteButton(engine));
        this.unsubscribe = engine.getMonitor().subscribeToCurrentNodeChanged(this.currentNodeChanged);
        this.unsubscribeSelect = engine.getMonitor().subscribeToSelectChange(this.handleSelectChange);
        this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh);
        this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh);
        this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes);
        this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource);
    }
}
export const Toolbar = (engine)=>{
    return new ToolbarImpl(engine);
};

//# sourceMappingURL=index.js.map