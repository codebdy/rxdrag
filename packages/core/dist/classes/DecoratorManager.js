import { AddDecoratorEvent } from "shell/events/canvas/AddDecoratorEvent";
import { RemoveDecoratorEvent } from "shell/events/canvas/RemoveDecoratorEvent";
export class DecoratorManager {
    addDecorator(decorator, documentId) {
        if (!this.decorators[documentId]) {
            this.decorators[documentId] = {};
        }
        this.decorators[documentId][decorator.name] = decorator;
        this.attachDecorator(decorator, documentId);
        this.engine.getShell().dispatch(new AddDecoratorEvent());
    }
    removeDecorator(name, documentId) {
        var _this_decorators, _this_decorators_documentId;
        const decorator = (_this_decorators = this.decorators) === null || _this_decorators === void 0 ? void 0 : (_this_decorators_documentId = _this_decorators[documentId]) === null || _this_decorators_documentId === void 0 ? void 0 : _this_decorators_documentId[name];
        if (decorator) {
            this.detachDecorator(decorator, documentId);
            delete this.decorators[documentId][name];
            this.engine.getShell().dispatch(new RemoveDecoratorEvent());
        }
    }
    getDecorator(name, documentId) {
        var _this_decorators, _this_decorators_documentId;
        return (_this_decorators = this.decorators) === null || _this_decorators === void 0 ? void 0 : (_this_decorators_documentId = _this_decorators[documentId]) === null || _this_decorators_documentId === void 0 ? void 0 : _this_decorators_documentId[name];
    }
    attachDecorator(decorator, documentId) {
        const nodes = this.engine.getMonitor().getState().nodesById;
        const shell = this.engine.getShell();
        for (const id of Object.keys(nodes)){
            const node = nodes[id];
            if (node.documentId === documentId) {
                const el = shell.getElement(id);
                if (el) {
                    decorator.decorate(el, node);
                }
            }
        }
    }
    detachDecorator(decorator, documentId) {
        const nodes = this.engine.getMonitor().getState().nodesById;
        const shell = this.engine.getShell();
        for (const id of Object.keys(nodes)){
            const node = nodes[id];
            if (node.documentId === documentId) {
                const el = shell.getElement(id);
                if (el) {
                    decorator.unDecorate(el);
                }
            }
        }
    }
    constructor(engine){
        this.engine = engine;
        this.decorators = {};
        this.handleMounted = (e /*NodeMountedEvent*/ )=>{
            const nodeId = e.nodeId;
            if (!nodeId) {
                return;
            }
            const el = this.engine.getShell().getElement(nodeId);
            if (!el) {
                //console.error("No Element")
                return;
            }
            const documentId = this.engine.getMonitor().getNodeDocumentId(nodeId);
            if (!documentId) {
                console.error("No document");
                return;
            }
            const decorators = this.decorators[documentId];
            const node = this.engine.getMonitor().getNode(nodeId);
            for (const name of Object.keys(decorators || {})){
                const decorator = decorators[name];
                if (decorator && node) {
                    decorator.decorate(el, node);
                }
            }
        };
    //engine.getShell().subscribeTo(NodeMountedEvent, this.handleMounted)
    }
}

//# sourceMappingURL=DecoratorManager.js.map