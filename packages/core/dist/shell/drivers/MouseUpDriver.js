import { MouseUpEvent } from "../events/mouse/MouseUpEvent";
export class MouseUpDriverImpl {
    attach() {
        var _this_element;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.addEventListener('mouseup', this.onMouseUp);
    }
    teardown() {
        var _this_element;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.removeEventListener('mouseup', this.onMouseUp);
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onMouseUp = (e)=>{
            this.dispatcher.dispatch(new MouseUpEvent({
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
        };
        this.attach();
    }
}
export const MouseUpDriver = (dispatcher, element)=>{
    return new MouseUpDriverImpl(dispatcher, element);
};

//# sourceMappingURL=MouseUpDriver.js.map