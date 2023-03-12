import { EventEngine } from 'interfaces/event';
export class DesignerShell extends EventEngine {
    setContainer(el) {
        this.container = el;
    }
    getContainer() {
        return this.container;
    }
    getCanvas(documentId) {
        return this.canvases[documentId];
    }
    getAllCanvases() {
        return this.canvases;
    }
    addCanvas(canvas) {
        this.canvases[canvas.id] = canvas;
    }
    removeCanvas(documentId) {
        const canvas = this.canvases[documentId];
        canvas === null || canvas === void 0 ? void 0 : canvas.destory();
        delete this.canvases[documentId];
    }
    getTopRect(nodeId) {
        var _this_container;
        const rect = (_this_container = this.container) === null || _this_container === void 0 ? void 0 : _this_container.getTopRect(nodeId);
        if (rect) {
            return rect;
        }
        for (const key of Object.keys(this.canvases)){
            const canvas = this.canvases[key];
            const rect = canvas === null || canvas === void 0 ? void 0 : canvas.getTopRect(nodeId);
            if (rect) {
                return rect;
            }
        }
        return null;
    }
    getElement(nodeId) {
        var _this_container;
        const ele = (_this_container = this.container) === null || _this_container === void 0 ? void 0 : _this_container.getElement(nodeId);
        if (ele) {
            return ele;
        }
        for (const key of Object.keys(this.canvases)){
            const canvas = this.canvases[key];
            const ele = canvas === null || canvas === void 0 ? void 0 : canvas.getElement(nodeId);
            if (ele) {
                return ele;
            }
        }
        return null;
    }
    destory() {
        var _this_container;
        (_this_container = this.container) === null || _this_container === void 0 ? void 0 : _this_container.destory();
        for (const key of Object.keys(this.canvases)){
            var _this_canvases_key;
            (_this_canvases_key = this.canvases[key]) === null || _this_canvases_key === void 0 ? void 0 : _this_canvases_key.destory();
        }
    }
    constructor(...args){
        super(...args);
        this.dragging = false;
        this.canvases = {};
    }
}

//# sourceMappingURL=index.js.map