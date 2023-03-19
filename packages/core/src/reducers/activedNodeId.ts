import { ACTIVE_NODE } from "../actions/registry"
import { ID } from "../interfaces"
import { IAction } from "../interfaces/action"

export type State = ID | undefined | null

export function activedNodeId(state: State, action: IAction<ID | undefined>): State {
  if (action.type === ACTIVE_NODE) {
    return action.payload
  }
  return state
}
