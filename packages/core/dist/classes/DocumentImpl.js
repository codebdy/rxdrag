function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import { makeRxId } from "utils/make-rxId";
import { HistoryableActionType, NodeRelativePosition } from "../interfaces/document";
import { parseNodeSchema, paseNodes } from "funcs/parseNodeSchema";
import { ADD_NODES, BACKUP, CHANGE_NODE_META, DELETE_NODES, GOTO, INITIALIZE, MOVE_NODES, RECOVER_SNAPSHOT, REMOVE_DOCUMENT, REMOVE_SLOT } from "actions/registry";
import { isArr, isStr } from "utils/types";
export class DocumentImpl {
    initialize(rootSchema, documentId) {
        const nodesById = {};
        if (!this.isBlocksSchema(rootSchema)) {
            const root = parseNodeSchema(this.engine, documentId, rootSchema, nodesById, false);
            this.dispatch({
                type: INITIALIZE,
                payload: {
                    documentId: documentId,
                    nodesById,
                    rootId: root.id
                }
            });
            this.backup(HistoryableActionType.Default);
        }
    }
    multiMoveTo(sourceIds, targetId, pos) {
        throw new Error("Method not implemented.");
    }
    addNewNodes(elements, targetId, pos) {
        const nodes = paseNodes(this.engine, this.id, elements);
        this.receiveNodes(nodes);
        const playload = {
            documentId: this.id,
            nodes,
            targetId,
            pos
        };
        this.dispatch(this.createAction(ADD_NODES, playload));
        return nodes;
    }
    removeSlot(id, name) {
        const playload = {
            documentId: this.id,
            nodeId: id,
            slotName: name
        };
        this.dispatch(this.createAction(REMOVE_SLOT, playload));
        this.backup(HistoryableActionType.RemoveSlot);
    }
    addSlot(id, name) {
        const node = this.getNode(id);
        if (node) {
            var _comdesigner_slots;
            const comdesigner = this.engine.getComponentManager().getComponentDesigner(node.meta.componentName);
            const slotConfig = comdesigner === null || comdesigner === void 0 ? void 0 : (_comdesigner_slots = comdesigner.slots) === null || _comdesigner_slots === void 0 ? void 0 : _comdesigner_slots[name];
            let element = {
                componentName: "DefaultSlot"
            };
            if (isStr(slotConfig)) {
                var _this_engine_getComponentManager_getComponentDesigner, _this_engine_getComponentManager_getComponentDesigner_resource;
                const slotElements = (_this_engine_getComponentManager_getComponentDesigner = this.engine.getComponentManager().getComponentDesigner(slotConfig)) === null || _this_engine_getComponentManager_getComponentDesigner === void 0 ? void 0 : (_this_engine_getComponentManager_getComponentDesigner_resource = _this_engine_getComponentManager_getComponentDesigner.resource) === null || _this_engine_getComponentManager_getComponentDesigner_resource === void 0 ? void 0 : _this_engine_getComponentManager_getComponentDesigner_resource.elements;
                if (isArr(slotElements)) {
                    element = slotElements[0];
                } else if (slotElements) {
                    element = slotElements;
                } else {
                    console.warn("No set slot on name:", name);
                    return;
                }
            } else if (slotConfig === true || slotConfig === undefined) {
                element = {
                    componentName: "DefaultSlot"
                };
            } else {
                var _slotConfig_resource, _slotConfig_resource1, _slotConfig_resource_elements, _slotConfig_resource2;
                const slotElement = isArr((_slotConfig_resource = slotConfig.resource) === null || _slotConfig_resource === void 0 ? void 0 : _slotConfig_resource.elements) ? (_slotConfig_resource1 = slotConfig.resource) === null || _slotConfig_resource1 === void 0 ? void 0 : (_slotConfig_resource_elements = _slotConfig_resource1.elements) === null || _slotConfig_resource_elements === void 0 ? void 0 : _slotConfig_resource_elements[0] : (_slotConfig_resource2 = slotConfig.resource) === null || _slotConfig_resource2 === void 0 ? void 0 : _slotConfig_resource2.elements;
                if (slotElement) {
                    element = slotElement;
                }
            }
            const nodes = paseNodes(this.engine, this.id, element);
            this.receiveNodes(nodes);
            const playload = {
                documentId: this.id,
                nodes,
                targetId: node.id,
                slot: name
            };
            this.dispatch(this.createAction(ADD_NODES, playload));
        } else {
            console.error("Can not find node by id", id);
        }
    }
    clone(sourceId) {
        const sourceSchema = this.getNodeSchema(sourceId);
        if (sourceSchema) {
            const nodes = this.addNewNodes(sourceSchema, sourceId, NodeRelativePosition.After);
            for (const node of nodes.rootNodes){
                this.engine.getActions().selectNodes([
                    node.id
                ], this.id);
            }
            this.backup(HistoryableActionType.Clone);
        }
    }
    changeNodeMeta(id, newMeta) {
        const payload = {
            id,
            meta: newMeta
        };
        this.engine.dispatch({
            type: CHANGE_NODE_META,
            payload
        });
        this.backup(HistoryableActionType.Change);
    }
    backup(actionType) {
        var _this_getState, _this_getState1;
        const historyLength = (_this_getState = this.getState()) === null || _this_getState === void 0 ? void 0 : _this_getState.history.length;
        const payload = {
            documentId: this.id,
            nodes: this.engine.getMonitor().getState().nodesById,
            selectedIds: ((_this_getState1 = this.getState()) === null || _this_getState1 === void 0 ? void 0 : _this_getState1.selectedIds) || [],
            actionType: actionType
        };
        this.engine.dispatch({
            type: BACKUP,
            payload
        });
        const gotoPayload = {
            documentId: this.id,
            index: historyLength || 0
        };
        this.engine.dispatch({
            type: GOTO,
            payload: gotoPayload
        });
    }
    undo() {
        const state = this.getState();
        if ((state === null || state === void 0 ? void 0 : state.snapshotIndex) === 0) {
            return;
        }
        if (state === null || state === void 0 ? void 0 : state.history.length) {
            const currentIndex = (state === null || state === void 0 ? void 0 : state.snapshotIndex) || (state === null || state === void 0 ? void 0 : state.history.length) - 1;
            if (currentIndex > 0) {
                const snapshot = state.history[currentIndex - 1];
                if (snapshot) {
                    this.revoverSnapshot(snapshot);
                    this.dispatchGoto(currentIndex - 1);
                }
            }
        }
    }
    redo() {
        const state = this.getState();
        if (!state || (state === null || state === void 0 ? void 0 : state.snapshotIndex) === null) {
            return;
        }
        const currentIndex = state.snapshotIndex;
        if (currentIndex === state.history.length - 1) {
            return;
        }
        const snapshot = state.history[currentIndex + 1];
        if (snapshot) {
            this.dispatchGoto(currentIndex + 1);
            this.revoverSnapshot(snapshot);
        }
    }
    goto(index) {
        const state = this.getState();
        const snapshot = state === null || state === void 0 ? void 0 : state.history[index];
        if (snapshot) {
            this.revoverSnapshot(snapshot);
        }
        this.dispatchGoto(index);
    }
    getRootNode() {
        const documentState = this.getState();
        const state = this.store.getState();
        return (documentState === null || documentState === void 0 ? void 0 : documentState.rootId) ? state.nodesById[(documentState === null || documentState === void 0 ? void 0 : documentState.rootId) || ""] || null : null;
    }
    destory() {
        this.dispatch(this.createAction(REMOVE_DOCUMENT, {}));
    }
    getSchemaTree() {
        var _this_getState;
        return this.getNodeSchema(((_this_getState = this.getState()) === null || _this_getState === void 0 ? void 0 : _this_getState.rootId) || "");
    }
    dispatch(action) {
        this.engine.dispatch(action);
    }
    createAction(actionType, payload) {
        return {
            type: actionType,
            payload: _objectSpread({
                documentId: this.id
            }, payload)
        };
    }
    getNodeSchema(id) {
        const node = this.getNode(id);
        const slots = {};
        const children = [];
        for (const key of Object.keys((node === null || node === void 0 ? void 0 : node.slots) || {})){
            var _node_slots;
            const slot = this.getNodeSchema((node === null || node === void 0 ? void 0 : (_node_slots = node.slots) === null || _node_slots === void 0 ? void 0 : _node_slots[key]) || "");
            if (slot) {
                slots[key] = slot;
            } else {
                console.error("can not find slot");
            }
        }
        for (const childId of (node === null || node === void 0 ? void 0 : node.children) || []){
            const child = this.getNodeSchema(childId);
            if (child) {
                children.push(child);
            } else {
                console.error("can not find child");
            }
        }
        if (node) {
            return _objectSpreadProps(_objectSpread({}, node.meta), {
                slots,
                children
            });
        }
        return null;
    }
    receiveNodes(nodes) {
        for (const key of Object.keys(nodes.nodesById)){
            nodes.nodesById[key].documentId = this.id;
        }
    }
    dispatchGoto(index) {
        const payload = {
            documentId: this.id,
            index: index
        };
        this.engine.dispatch({
            type: GOTO,
            payload
        });
    }
    getState() {
        return this.store.getState().documentsById[this.id];
    }
    isBlocksSchema(schema) {
        return !schema.componentName;
    }
    revoverSnapshot(snapshot) {
        const payload = {
            documentId: this.id,
            snapshot
        };
        this.engine.dispatch({
            type: RECOVER_SNAPSHOT,
            payload
        });
    }
    constructor(schema, engine, store){
        this.engine = engine;
        this.store = store;
        this.moveTo = (sourceId, targetId, pos)=>{
            const playload = {
                documentId: this.id,
                sourceIds: [
                    sourceId
                ],
                targetId,
                pos
            };
            this.dispatch(this.createAction(MOVE_NODES, playload));
        };
        this.remove = (sourceId)=>{
            const playload = {
                documentId: this.id,
                sourceIds: [
                    sourceId
                ]
            };
            this.dispatch(this.createAction(DELETE_NODES, playload));
            this.backup(HistoryableActionType.Remove);
        };
        this.getNode = (id)=>{
            var _state_nodesById;
            const state = this.store.getState();
            return (state === null || state === void 0 ? void 0 : (_state_nodesById = state.nodesById) === null || _state_nodesById === void 0 ? void 0 : _state_nodesById[id]) || null;
        };
        this.id = makeRxId();
        this.initialize(schema, this.id);
    }
}

//# sourceMappingURL=DocumentImpl.js.map