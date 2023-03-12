import { DragStartEvent, DragStopEvent } from "shell/events/mouse";
export class DragDropDriverImpl {
    attachEvent(type, listener) {
        var _this_htmlElement;
        (_this_htmlElement = this.htmlElement) === null || _this_htmlElement === void 0 ? void 0 : _this_htmlElement.addEventListener(type, listener);
    }
    detachEvent(type, listener) {
        var _this_htmlElement;
        (_this_htmlElement = this.htmlElement) === null || _this_htmlElement === void 0 ? void 0 : _this_htmlElement.removeEventListener(type, listener);
    }
    teardown() {
        var _this_documentEl;
        this.detachEvent('mousedown', this.onMouseDown);
        this.detachEvent('dragstart', this.onStartDrag);
        this.detachEvent('dragend', this.onMouseUp);
        (_this_documentEl = this.documentEl()) === null || _this_documentEl === void 0 ? void 0 : _this_documentEl.removeEventListener('mouseup', this.onMouseUp);
        this.detachEvent('mousemove', this.onDistanceChange);
        this.detachEvent('contextmenu', this.onContextMenuWhileDragging);
    }
    documentEl() {
        var _this_htmlElement;
        return ((_this_htmlElement = this.htmlElement) === null || _this_htmlElement === void 0 ? void 0 : _this_htmlElement.ownerDocument) || this.htmlElement;
    }
    constructor(shell, htmlElement){
        var _this_documentEl;
        this.shell = shell;
        this.htmlElement = htmlElement;
        this.onMouseDownAt = 0;
        this.startEvent = null;
        this.onMouseDown = (e)=>{
            var _e_target, _e_target_closest;
            if (e.button !== 0 || e.ctrlKey || e.metaKey) {
                return;
            }
            if (e.target['isContentEditable'] || e.target['contentEditable'] === 'true') {
                return true;
            }
            if ((_e_target = e.target) === null || _e_target === void 0 ? void 0 : (_e_target_closest = _e_target['closest']) === null || _e_target_closest === void 0 ? void 0 : _e_target_closest.call(_e_target, '.monaco-editor')) return;
            this.startEvent = e;
            this.shell.dragging = false;
            this.onMouseDownAt = Date.now();
            this.attachEvent('mousemove', this.onDistanceChange);
        };
        this.onMouseUp = (e)=>{
            if (this.shell.dragging) {
                this.shell.dispatch(new DragStopEvent({
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
            }
            this.detachEvent('mousemove', this.onDistanceChange);
            this.shell.dragging = false;
        };
        this.onContextMenuWhileDragging = (e)=>{
            e.preventDefault();
        };
        this.onStartDrag = (e)=>{
            var _this_startEvent_path;
            if (this.shell.dragging) return;
            this.startEvent = this.startEvent || e;
            this.attachEvent('contextmenu', this.onContextMenuWhileDragging);
            this.shell.dispatch(new DragStartEvent({
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                clientX: this.startEvent.clientX,
                clientY: this.startEvent.clientY,
                pageX: this.startEvent.pageX,
                pageY: this.startEvent.pageY,
                target: ((_this_startEvent_path = this.startEvent.path) === null || _this_startEvent_path === void 0 ? void 0 : _this_startEvent_path[0]) || this.startEvent.target,
                view: this.startEvent.view,
                altKey: this.startEvent.altKey,
                ctrlKey: this.startEvent.ctrlKey,
                shiftKey: this.startEvent.shiftKey
            }, e));
            this.shell.dragging = true;
        };
        this.onDistanceChange = (e)=>{
            if (!this.startEvent) {
                return;
            }
            const distance = Math.sqrt(Math.pow(e.pageX - this.startEvent.pageX, 2) + Math.pow(e.pageY - this.startEvent.pageY, 2));
            const timeDelta = Date.now() - this.onMouseDownAt;
            if (timeDelta > 10 && e !== this.startEvent && distance > 4) {
                this.detachEvent('mousemove', this.onDistanceChange);
                this.onStartDrag(e);
            }
        };
        this.attachEvent("mousedown", this.onMouseDown);
        this.attachEvent('dragend', this.onMouseUp);
        this.attachEvent('dragstart', this.onStartDrag);
        (_this_documentEl = this.documentEl()) === null || _this_documentEl === void 0 ? void 0 : _this_documentEl.addEventListener('mouseup', this.onMouseUp);
    }
}
export const DragDropDriver = (shell, htmlElement)=>{
    return new DragDropDriverImpl(shell, htmlElement);
};

//# sourceMappingURL=DragDropDriver.js.map