import { END_DRAG_RESOURCE, START_DRAG_RESOURCE } from "../actions/registry"
import { IAction, StartDragResourceOptions } from "../interfaces/action"
import { ID, IXYCoord } from "../interfaces/types"

export type DraggingResourceState = {
	initialMousePosition: IXYCoord
	offset: IXYCoord
	resource: ID
	mousePosition: IXYCoord
} | null

export function draggingResource(
	state: DraggingResourceState = null,
	action: IAction<StartDragResourceOptions>,
): DraggingResourceState {
	const { payload } = action
	switch (action.type) {
		case START_DRAG_RESOURCE:
			if (payload) {
				return {
					resource: payload?.resourceId,
					initialMousePosition: payload.initialMousePosition,
					offset: payload.offset,
					mousePosition: payload.mousePosition,
				}
			} else {
				return state
			}
		case END_DRAG_RESOURCE:
			return null
		default:
			return state
	}
}
