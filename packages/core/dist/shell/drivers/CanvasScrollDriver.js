import { CanvasScrollEvent } from '../events';
export class CanvasScrollDriverImpl {
    attach() {
        this.element.addEventListener('scroll', this.onScroll);
        this.win().addEventListener('scroll', this.onScroll);
    }
    teardown() {
        this.element.removeEventListener('scroll', this.onScroll);
        this.win().removeEventListener('scroll', this.onScroll);
    }
    win() {
        var _this_element, _this_element1, _this_element_ownerDocument;
        return ((_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.defaultView) || ((_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : (_this_element_ownerDocument = _this_element1.ownerDocument) === null || _this_element_ownerDocument === void 0 ? void 0 : _this_element_ownerDocument.defaultView) || window;
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onScroll = ()=>{
            this.dispatcher.dispatch(new CanvasScrollEvent());
        };
        this.attach();
    }
}
export const CanvasScrollDriver = (dispatcher, element)=>{
    return new CanvasScrollDriverImpl(dispatcher, element);
};

//# sourceMappingURL=CanvasScrollDriver.js.map