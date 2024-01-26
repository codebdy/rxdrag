import { ID, DocumentSelectionMode } from "../../../interfaces";
import { CanvasWidthLimits, IDocumentAction, ISnapshot, ViewType, } from "../../../interfaces/document";
import { rootId } from "./rootId";
import { selectionMode } from "./selectionMode";
import { history } from "./history"
import { snapShotIndex } from "./snapShotIndex";
import { canvasWidth } from "./canvasWidth";
import { canvasWidthLimits } from "./canvasWidthLimits";
import { viewType } from "./viewType";
import { documentTitle } from "./documentTitle";
import { changed } from "./changed";

export type DocumentState = {
	title?: string,
	selectionMode: DocumentSelectionMode
	changed: boolean
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
	snapshotIndex: 0,
	canvasWidth: null,
	canvasWidthLimits: null,
	viewType: "design"
}

export function documentReduce(
	state: DocumentState = initialState,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: IDocumentAction<any>,
): DocumentState {
	return {
		...state,
		title: documentTitle(state.title, action),
		selectionMode: selectionMode(state.selectionMode, action),
		changed: changed(state.changed, action),
		rootId: rootId(state.rootId, action),
		history: history(state.history, action),
		snapshotIndex: snapShotIndex(state.snapshotIndex, action),
		canvasWidth: canvasWidth(state.canvasWidth, action),
		canvasWidthLimits: canvasWidthLimits(state.canvasWidthLimits, action),
		viewType: viewType(state.viewType, action),
	}
}
