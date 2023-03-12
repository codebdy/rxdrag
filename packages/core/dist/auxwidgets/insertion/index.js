import { numbToPx } from "../utils/numbToPx";
import { AcceptType } from "../../interfaces/action";
import { addZIndex } from "../../utils/add-zindex";
import { RelativePosition } from "../../utils/coordinate";
export class InsertionCursorImpl {
    destory() {
        this.detachDragover();
        this.htmlCoverNode.remove();
        this.htmlCursorNode.remove();
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.insertion";
        this.handleDragOver = (dragover)=>{
            if (dragover) {
                if ((dragover === null || dragover === void 0 ? void 0 : dragover.position) === "in") {
                    var _this_shell_getContainer;
                    if (!((_this_shell_getContainer = this.shell.getContainer()) === null || _this_shell_getContainer === void 0 ? void 0 : _this_shell_getContainer.contains(this.htmlCoverNode))) {
                        var _this_shell_getContainer1;
                        (_this_shell_getContainer1 = this.shell.getContainer()) === null || _this_shell_getContainer1 === void 0 ? void 0 : _this_shell_getContainer1.appendChild(this.htmlCoverNode);
                    }
                    this.renderCover(dragover);
                    this.htmlCursorNode.style.display = "none";
                } else {
                    var _this_shell_getContainer2;
                    if (!((_this_shell_getContainer2 = this.shell.getContainer()) === null || _this_shell_getContainer2 === void 0 ? void 0 : _this_shell_getContainer2.contains(this.htmlCursorNode))) {
                        var _this_shell_getContainer3;
                        (_this_shell_getContainer3 = this.shell.getContainer()) === null || _this_shell_getContainer3 === void 0 ? void 0 : _this_shell_getContainer3.appendChild(this.htmlCursorNode);
                    }
                    this.renderCusor(dragover);
                    this.htmlCoverNode.style.display = "none";
                }
            } else {
                this.htmlCursorNode.style.display = "none";
                this.htmlCoverNode.style.display = "none";
            }
        };
        this.renderCover = (dragover)=>{
            const rect = this.engine.getShell().getTopRect((dragover === null || dragover === void 0 ? void 0 : dragover.targetId) || "");
            if (rect) {
                if ((dragover === null || dragover === void 0 ? void 0 : dragover.type) === AcceptType.Reject) {
                    this.htmlCoverNode.style.backgroundColor = "red";
                } else {
                    this.htmlCoverNode.style.backgroundColor = "blue";
                }
                this.htmlCoverNode.style.display = "block";
                this.htmlCursorNode.style.zIndex = addZIndex(window.getComputedStyle(this.htmlCursorNode).zIndex, 1);
                this.htmlCoverNode.style.top = numbToPx(rect.y);
                this.htmlCoverNode.style.left = numbToPx(rect.x);
                this.htmlCoverNode.style.width = numbToPx(rect.width);
                this.htmlCoverNode.style.height = numbToPx(rect.height);
            }
        };
        this.renderCusor = (dragover)=>{
            const htmlDiv = this.engine.getShell().getElement((dragover === null || dragover === void 0 ? void 0 : dragover.targetId) || "");
            const rect = this.engine.getShell().getTopRect((dragover === null || dragover === void 0 ? void 0 : dragover.targetId) || "");
            if (rect && htmlDiv && dragover) {
                if (dragover.type === AcceptType.Accept) {
                    this.htmlCursorNode.style.backgroundColor = "blue";
                } else {
                    this.htmlCursorNode.style.backgroundColor = "red";
                }
                this.htmlCursorNode.style.display = "block";
                this.htmlCursorNode.style.zIndex = "2"; //addZIndex(window.getComputedStyle(htmlDiv).zIndex, 2)
                if (dragover.position === RelativePosition.Bottom) {
                    this.htmlCursorNode.style.top = numbToPx(rect.y + rect.height);
                    this.htmlCursorNode.style.left = numbToPx(rect.x);
                    this.htmlCursorNode.style.width = numbToPx(rect.width);
                    this.htmlCursorNode.style.height = "2px";
                }
                if (dragover.position === RelativePosition.Top) {
                    this.htmlCursorNode.style.top = numbToPx(rect.y);
                    this.htmlCursorNode.style.left = numbToPx(rect.x);
                    this.htmlCursorNode.style.width = numbToPx(rect.width);
                    this.htmlCursorNode.style.height = "2px";
                }
                if (dragover.position === RelativePosition.Left) {
                    this.htmlCursorNode.style.top = numbToPx(rect.y);
                    this.htmlCursorNode.style.left = numbToPx(rect.x);
                    this.htmlCursorNode.style.width = "2px";
                    this.htmlCursorNode.style.height = numbToPx(rect.height);
                }
                if (dragover.position === RelativePosition.Right) {
                    this.htmlCursorNode.style.top = numbToPx(rect.y);
                    this.htmlCursorNode.style.left = numbToPx(rect.x + rect.width);
                    this.htmlCursorNode.style.width = "2px";
                    this.htmlCursorNode.style.height = numbToPx(rect.height);
                }
            }
        };
        if (!engine.getShell().getContainer) {
            console.error("Html 5 driver rootElement is undefined");
        }
        this.shell = engine.getShell();
        const htmlNode = document.createElement('div');
        htmlNode.style.position = "fixed";
        htmlNode.style.display = "none";
        htmlNode.style.pointerEvents = "none";
        htmlNode.style.opacity = "0.1";
        this.htmlCoverNode = htmlNode;
        const htmlCursorNode = document.createElement('div');
        htmlCursorNode.style.position = "fixed";
        htmlCursorNode.style.display = "none";
        htmlCursorNode.style.pointerEvents = "none";
        this.htmlCursorNode = htmlCursorNode;
        this.detachDragover = this.engine.getMonitor().subscribeToDragOver(this.handleDragOver);
    }
}
export const InsertionCursor = (engine)=>{
    return new InsertionCursorImpl(engine);
};

//# sourceMappingURL=index.js.map