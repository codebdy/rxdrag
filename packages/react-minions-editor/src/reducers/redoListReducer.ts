import { Action, ActionType, SetRedoListAction } from "../actions";
import { ISnapshot } from "../interfaces/state";

export function redoListReducer(state: ISnapshot[], action: Action) {
  switch (action.type) {
    case ActionType.BACKUP: {
      return []
    }
    case ActionType.SET_REDOLIST: {
      return (action as SetRedoListAction).payload
    }
  }
  return state
}