import { BACKUP } from "../../../actions/registry"
import { BackupPayload, IDocumentAction, ISnapshot } from "../../../interfaces"

export type State = ISnapshot[]

export function history(
  state: State = [],
  action: IDocumentAction<BackupPayload>,
): State {
  const { payload } = action
  switch (action.type) {
    case BACKUP:
      if (payload) {
        return [...state, {
          nodes: payload.nodes,
          selectedIds: payload.selectedIds,
          actionType: payload.actionType,
          createdAt: Date.now()
        }]
      }
      return state
    default:
      return state
  }
}
