import { RXID_ATTR_NAME } from "../interfaces";
export class IFrameCanvasImpl {
    getContainerRect() {
        var _this_iframe_contentWindow, _this_iframe_contentWindow_document, _this_iframe_contentWindow_document_body;
        const rect = (_this_iframe_contentWindow = this.iframe.contentWindow) === null || _this_iframe_contentWindow === void 0 ? void 0 : (_this_iframe_contentWindow_document = _this_iframe_contentWindow.document) === null || _this_iframe_contentWindow_document === void 0 ? void 0 : (_this_iframe_contentWindow_document_body = _this_iframe_contentWindow_document.body) === null || _this_iframe_contentWindow_document_body === void 0 ? void 0 : _this_iframe_contentWindow_document_body.getBoundingClientRect();
        if (!rect) {
            return null;
        }
        return {
            width: rect.width,
            height: rect.height,
            x: 0,
            y: 0
        };
    }
    appendChild(child) {
        var _this_body;
        (_this_body = this.body) === null || _this_body === void 0 ? void 0 : _this_body.append(child);
    }
    contains(child) {
        var _this_body;
        return ((_this_body = this.body) === null || _this_body === void 0 ? void 0 : _this_body.contains(child)) || false;
    }
    removeChild(child) {
        var _this_body;
        (_this_body = this.body) === null || _this_body === void 0 ? void 0 : _this_body.removeChild(child);
    }
    getElement(id) {
        var _this_body;
        return ((_this_body = this.body) === null || _this_body === void 0 ? void 0 : _this_body.querySelector(`[${RXID_ATTR_NAME}="${id}"]`)) || null;
    }
    getTopRect(nodeId) {
        var _this_getElement;
        const rect = (_this_getElement = this.getElement(nodeId)) === null || _this_getElement === void 0 ? void 0 : _this_getElement.getBoundingClientRect();
        if (rect) {
            const frameRect = this.iframe.getBoundingClientRect();
            const scale = frameRect.width / this.iframe['offsetWidth'];
            rect.x = rect.x * scale + frameRect.x;
            rect.y = rect.y * scale + frameRect.y;
            return rect;
        }
        return null;
    }
    destory() {
        for (const driver of this.dirvers){
            driver.teardown();
        }
        this.dirvers = [];
    }
    get body() {
        var _this_iframe_contentWindow;
        return (_this_iframe_contentWindow = this.iframe.contentWindow) === null || _this_iframe_contentWindow === void 0 ? void 0 : _this_iframe_contentWindow.document.body;
    }
    constructor(engine, iframe, id, driverFactories){
        this.iframe = iframe;
        this.id = id;
        this.driverFactories = driverFactories;
        this.dirvers = [];
        for (const dirverFactory of this.driverFactories){
            var _this_iframe_contentWindow;
            if ((_this_iframe_contentWindow = this.iframe.contentWindow) === null || _this_iframe_contentWindow === void 0 ? void 0 : _this_iframe_contentWindow.document) {
                var _this_iframe_contentWindow1;
                this.dirvers.push(dirverFactory(engine.getShell(), (_this_iframe_contentWindow1 = this.iframe.contentWindow) === null || _this_iframe_contentWindow1 === void 0 ? void 0 : _this_iframe_contentWindow1.document));
            }
        }
    }
}

//# sourceMappingURL=IFrameCanvasImpl.js.map