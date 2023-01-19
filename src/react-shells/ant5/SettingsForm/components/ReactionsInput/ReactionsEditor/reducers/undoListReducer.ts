import { Action } from "redux";
import { ILogicMetas } from "runner/reaction/interfaces/metas";

export function undoListReducer(state:ILogicMetas[], action: Action){
  return {
    ...state,
  }
}