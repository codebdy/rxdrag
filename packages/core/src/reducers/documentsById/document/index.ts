import { ID, DocumentSelectionMode } from "core/interfaces";
import { CanvasWidthLimits, IDocumentAction, ISnapshot, ViewType, } from "../../../interfaces/document";
import { rootId } from "./rootId";
import { selectedIds } from "./selectedIds";
import { selectionMode } from "./selectionMode";
import { history } from "./history"
import { snapShotIndex } from "./snapShotIndex";
import { canvasWidth } from "./canvasWidth";
import { canvasWidthLimits } from "./canvasWidthLimits";
import { viewType } from "./viewType";

export type DocumentState = {
	selectionMode: DocumentSelectionMode
	changed: boolean
	selectedIds: ID[] | null
	history: ISnapshot[]
	rootId?: ID
	snapshotIndex: number,
	canvasWidth: number | null,
	canvasWidthLimits: CanvasWidthLimits | null,
	viewType: ViewType
}

const initialState: DocumentState = {
	selectionMode: DocumentSelectionMode.Normal,
	changed: false,
	history: [],
	selectedIds: null,
	snapshotIndex: 0,
	canvasWidth: null,
	canvasWidthLimits: null,
	viewType: "design"
}

export function documentReduce(
	state: DocumentState = initialState,
	action: IDocumentAction<any>,
): DocumentState {
	return {
		...state,
		selectionMode: selectionMode(state.selectionMode, action),
		rootId: rootId(state.rootId, action),
		selectedIds: selectedIds(state.selectedIds, action),
		history: history(state.history, action),
		snapshotIndex: snapShotIndex(state.snapshotIndex, action),
		canvasWidth: canvasWidth(state.canvasWidth, action),
		canvasWidthLimits: canvasWidthLimits(state.canvasWidthLimits, action),
		viewType: viewType(state.viewType, action),
	}
}
