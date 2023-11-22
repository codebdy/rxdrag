import { ID, NodesById, ThemeMode } from "../interfaces";
import { IAction } from "../interfaces/action";
import { DocumentByIdState, documentsById } from "./documentsById";
import { State as StateIdState } from './stateId'
import { reduce as stateId } from './stateId'
import { draggingNodes, DraggingNodesState } from './draggingNodes'
import { DragOverState } from './dragOver'
import { reduce as dragOver } from './dragOver'
import { draggingResource, DraggingResourceState } from "./draggingResource";
import { DefaultLang, lang } from "./lang";
import { nodesById } from "./nodesById";
import { activedDocumentId } from "./activedDocumentId";
import { themeMode } from "./themeMode";
import { activedNodeId } from "./activedNodeId";
import { selectedIds } from "./selectedIds";

export type State = {
	lang: string,
	themeMode: ThemeMode,
	stateId: StateIdState
	documentsById: DocumentByIdState
	activedDocumentId: ID | null
	activedNodeId?: ID | null
	selectedIds: ID[] | null
	nodesById: NodesById
	draggingNodes: DraggingNodesState
	draggingResource: DraggingResourceState
	dragOver: DragOverState | null
}

const initialState: State = {
	lang: DefaultLang,
	themeMode: "light",
	activedDocumentId: null,
	draggingNodes: null,
	draggingResource: null,
	selectedIds: null,
	dragOver: null,
	//viewportRect: null,
	documentsById: {},
	stateId: 0,
	nodesById: {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reduce(state: State = initialState, action: IAction<any>): State {
	return {
		lang: lang(state.lang, action),
		themeMode: themeMode(state.themeMode, action),
		documentsById: documentsById(state.documentsById, action),
		activedDocumentId: activedDocumentId(state.activedDocumentId, action),
		activedNodeId: activedNodeId(state.activedNodeId, action),
		selectedIds: selectedIds(state.selectedIds, action),
		stateId: stateId(state.stateId),
		draggingNodes: draggingNodes(state.draggingNodes, action),
		draggingResource: draggingResource(state.draggingResource, action),
		dragOver: dragOver(state.dragOver, action),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		nodesById: nodesById(state.nodesById, action as any),
	}
}
