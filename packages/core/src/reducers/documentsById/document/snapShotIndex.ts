import { GOTO } from "core/actions/registry"
import { GotoPayload, IDocumentAction } from "core/interfaces"

export type State = number

export function snapShotIndex(
  state: State,
  action: IDocumentAction<GotoPayload>,
): State {
  const { payload } = action
  switch (action.type) {

    case GOTO: {
      return payload?.index || 0
    }
    default:
      return state
  }
}
