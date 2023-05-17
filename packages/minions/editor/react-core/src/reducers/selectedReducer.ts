import { Action, ActionType, SelectionAction } from "../actions"

export function selectedReducer(state: string | undefined, action: Action): (string | undefined) {
  switch (action.type) {
    case ActionType.SELECTION: {
      return (action as SelectionAction).payload
    }
  }
  return state
}