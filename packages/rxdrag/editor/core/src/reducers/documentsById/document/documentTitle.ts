import { IDocumentAction, ChangeDocumentTitlePayload, DocumentInitPayload } from "../../../interfaces"
import { CHANGE_DOCUMENT_TITLE, INITIALIZE } from "../../../actions/registry"

export type State = string | undefined

export function documentTitle(
	state: State = undefined,
	action: IDocumentAction<ChangeDocumentTitlePayload | DocumentInitPayload>,
): State {
	const { payload } = action
	switch (action.type) {
		case CHANGE_DOCUMENT_TITLE:
		case INITIALIZE:
			return payload?.title
		default:
			return state
	}
}
