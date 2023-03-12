import { DocumentByIdState, documentsById } from "./documentsById";
import { State as StateIdState } from './stateId'
import { reduce as stateId } from './stateId'
import { draggingNodes, DraggingNodesState } from './draggingNodes'
import { DragOverState } from './dragOver'
import { reduce as dragOver } from './dragOver'
import { draggingResource, DraggingResourceState } from "./draggingResource";
import { IAction, ThemeMode } from "core/interfaces/action";
import { DefualtLang, lang } from "./lang";
import { nodesById, NodesById } from "./nodesById";
import { ID } from "core/interfaces";
import { activedDocumentId } from "./activedDocumentId";
import { themeMode } from "./themeMode";
import { activedNodeId } from "./activedNodeId";

export type State = {
	lang: string,
	themeMode: ThemeMode,
	stateId: StateIdState
	documentsById: DocumentByIdState
	activedDocumentId: ID | null
	activedNodeId?: ID | null
	nodesById: NodesById
	draggingNodes: DraggingNodesState
	draggingResource: DraggingResourceState
	dragOver: DragOverState | null
}

const initialState: State = {
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
}

export function reduce(state: State = initialState, action: IAction<any>): State {
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
		nodesById: nodesById(state.nodesById, action as any),
	}
}
