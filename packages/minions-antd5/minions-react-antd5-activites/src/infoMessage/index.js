var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var InfoMessage = /** @class */ (function (_super) {
    __extends(InfoMessage, _super);
    function InfoMessage(meta) {
        var _this = _super.call(this, meta) || this;
        _this.inputHandler = function (inputValue) {
            var _a, _b, _c, _d, _e, _f, _g;
            var msg = inputValue;
            switch ((_a = _this.meta.config) === null || _a === void 0 ? void 0 : _a.type) {
                case MessageType.Success:
                    message.success(msg, (_b = _this.meta.config) === null || _b === void 0 ? void 0 : _b.duration);
                    break;
                case MessageType.Error:
                    inputValue && message.error(inputValue === null || inputValue === void 0 ? void 0 : inputValue.message, (_c = _this.meta.config) === null || _c === void 0 ? void 0 : _c.duration);
                    break;
                case MessageType.Info:
                    message.info(msg, (_d = _this.meta.config) === null || _d === void 0 ? void 0 : _d.duration);
                    break;
                case MessageType.Warning:
                    message.warning(msg, (_e = _this.meta.config) === null || _e === void 0 ? void 0 : _e.duration);
                    break;
                case MessageType.Loading:
                    message.loading(msg, (_f = _this.meta.config) === null || _f === void 0 ? void 0 : _f.duration);
                    break;
                default:
                    message.info(msg, (_g = _this.meta.config) === null || _g === void 0 ? void 0 : _g.duration);
                    break;
            }
        };
        if (Object.keys(meta.inPorts || {}).length !== 1) {
            throw new Error("Debug inputs count error");
        }
        return _this;
    }
    InfoMessage_1 = InfoMessage;
    var InfoMessage_1;
    InfoMessage.NAME = "system-react-antd5.message";
    __decorate([
        Input()
    ], InfoMessage.prototype, "inputHandler", void 0);
    InfoMessage = InfoMessage_1 = __decorate([
        Activity(InfoMessage_1.NAME)
    ], InfoMessage);
    return InfoMessage;
}(AbstractActivity));
export { InfoMessage };
