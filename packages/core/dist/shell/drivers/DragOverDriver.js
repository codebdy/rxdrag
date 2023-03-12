import { DragMoveEvent } from "../events";
export class DragOverDriverImpl {
    teardown() {
        this.htmlElement.removeEventListener('dragover', this.onMouseMove);
        this.htmlElement.removeEventListener('mousemove', this.onMouseMove);
    }
    constructor(shell, htmlElement){
        this.shell = shell;
        this.htmlElement = htmlElement;
        this.moveEvent = null;
        this.onMouseMove = (e)=>{
            var _this_moveEvent, _this_moveEvent1;
            if (e.clientX === ((_this_moveEvent = this.moveEvent) === null || _this_moveEvent === void 0 ? void 0 : _this_moveEvent.clientX) && e.clientY === ((_this_moveEvent1 = this.moveEvent) === null || _this_moveEvent1 === void 0 ? void 0 : _this_moveEvent1.clientY)) {
                return;
            }
            if (!this.shell.dragging) {
                return;
            }
            this.shell.dispatch(new DragMoveEvent({
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                target: e.target,
                view: e.view,
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey
            }, e));
            this.moveEvent = e;
        };
        this.htmlElement.addEventListener('dragover', this.onMouseMove);
        this.htmlElement.addEventListener('mousemove', this.onMouseMove);
    }
}
export const DragOverDriver = (shell, htmlElement)=>{
    return new DragOverDriverImpl(shell, htmlElement);
};

//# sourceMappingURL=DragOverDriver.js.map