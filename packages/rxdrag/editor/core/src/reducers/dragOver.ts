import { DRAG_HOVER } from "../actions/registry"
import { DragOverOptions, IAction } from "../interfaces/action"

export type DragOverState = DragOverOptions | null

export function reduce(
	state: DragOverState = null,
	action: IAction<DragOverOptions>,
): DragOverState {
	const { payload } = action
	switch (action.type) {
		case DRAG_HOVER:
			return payload || null
		default:
			return state
	}
}
