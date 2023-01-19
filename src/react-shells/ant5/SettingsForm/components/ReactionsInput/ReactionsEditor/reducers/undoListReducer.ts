import { Action } from "redux";
import { ILogicMetas } from "runner/reaction/metas";

export function undoListReducer(state:ILogicMetas[], action: Action){
  return {
    ...state,
  }
}