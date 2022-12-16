import { CHANGE_DOCUMENT_VIEW_TYPE } from "core/actions/registry"
import { DefulstViewType, IDocumentAction, ViewType, ViewTypePayload } from "core/interfaces"

export type State = ViewType

export function viewType(
	state: State = DefulstViewType,
	action: IDocumentAction<ViewTypePayload>,
): State {
	const { payload } = action
	switch (action.type) {
		case CHANGE_DOCUMENT_VIEW_TYPE:
			return payload?.viewType || DefulstViewType
		default:
			return state
	}
}
