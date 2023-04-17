import { CHANGE_CANVAS_WIDTH_LIMITS } from "../../../actions/registry"
import { CanvasWidthLimits, CanvasWidthLimitsPayload, IDocumentAction } from "../../../interfaces"

export type State = CanvasWidthLimits | null

export function canvasWidthLimits(
	state: State = null,
	action: IDocumentAction<CanvasWidthLimitsPayload>,
): State {
	const { payload } = action
	switch (action.type) {
		case CHANGE_CANVAS_WIDTH_LIMITS:
			return payload?.limits || null
		default:
			return state
	}
}
