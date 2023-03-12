import { KeyDownEvent, KeyUpEvent } from "shell/events/keyboard";
function filter(event) {
    const target = event.target;
    const { tagName  } = target;
    let flag = true;
    // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>、Web Components
    if (target['isContentEditable'] || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || customElements.get(tagName.toLocaleLowerCase())) && !target.readOnly) {
        flag = false;
    }
    return flag;
}
export class KeyboardDriverImpl {
    attach() {
        var _this_element, _this_element1;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.addEventListener('keydown', this.onKeyDown);
        (_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : _this_element1.addEventListener('keyup', this.onKeyUp);
    }
    teardown() {
        var _this_element, _this_element1;
        (_this_element = this.element) === null || _this_element === void 0 ? void 0 : _this_element.removeEventListener('keydown', this.onKeyDown);
        (_this_element1 = this.element) === null || _this_element1 === void 0 ? void 0 : _this_element1.removeEventListener('keyup', this.onKeyUp);
    }
    constructor(dispatcher, element){
        this.dispatcher = dispatcher;
        this.element = element;
        this.onKeyDown = (e)=>{
            if (!filter(e)) return;
            this.dispatcher.dispatch(new KeyDownEvent(e));
        };
        this.onKeyUp = (e)=>{
            this.dispatcher.dispatch(new KeyUpEvent(e));
        };
        this.attach();
    }
}
export const KeyboardDriver = (dispatcher, element)=>{
    return new KeyboardDriverImpl(dispatcher, element);
};

//# sourceMappingURL=KeyboardDriver.js.map