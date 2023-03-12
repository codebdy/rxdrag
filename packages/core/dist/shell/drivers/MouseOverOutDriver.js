import { MouseOverEvent } from "../events/mouse/MouseOverEvent";
import { MouseOutEvent } from "../events/mouse/MouseOutEvent";
export class MouseOverOutDriverImpl {
    attach() {
        var _this_element, _this_element1;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.addEventListener('mouseover', this.onMouseOver);
        (_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : _this_element1.addEventListener('mouseout', this.onMouseOut);
    }
    teardown() {
        var _this_element, _this_element1;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.removeEventListener('mouseover', this.onMouseOver);
        (_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : _this_element1.removeEventListener('mouseout', this.onMouseOut);
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onMouseOver = (e)=>{
            this.dispatcher.dispatch(new MouseOverEvent({
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
        this.onMouseOut = (e)=>{
            this.dispatcher.dispatch(new MouseOutEvent({
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
export const MouseOverOutDriver = (dispatcher, element)=>{
    return new MouseOverOutDriverImpl(dispatcher, element);
};

//# sourceMappingURL=MouseOverOutDriver.js.map