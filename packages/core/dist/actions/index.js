import { ACTIVE_NODE, CHANGE_ACTIVED_DOCUMENT, CHANGE_CANVAS_WIDTH, CHANGE_CANVAS_WIDTH_LIMITS, CHANGE_DOCUMENT_VIEW_TYPE, DRAG_HOVER, END_DRAG_NODES, END_DRAG_RESOURCE, SELECT_NODES, SET_SELECTION_MODE, SET_THEME_MODE, START_DRAG_NODES, START_DRAG_RESOURCE } from "./registry";
export class Actions {
    setThemeMode(mode) {
        this.engine.dispatch({
            type: SET_THEME_MODE,
            payload: mode
        });
    }
    changeActivedDocument(documentId) {
        this.engine.dispatch({
            type: CHANGE_ACTIVED_DOCUMENT,
            payload: documentId
        });
    }
    dragover(payload) {
        this.engine.dispatch({
            type: DRAG_HOVER,
            payload
        });
    }
    startDragResource(payload) {
        this.engine.dispatch({
            type: START_DRAG_RESOURCE,
            payload
        });
    }
    endDragResouce() {
        this.engine.dispatch({
            type: END_DRAG_RESOURCE
        });
    }
    startDragNodes(payload) {
        this.engine.dispatch({
            type: START_DRAG_NODES,
            payload
        });
    }
    endDragNodes() {
        this.engine.dispatch({
            type: END_DRAG_NODES
        });
    }
    selectNodes(targetIds, documentId) {
        this.engine.dispatch({
            type: SELECT_NODES,
            payload: {
                documentId,
                targetIds
            }
        });
    }
    setSelectionMode(documentId, mode) {
        const payload = {
            documentId,
            mode: mode
        };
        this.engine.dispatch({
            type: SET_SELECTION_MODE,
            payload
        });
    }
    activeNode(payload) {
        this.engine.dispatch({
            type: ACTIVE_NODE,
            payload
        });
    }
    changeCanvasWidth(documentId, width) {
        const payload = {
            documentId,
            width: width
        };
        this.engine.dispatch({
            type: CHANGE_CANVAS_WIDTH,
            payload
        });
    }
    changeCanvasWidthLimits(documentId, limits) {
        const payload = {
            documentId,
            limits
        };
        this.engine.dispatch({
            type: CHANGE_CANVAS_WIDTH_LIMITS,
            payload
        });
    }
    changeDocumentView(documentId, viewType) {
        const payload = {
            documentId,
            viewType
        };
        this.engine.dispatch({
            type: CHANGE_DOCUMENT_VIEW_TYPE,
            payload
        });
    }
    constructor(engine){
        this.engine = engine;
    }
}

//# sourceMappingURL=index.js.map