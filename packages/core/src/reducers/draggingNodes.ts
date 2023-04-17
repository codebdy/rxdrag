import { IAction, StartDragNodesOptions } from "../interfaces/action"
import { ID, IXYCoord } from "../interfaces/types"
import { END_DRAG_NODES, START_DRAG_NODES } from "../actions/registry"

export type DraggingNodesState = {
	initialMousePosition: IXYCoord
	offset: IXYCoord
	nodeIds: ID[]
	mousePosition: IXYCoord
} | null

export function draggingNodes(
	state: DraggingNodesState = null,
	action: IAction<StartDragNodesOptions>,
): DraggingNodesState {
	const { payload } = action
	switch (action.type) {
		case START_DRAG_NODES:
			if (!payload) {
				return state
			}
			return {
				nodeIds: payload?.nodeIds,
				initialMousePosition: payload.initialMousePosition,
				offset: payload.offset,
				mousePosition: payload.mousePosition
			}
		case END_DRAG_NODES:
			return null
		default:
			return state
	}
}
