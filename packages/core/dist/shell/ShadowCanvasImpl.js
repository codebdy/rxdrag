import { RXID_ATTR_NAME } from "../interfaces";
export class ShadowCanvasImpl {
    appendChild(child) {
        this.shadow.append(child);
    }
    contains(child) {
        return this.shadow.contains(child);
    }
    removeChild(child) {
        this.shadow.removeChild(child);
    }
    getElement(id) {
        return this.shadow.querySelector(`[${RXID_ATTR_NAME}="${id}"]`);
    }
    getTopRect(nodeId) {
        var _this_getElement;
        return ((_this_getElement = this.getElement(nodeId)) === null || _this_getElement === void 0 ? void 0 : _this_getElement.getBoundingClientRect()) || null;
    }
    getContainerRect() {
        return this.roolElement.getBoundingClientRect();
    }
    destory() {
        for (const driver of this.dirvers){
            driver.teardown();
        }
        this.dirvers = [];
    }
    constructor(engine, shadow, roolElement, id, driverFactories){
        this.shadow = shadow;
        this.roolElement = roolElement;
        this.id = id;
        this.driverFactories = driverFactories;
        this.dirvers = [];
        for (const dirverFactory of this.driverFactories){
            this.dirvers.push(dirverFactory(engine.getShell(), roolElement));
        }
    }
}

//# sourceMappingURL=ShadowCanvasImpl.js.map