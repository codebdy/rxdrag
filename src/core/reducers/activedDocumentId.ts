import { CHANGE_ACTIVED_DOCUMENT } from "core/actions/registry"
import { ID } from "core/interfaces"
import { IAction } from "core/interfaces/action"

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
