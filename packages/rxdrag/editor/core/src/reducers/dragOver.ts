import { DRAG_HOVER } from "../actions/registry"
import { DrageOverOptions, IAction } from "../interfaces/action"

export type DragOverState = DrageOverOptions | null

export function reduce(
	state: DragOverState = null,
	action: IAction<DrageOverOptions>,
): DragOverState {
	const { payload } = action
	switch (action.type) {
		case DRAG_HOVER:
			return payload || null
		default:
			return state
	}
}
