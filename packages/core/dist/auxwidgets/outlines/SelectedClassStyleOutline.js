import { CanvasResizeEvent, CanvasScrollEvent } from "../../shell/events";
import { AddDecoratorEvent } from "../../shell/events/canvas/AddDecoratorEvent";
import { RemoveDecoratorEvent } from "../../shell/events/canvas/RemoveDecoratorEvent";
import { AUX_BACKGROUND_COLOR } from "../consts";
//这个不好用，有的地方会显示不全，废弃
export class SelectedClassStyleOutlineImpl {
    destory() {
        var _this, _this_draggingNodesOff, _this1, _this_draggingResourceOff, _this2, _this_addDecoratorOff, _this3, _this_removeDecoratorOff;
        this.clear();
        this.unsubscribe();
        this.nodeChangeUnsubscribe();
        this.unCanvasScroll();
        this.unCanvasResize();
        this.unThemeModeChange();
        (_this_draggingNodesOff = (_this = this).draggingNodesOff) === null || _this_draggingNodesOff === void 0 ? void 0 : _this_draggingNodesOff.call(_this);
        (_this_draggingResourceOff = (_this1 = this).draggingResourceOff) === null || _this_draggingResourceOff === void 0 ? void 0 : _this_draggingResourceOff.call(_this1);
        (_this_addDecoratorOff = (_this2 = this).addDecoratorOff) === null || _this_addDecoratorOff === void 0 ? void 0 : _this_addDecoratorOff.call(_this2);
        (_this_removeDecoratorOff = (_this3 = this).removeDecoratorOff) === null || _this_removeDecoratorOff === void 0 ? void 0 : _this_removeDecoratorOff.call(_this3);
    }
    clear() {
        for (const id of this.selecteNodes || []){
            const element = this.engine.getShell().getElement(id);
            element === null || element === void 0 ? void 0 : element.classList.remove("rx-node-outline");
        }
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.selected-outline";
        this.selecteNodes = null;
        this.refreshedFlag = false;
        this.listenSelectChange = (selectedIds)=>{
            this.clear();
            for (const id of selectedIds || []){
                const element = this.engine.getShell().getElement(id);
                const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "");
                if (!(canvas === null || canvas === void 0 ? void 0 : canvas.contains(this.htmlStyle))) {
                    canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(this.htmlStyle);
                }
                if (element) {
                    element.classList.add('rx-node-outline');
                }
            }
            this.selecteNodes = selectedIds;
        };
        this.handleDraggingNodes = (dragging)=>{
            this.hideWhenDragging(!!dragging);
        };
        this.handleDraggingResource = (dragging)=>{
            this.hideWhenDragging(!!dragging);
        };
        this.hideWhenDragging = (dragging)=>{
            if (dragging) {
                for (const id of this.selecteNodes || []){
                    const element = this.engine.getShell().getElement(id);
                    element === null || element === void 0 ? void 0 : element.classList.remove("rx-node-outline");
                }
            } else {
                for (const id of this.selecteNodes || []){
                    const element = this.engine.getShell().getElement(id);
                    element === null || element === void 0 ? void 0 : element.classList.add("rx-node-outline");
                }
            }
        };
        this.onViewportChange = ()=>{
            this.refresh();
        };
        this.handleThemeChange = ()=>{
            setTimeout(()=>{
                this.listenSelectChange(this.selecteNodes);
            }, 200);
        };
        this.refresh = ()=>{
            this.refreshedFlag = true;
            setTimeout(()=>{
                if (this.refreshedFlag) {
                    this.listenSelectChange(this.selecteNodes);
                    this.refreshedFlag = false;
                }
            }, 20);
        };
        if (!engine.getShell().getContainer) {
            console.error("Html 5 driver rootElement is undefined");
        }
        const style = document.createElement('style');
        style.innerHTML = `.rx-node-outline {  outline:solid 2px ${AUX_BACKGROUND_COLOR}; z-index:1;}`;
        this.htmlStyle = style;
        //this.unmountUnsubscribe = this.engine.getShell().subscribeTo(NodeUnmountedEvent, this.handleNodeMounted)
        this.unsubscribe = engine.getMonitor().subscribeToSelectChange(this.listenSelectChange);
        this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh);
        this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh);
        this.unCanvasResize = this.engine.getShell().subscribeTo(CanvasResizeEvent, this.refresh);
        this.unThemeModeChange = engine.getMonitor().subscribeToThemeModeChange(this.handleThemeChange);
        //this.unNodeMounted = this.engine.getShell().subscribeTo(NodeMountedEvent, this.handleNodeMounted)
        this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes);
        this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource);
        this.addDecoratorOff = this.engine.getShell().subscribeTo(AddDecoratorEvent, this.refresh);
        this.removeDecoratorOff = this.engine.getShell().subscribeTo(RemoveDecoratorEvent, this.refresh);
    }
}
export const SelectedClassStyleOutline = (engine)=>{
    return new SelectedClassStyleOutlineImpl(engine);
};

//# sourceMappingURL=SelectedClassStyleOutline.js.map