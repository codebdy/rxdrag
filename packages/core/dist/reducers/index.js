import { documentsById } from "./documentsById";
import { reduce as stateId } from './stateId';
import { draggingNodes } from './draggingNodes';
import { reduce as dragOver } from './dragOver';
import { draggingResource } from "./draggingResource";
import { DefualtLang, lang } from "./lang";
import { nodesById } from "./nodesById";
import { activedDocumentId } from "./activedDocumentId";
import { themeMode } from "./themeMode";
import { activedNodeId } from "./activedNodeId";
const initialState = {
    lang: DefualtLang,
    themeMode: "light",
    activedDocumentId: null,
    draggingNodes: null,
    draggingResource: null,
    dragOver: null,
    //viewportRect: null,
    documentsById: {},
    stateId: 0,
    nodesById: {}
};
export function reduce(state = initialState, action) {
    return {
        lang: lang(state.lang, action),
        themeMode: themeMode(state.themeMode, action),
        documentsById: documentsById(state.documentsById, action),
        activedDocumentId: activedDocumentId(state.activedDocumentId, action),
        activedNodeId: activedNodeId(state.activedNodeId, action),
        stateId: stateId(state.stateId),
        draggingNodes: draggingNodes(state.draggingNodes, action),
        draggingResource: draggingResource(state.draggingResource, action),
        dragOver: dragOver(state.dragOver, action),
        nodesById: nodesById(state.nodesById, action)
    };
}

//# sourceMappingURL=index.js.map