import { CanvasScrollEvent } from "shell/events";
import { AUX_BACKGROUND_COLOR } from "../consts";
import { numbToPx } from "../utils/numbToPx";
import { getMaxZIndex } from "./getMaxZIndex";
export class ActivedOutlineImpl {
    destory() {
        this.clearLine();
        this.nodeChangeUnsubscribe();
        this.unActive();
        this.unCanvasScroll();
    }
    renderLine(id) {
        this.clearLine();
        const element = this.engine.getShell().getElement(id);
        const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "");
        const containerRect = canvas === null || canvas === void 0 ? void 0 : canvas.getContainerRect();
        if (element && containerRect) {
            const rect = element.getBoundingClientRect();
            const htmlDiv = document.createElement('div');
            htmlDiv.style.backgroundColor = "transparent";
            htmlDiv.style.position = "fixed";
            htmlDiv.style.border = `dashed 1px ${AUX_BACKGROUND_COLOR}`;
            htmlDiv.style.pointerEvents = "none";
            htmlDiv.style.left = numbToPx(rect.left - containerRect.x);
            htmlDiv.style.top = numbToPx(rect.top - containerRect.y);
            htmlDiv.style.height = numbToPx(rect.height - 2);
            htmlDiv.style.width = numbToPx(rect.width - 2);
            htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString();
            canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(htmlDiv);
            this.outline = htmlDiv;
            this.resizeObserver.observe(element);
        }
    }
    clearLine() {
        if (this.outline) {
            this.outline.remove();
        }
        this.outline = null;
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.actived-outline";
        this.outline = null;
        this.currentId = null;
        this.onResize = ()=>{
            this.refresh();
        };
        this.handleActivedChange = (activedId)=>{
            this.resizeObserver.disconnect();
            this.clearLine();
            if (activedId) {
                this.currentId = activedId;
                this.renderLine(activedId);
            }
        };
        this.onViewportChange = ()=>{
            this.refresh();
        };
        this.refresh = ()=>{
            if (!this.currentId) {
                return;
            }
            this.renderLine(this.currentId);
        };
        this.handleOutNode = (e)=>{
            this.clearLine();
            this.currentId = null;
        };
        if (!engine.getShell().getContainer) {
            console.error("Html 5 driver rootElement is undefined");
        }
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh);
        this.unActive = engine.getMonitor().subscribeToActiveChanged(this.handleActivedChange);
        this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh);
    }
}
export const ActivedOutline = (engine)=>{
    return new ActivedOutlineImpl(engine);
};

//# sourceMappingURL=ActivedOutline.js.map