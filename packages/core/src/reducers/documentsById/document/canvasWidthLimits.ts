import { CHANGE_CANVAS_WIDTH_LIMITS } from "core/actions/registry"
import { CanvasWidthLimits, CanvasWidthLimitsPayload, IDocumentAction } from "core/interfaces"

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
