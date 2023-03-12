import { getKeyCodeFromEvent } from "../../../utils/keycode";
export class AbstractKeyboardEvent {
    get eventType() {
        return this.originEvent.type;
    }
    get ctrlKey() {
        return this.originEvent.ctrlKey;
    }
    get shiftKey() {
        return this.originEvent.shiftKey;
    }
    get metaKey() {
        return this.originEvent.metaKey;
    }
    get altkey() {
        return this.originEvent.altKey;
    }
    preventDefault() {
        if (this.originEvent.preventDefault) {
            this.originEvent.preventDefault();
        } else {
            this.originEvent.returnValue = false;
        }
    }
    stopPropagation() {
        var _this_originEvent;
        if ((_this_originEvent = this.originEvent) === null || _this_originEvent === void 0 ? void 0 : _this_originEvent.stopPropagation) {
            this.originEvent.stopPropagation();
        } else {
            this.originEvent.cancelBubble = true;
        }
    }
    constructor(e){
        this.data = getKeyCodeFromEvent(e);
        this.originEvent = e;
    }
}

//# sourceMappingURL=AbstractKeyboardEvent.js.map