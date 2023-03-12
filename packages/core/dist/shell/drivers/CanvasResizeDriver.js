import { isHTMLElement } from "utils/html-node";
import { CanvasResizeEvent } from "../events";
export class CanvasResizeDriverImpl {
    attach() {
        if (isHTMLElement(this.element)) {
            this.resizeObserver.observe(this.element);
        }
        this.win().addEventListener('resize', this.onResize);
    }
    teardown() {
        if (isHTMLElement(this.element)) {
            this.resizeObserver.unobserve(this.element);
        }
        this.resizeObserver.disconnect();
        this.win().removeEventListener('resize', this.onResize);
    }
    win() {
        var _this_element, _this_element1, _this_element_ownerDocument;
        return ((_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.defaultView) || ((_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : (_this_element_ownerDocument = _this_element1.ownerDocument) === null || _this_element_ownerDocument === void 0 ? void 0 : _this_element_ownerDocument.defaultView) || window;
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onResize = ()=>{
            this.dispatcher.dispatch(new CanvasResizeEvent());
        };
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.attach();
    }
}
export const CanvasResizeDriver = (dispatcher, element)=>{
    return new CanvasResizeDriverImpl(dispatcher, element);
};

//# sourceMappingURL=CanvasResizeDriver.js.map