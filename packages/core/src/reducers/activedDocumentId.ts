import { CHANGE_ACTIVED_DOCUMENT } from "../actions/registry"
import { ID } from "../interfaces"
import { IAction } from "../interfaces/action"

export type State = ID | null

export function activedDocumentId(
	state: State = null,
	action: IAction<ID | null>,
): State {
	if (action.type === CHANGE_ACTIVED_DOCUMENT) {
		return action.payload || null
	}
	return state
}
