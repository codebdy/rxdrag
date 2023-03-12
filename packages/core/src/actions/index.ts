import { CanvasWidthLimits, CanvasWidthLimitsPayload, CanvasWidthPayload, ID, IDesignerEngine, SelectionModePayload, ViewTypePayload, DocumentSelectionMode } from "core/interfaces";
import { DrageOverOptions, IActions, StartDragNodesOptions, StartDragResourceOptions, ThemeMode } from "core/interfaces/action";
import { ACTIVE_NODE, CHANGE_ACTIVED_DOCUMENT, CHANGE_CANVAS_WIDTH, CHANGE_CANVAS_WIDTH_LIMITS, CHANGE_DOCUMENT_VIEW_TYPE, DRAG_HOVER, END_DRAG_NODES, END_DRAG_RESOURCE, SELECT_NODES, SET_SELECTION_MODE, SET_THEME_MODE, START_DRAG_NODES, START_DRAG_RESOURCE } from "./registry";

export class Actions implements IActions {
	constructor(private engine: IDesignerEngine) { }

	setThemeMode(mode: ThemeMode): void {
		this.engine.dispatch({
			type: SET_THEME_MODE,
			payload: mode
		})
	}

	changeActivedDocument(documentId: ID | null): void {
		this.engine.dispatch({
			type: CHANGE_ACTIVED_DOCUMENT,
			payload: documentId
		})
	}

	dragover(payload: DrageOverOptions | null): void {
		this.engine.dispatch({
			type: DRAG_HOVER,
			payload
		})
	}

	startDragResource(payload: StartDragResourceOptions): void {
		this.engine.dispatch({
			type: START_DRAG_RESOURCE,
			payload
		})
	}

	endDragResouce(): void {
		this.engine.dispatch({ type: END_DRAG_RESOURCE })
	}

	startDragNodes(payload: StartDragNodesOptions): void {
		this.engine.dispatch({
			type: START_DRAG_NODES,
			payload
		})
	}

	endDragNodes(): void {
		this.engine.dispatch({ type: END_DRAG_NODES })
	}

	selectNodes(targetIds: string[], documentId: string): void {
		this.engine.dispatch({ type: SELECT_NODES, payload: { documentId, targetIds } })
	}

	setSelectionMode(documentId: string, mode: DocumentSelectionMode): void {
		const payload: SelectionModePayload = {
			documentId,
			mode: mode,
		}
		this.engine.dispatch({ type: SET_SELECTION_MODE, payload })
	}

	activeNode(payload?: string | null): void {
		this.engine.dispatch({ type: ACTIVE_NODE, payload })
	}

	changeCanvasWidth(documentId: string, width: number | null): void {
		const payload: CanvasWidthPayload = {
			documentId,
			width: width
		}
		this.engine.dispatch({ type: CHANGE_CANVAS_WIDTH, payload })
	}

	changeCanvasWidthLimits(documentId: string, limits: CanvasWidthLimits | null): void {
		const payload: CanvasWidthLimitsPayload = {
			documentId,
			limits
		}
		this.engine.dispatch({ type: CHANGE_CANVAS_WIDTH_LIMITS, payload })
	}

	changeDocumentView(documentId: string, viewType: string): void {
		const payload: ViewTypePayload = {
			documentId,
			viewType
		}
		this.engine.dispatch({ type: CHANGE_DOCUMENT_VIEW_TYPE, payload })
	}
}
