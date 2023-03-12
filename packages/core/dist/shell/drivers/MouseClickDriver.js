import { MouseClickEvent, MouseDoubleClickEvent } from "shell/events/mouse";
export class MouseClickDriverImpl {
    attach() {
        var _this_element, _this_element1;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.addEventListener('click', this.onMouseClick);
        (_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : _this_element1.addEventListener('dblclick', this.onMouseDoubleClick);
    }
    teardown() {
        var _this_element, _this_element1;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.removeEventListener('click', this.onMouseClick);
        (_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : _this_element1.removeEventListener('dblclick', this.onMouseDoubleClick);
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onMouseClick = (e)=>{
            this.dispatcher.dispatch(new MouseClickEvent({
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
        this.onMouseDoubleClick = (e)=>{
            this.dispatcher.dispatch(new MouseDoubleClickEvent({
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
export const MouseClickDriver = (dispatcher, element)=>{
    return new MouseClickDriverImpl(dispatcher, element);
};

//# sourceMappingURL=MouseClickDriver.js.map