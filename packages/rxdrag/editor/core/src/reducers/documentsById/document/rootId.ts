import { INITIALIZE } from "../../../actions/registry"
import { DocumentInitPayload, ID, IDocumentAction } from "../../../interfaces"

export type State = ID | undefined

export function rootId(
  state: State,
  action: IDocumentAction<DocumentInitPayload>,
): State {
  const { payload } = action
  switch (action.type) {
    case INITIALIZE:
      return payload?.rootId
    default:
      return state
  }
}
