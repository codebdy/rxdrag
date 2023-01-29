import { Action } from "redux";
import { ActionType } from "../actions";

export function liningReducer(state: boolean, action: Action) {
  switch (action.type) {
    case ActionType.START_LINE: {
      return true
    }
    case ActionType.END_LINE: {
      return false
    }
  }
  return state
}