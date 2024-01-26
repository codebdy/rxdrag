import { IDocumentAction, CanvasWidthPayload } from "../../../interfaces"
import { ADD_NODES, CHANGE_NODE_META, CLEAR_CHANGED, DELETE_NODES, MOVE_NODES, RECOVER_SNAPSHOT, REMOVE_SLOT } from "../../../actions/registry"

export type State = boolean

export function changed(
  state: State = false,
  action: IDocumentAction<CanvasWidthPayload>,
): State {
  switch (action.type) {
    case ADD_NODES:
    case MOVE_NODES:
    case DELETE_NODES:
    case CHANGE_NODE_META:
    case RECOVER_SNAPSHOT:
    case REMOVE_SLOT:
      return true;
    case CLEAR_CHANGED:
      return false;
    default:
      return state
  }
}
