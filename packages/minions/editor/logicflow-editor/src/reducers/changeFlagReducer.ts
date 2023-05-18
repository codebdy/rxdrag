import { Action, ActionType, SetChangeFlagAction } from "../actions"

export function changeFlagReducer(state: number, action: Action) {
  switch (action.type) {
    case ActionType.SET_CHANGE_FLAG: {
      return (action as SetChangeFlagAction).payload
    }
  }
  return state
}