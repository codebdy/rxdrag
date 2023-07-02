var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InfoMessage_1;
import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime";
import { message } from "antd";
export var MessageType;
(function (MessageType) {
    MessageType["Success"] = "success";
    MessageType["Error"] = "error";
    MessageType["Info"] = "info";
    MessageType["Warning"] = "warning";
    MessageType["Loading"] = "loading";
})(MessageType || (MessageType = {}));
let InfoMessage = InfoMessage_1 = class InfoMessage extends AbstractActivity {
    static NAME = "system-react-antd5.message";
    constructor(meta) {
        super(meta);
        if (Object.keys(meta.inPorts || {}).length !== 1) {
            throw new Error("Debug inputs count error");
        }
    }
    inputHandler = (inputValue) => {
        const msg = inputValue;
        switch (this.meta.config?.type) {
            case MessageType.Success:
                message.success(msg, this.meta.config?.duration);
                break;
            case MessageType.Error:
                inputValue && message.error(inputValue?.message, this.meta.config?.duration);
                break;
            case MessageType.Info:
                message.info(msg, this.meta.config?.duration);
                break;
            case MessageType.Warning:
                message.warning(msg, this.meta.config?.duration);
                break;
            case MessageType.Loading:
                message.loading(msg, this.meta.config?.duration);
                break;
            default:
                message.info(msg, this.meta.config?.duration);
                break;
        }
    };
};
__decorate([
    Input()
], InfoMessage.prototype, "inputHandler", void 0);
InfoMessage = InfoMessage_1 = __decorate([
    Activity(InfoMessage_1.NAME)
], InfoMessage);
export { InfoMessage };
