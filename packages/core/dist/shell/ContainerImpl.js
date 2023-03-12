import { RXID_ATTR_NAME } from "core/interfaces";
export class ContainerImpl {
    getContainerRect() {
        return this.roolElement.getBoundingClientRect();
    }
    appendChild(child) {
        this.roolElement.append(child);
    }
    contains(child) {
        return this.roolElement.contains(child);
    }
    removeChild(child) {
        if (this.contains(child)) {
            this.roolElement.removeChild(child);
        }
    }
    getElement(id) {
        return this.roolElement.querySelector(`[${RXID_ATTR_NAME}="${id}"]`);
    }
    getTopRect(nodeId) {
        var _this_getElement;
        return ((_this_getElement = this.getElement(nodeId)) === null || _this_getElement === void 0 ? void 0 : _this_getElement.getBoundingClientRect()) || null;
    }
    destory() {
        for (const driver of this.dirvers){
            driver.teardown();
        }
        this.dirvers = [];
    }
    constructor(engine, roolElement, id, driverFactories){
        this.roolElement = roolElement;
        this.id = id;
        this.driverFactories = driverFactories;
        this.dirvers = [];
        for (const dirverFactory of this.driverFactories){
            this.dirvers.push(dirverFactory(engine.getShell(), roolElement));
        }
    }
}

//# sourceMappingURL=ContainerImpl.js.map