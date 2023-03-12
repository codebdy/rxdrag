import { invariant } from '../utils/util-invariant';
import { DefulstViewType, DocumentSelectionMode } from '../interfaces/index';
/**
 * 为优化性能而生
 */ export class NodeChangeHandler {
    removeListener(id, listener) {
        var _this_listeners_id;
        this.listeners[id] = (_this_listeners_id = this.listeners[id]) === null || _this_listeners_id === void 0 ? void 0 : _this_listeners_id.filter((lis)=>lis !== listener);
    }
    constructor(){
        this.listeners = {};
        this.handleNodeChange = (node)=>{
            for (const id of Object.keys(this.listeners)){
                if (id === node.id) {
                    const listeners = this.listeners[id];
                    for (const listener of listeners || []){
                        listener(node);
                    }
                }
            }
        };
        this.subscribeToNodeChanged = (id, listener)=>{
            var _this_listeners_id;
            const unsubscribe = ()=>{
                this.removeListener(id, listener);
            };
            if (!this.listeners[id]) {
                this.listeners[id] = [];
            }
            (_this_listeners_id = this.listeners[id]) === null || _this_listeners_id === void 0 ? void 0 : _this_listeners_id.push(listener);
            return unsubscribe;
        };
    }
}
export class Monitor {
    getSelectionMode(document) {
        var _this_store_getState_documentsById_document;
        return ((_this_store_getState_documentsById_document = this.store.getState().documentsById[document]) === null || _this_store_getState_documentsById_document === void 0 ? void 0 : _this_store_getState_documentsById_document.selectionMode) || DocumentSelectionMode.Normal;
    }
    getCurrentNode() {
        var _state_documentsById_state_activedDocumentId;
        const state = this.getState();
        if (!state.activedDocumentId) {
            return null;
        }
        const currentId = this.getSeletedNodeId(((_state_documentsById_state_activedDocumentId = state.documentsById[state.activedDocumentId]) === null || _state_documentsById_state_activedDocumentId === void 0 ? void 0 : _state_documentsById_state_activedDocumentId.selectedIds) || []);
        return this.getNode(currentId);
    }
    getCurrentTree() {
        const state = this.getState();
        if (!state.activedDocumentId) {
            return null;
        }
        const documentState = state.documentsById[state.activedDocumentId];
        if (documentState === null || documentState === void 0 ? void 0 : documentState.rootId) {
            return this.getNode(documentState.rootId);
        }
        return null;
    }
    getNodeDocumentId(nodeId) {
        var _this_getNode;
        return (_this_getNode = this.getNode(nodeId)) === null || _this_getNode === void 0 ? void 0 : _this_getNode.documentId;
    }
    getNode(nodeId) {
        const nodes = this.store.getState().nodesById;
        for (const ndId of Object.keys(nodes)){
            if (ndId === nodeId) {
                return nodes[ndId];
            }
        }
        return null;
    }
    getDocumentRootNode(doumentId) {
        const doc = this.getState().documentsById[doumentId];
        return (doc === null || doc === void 0 ? void 0 : doc.rootId) ? this.getNode(doc === null || doc === void 0 ? void 0 : doc.rootId) : null;
    }
    getState() {
        return this.store.getState();
    }
    subscribeToDraggingNodes(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().draggingNodes;
        const handleChange = ()=>{
            const nextState = this.store.getState().draggingNodes;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || null);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToDraggingResource(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().draggingResource;
        const handleChange = ()=>{
            const nextState = this.store.getState().draggingResource;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || null);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToDragOver(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().dragOver;
        const handleChange = ()=>{
            const nextState = this.store.getState().dragOver;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || null);
        };
        return this.store.subscribe(handleChange);
    }
    getCurrentSelectedIds() {
        return this.getDocumentSelectedIds(this.getState().activedDocumentId || "");
    }
    getDocumentSelectedIds(documentId) {
        var _this_store_getState_documentsById_documentId;
        return ((_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.selectedIds) || null;
    }
    getDrageOver() {
        return this.store.getState().dragOver || null;
    }
    subscribeToStateChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let prevStateId = this.store.getState().stateId;
        const handleChange = ()=>{
            const state = this.store.getState();
            const currentStateId = state.stateId;
            try {
                const canSkipListener = currentStateId === prevStateId //||
                ;
                // (currentStateId === prevStateId + 1 &&
                // 	!areDirty(state.dirtyHandlerIds, handlerIds))
                if (!canSkipListener) {
                    listener();
                }
            } finally{
                prevStateId = currentStateId;
            }
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToSelectChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().documentsById;
        const handleChange = ()=>{
            const nextState = this.store.getState().documentsById;
            for (const key of Object.keys(nextState)){
                var _nextState_key, _previousState_key, _nextState_key1;
                if (((_nextState_key = nextState[key]) === null || _nextState_key === void 0 ? void 0 : _nextState_key.selectedIds) === ((_previousState_key = previousState[key]) === null || _previousState_key === void 0 ? void 0 : _previousState_key.selectedIds)) {
                    continue;
                }
                listener(((_nextState_key1 = nextState[key]) === null || _nextState_key1 === void 0 ? void 0 : _nextState_key1.selectedIds) || null, key);
            }
            previousState = nextState;
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToCurrentNodeChanged(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        const activedDocumentId = this.getState().activedDocumentId;
        const documentState = this.getState().documentsById[activedDocumentId || ""];
        let previousNodeId = this.getSeletedNodeId((documentState === null || documentState === void 0 ? void 0 : documentState.selectedIds) || []);
        const handleChange = ()=>{
            const activedDocumentId = this.getState().activedDocumentId;
            const nextState = this.store.getState().documentsById[activedDocumentId || ""];
            const nodeId = this.getSeletedNodeId((nextState === null || nextState === void 0 ? void 0 : nextState.selectedIds) || []);
            const node = this.getState().nodesById[nodeId] || null;
            if (previousNodeId !== (node === null || node === void 0 ? void 0 : node.id)) {
                listener(node);
            }
            previousNodeId = node === null || node === void 0 ? void 0 : node.id;
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToHasNodeChanged(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().nodesById;
        const handleChange = ()=>{
            const nextState = this.store.getState().nodesById;
            if (nextState !== previousState) {
                listener();
            }
            previousState = nextState;
        };
        return this.store.subscribe(handleChange);
    }
    //隔离NodesById的变化
    subscribeToNodeChanged(id, listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        return this.nodechnageHandler.subscribeToNodeChanged(id, listener);
    }
    subscribeToLangeChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().lang;
        const handleChange = ()=>{
            const nextState = this.store.getState().lang;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToThemeModeChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().themeMode;
        const handleChange = ()=>{
            const nextState = this.store.getState().themeMode;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToActiveDocumentChanged(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().activedDocumentId;
        const handleChange = ()=>{
            const nextState = this.store.getState().activedDocumentId;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToActiveChanged(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().activedNodeId;
        const handleChange = ()=>{
            const nextState = this.store.getState().activedNodeId;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToHistoryChange(documentId, listener) {
        var _this_store_getState_documentsById_documentId;
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.history;
        const handleChange = ()=>{
            var _this_store_getState_documentsById_documentId;
            const nextState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.history;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || []);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToSnapshotIndexChange(documentId, listener) {
        var _this_store_getState_documentsById_documentId;
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.snapshotIndex;
        const handleChange = ()=>{
            var _this_store_getState_documentsById_documentId;
            const nextState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.snapshotIndex;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || 0);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToCanvasWidthChange(documentId, listener) {
        var _this_store_getState_documentsById_documentId;
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.canvasWidth;
        const handleChange = ()=>{
            var _this_store_getState_documentsById_documentId;
            const nextState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.canvasWidth;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || 0);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToCanvasWidthLimitsChange(documentId, listener) {
        var _this_store_getState_documentsById_documentId;
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.canvasWidthLimits;
        const handleChange = ()=>{
            var _this_store_getState_documentsById_documentId;
            const nextState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.canvasWidthLimits;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || null);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToDocumentViewChange(documentId, listener) {
        var _this_store_getState_documentsById_documentId;
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.viewType;
        const handleChange = ()=>{
            var _this_store_getState_documentsById_documentId;
            const nextState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.viewType;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || DefulstViewType);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeToSelectionMode(documentId, listener) {
        var _this_store_getState_documentsById_documentId;
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.selectionMode;
        const handleChange = ()=>{
            var _this_store_getState_documentsById_documentId;
            const nextState = (_this_store_getState_documentsById_documentId = this.store.getState().documentsById[documentId]) === null || _this_store_getState_documentsById_documentId === void 0 ? void 0 : _this_store_getState_documentsById_documentId.selectionMode;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState || DocumentSelectionMode.Normal);
        };
        return this.store.subscribe(handleChange);
    }
    isDragging() {
        const state = this.store.getState();
        return !!state.draggingResource || !!state.draggingNodes;
    }
    getSeletedNodeId(selectedIds) {
        return (selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds.length) === 1 ? (selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds[0]) || "" : "";
    }
    doSubscribeToNodeChanged(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().nodesById;
        const handleChange = ()=>{
            const nextState = this.store.getState().nodesById;
            if (nextState !== previousState) {
                for (const nodeId of Object.keys(nextState)){
                    if (nextState[nodeId] !== (previousState === null || previousState === void 0 ? void 0 : previousState[nodeId])) {
                        listener(nextState[nodeId]);
                    }
                }
            }
            previousState = nextState;
        };
        return this.store.subscribe(handleChange);
    }
    constructor(store){
        this.nodechnageHandler = new NodeChangeHandler();
        this.store = store;
        this.doSubscribeToNodeChanged(this.nodechnageHandler.handleNodeChange);
    }
}

//# sourceMappingURL=Monitor.js.map