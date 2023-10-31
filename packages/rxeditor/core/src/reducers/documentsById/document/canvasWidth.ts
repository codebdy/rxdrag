import { IDocumentAction, CanvasWidthPayload } from "../../../interfaces"
import { CHANGE_CANVAS_WIDTH } from "../../../actions/registry"

export type State = number | null

export function canvasWidth(
	state: State = null,
	action: IDocumentAction<CanvasWidthPayload>,
): State {
	const { payload } = action
	switch (action.type) {
		case CHANGE_CANVAS_WIDTH:
			return payload?.width || null
		default:
			return state
	}
}
