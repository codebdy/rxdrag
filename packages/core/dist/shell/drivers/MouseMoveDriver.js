import { MouseMoveEvent } from "shell/events/mouse";
export class MouseMoveDriverImpl {
    attach() {
        var _this_element;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.addEventListener('mousemove', this.onMouseMove);
    }
    teardown() {
        var _this_element;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.removeEventListener('mousemove', this.onMouseMove);
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onMouseMove = (e)=>{
            this.dispatcher.dispatch(new MouseMoveEvent({
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
export const MouseMoveDriver = (dispatcher, element)=>{
    return new MouseMoveDriverImpl(dispatcher, element);
};

//# sourceMappingURL=MouseMoveDriver.js.map