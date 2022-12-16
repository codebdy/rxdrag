import { ACTIVE_NODE } from "core/actions/registry"
import { ID } from "core/interfaces"
import { IAction } from "core/interfaces/action"

export type State = ID | undefined | null

export function activedNodeId(state: State, action: IAction<ID | undefined>): State {
  if (action.type === ACTIVE_NODE) {
    return action.payload
  }
  return state
}
